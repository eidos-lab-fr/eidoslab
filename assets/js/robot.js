/* Eidos Lab — E1D0, the lab robot: walks, talks, scans cards, waves, dances, sleeps. */
(function () {
  var E = window.EIDOS, t = E.t;
  var wrap = document.getElementById('bot'), btn = document.getElementById('botBtn');
  var bubble = document.getElementById('bubble'), beam = document.getElementById('beam');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var x = 24, job = 0, sleeping = false, typeT = 0, hideT = 0, tracking = false, state = 'patrol';
  var lastActive = Date.now();

  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function W() { return wrap.offsetWidth || 104; }
  function clamp(v) { return Math.max(8, Math.min(window.innerWidth - W() - 8, v)); }
  function setState(s) { state = s; E.emit('bot', s); }

  function place() {
    var r = wrap.getBoundingClientRect(), bw = bubble.offsetWidth;
    var left = Math.max(8, Math.min(window.innerWidth - bw - 8, r.left + r.width / 2 - bw / 2));
    bubble.style.left = left + 'px';
    bubble.style.bottom = (window.innerHeight - r.top + 12) + 'px';
    bubble.style.setProperty('--ax', Math.max(16, Math.min(bw - 16, r.left + r.width / 2 - left)) + 'px');
  }
  function track() {
    if (tracking) return; tracking = true;
    (function loop() {
      place();
      if (bubble.classList.contains('show') || wrap.classList.contains('walking')) requestAnimationFrame(loop); else tracking = false;
    })();
  }

  function moveTo(px) {
    px = clamp(px);
    var d = Math.abs(px - x);
    if (d < 6) return Promise.resolve();
    var dur = reduce ? 0 : Math.max(0.35, Math.min(2.2, d / 520));
    wrap.classList.toggle('left', px < x);
    wrap.classList.add('walking');
    wrap.style.setProperty('--ex', (px < x ? -3 : 3) + 'px');
    wrap.style.transitionDuration = dur + 's';
    wrap.style.transform = 'translateX(' + px + 'px)';
    x = px; setState('walk'); track();
    return wait(dur * 1000 + 30).then(function () { wrap.classList.remove('walking'); wrap.style.setProperty('--ex', '0px'); });
  }

  function hush() { clearTimeout(typeT); clearTimeout(hideT); bubble.classList.remove('show'); wrap.classList.remove('talking'); }

  function say(text, ms) {
    clearTimeout(typeT); clearTimeout(hideT);
    bubble.textContent = reduce ? text : '';
    bubble.classList.add('show'); wrap.classList.add('talking'); track();
    var done = function () {
      wrap.classList.remove('talking');
      hideT = setTimeout(function () { bubble.classList.remove('show'); if (!sleeping && state === 'talk') setState('patrol'); }, ms || 4200);
    };
    if (reduce) { done(); return; }
    var i = 0;
    (function step() {
      bubble.textContent = text.slice(0, i++);
      if (i <= text.length) typeT = setTimeout(step, 20); else done();
    })();
  }

  function act(name, ms) {
    wrap.classList.add('do-' + name);
    return wait(ms).then(function () { wrap.classList.remove('do-' + name); });
  }
  var DUR = { wave: 1600, dance: 2600, jump: 580, spin: 820, dizzy: 1900, look: 1600 };

  function beamOff() { beam.classList.remove('on'); wrap.classList.remove('scan'); document.querySelectorAll('.scanning').forEach(function (c) { c.classList.remove('scanning'); }); }

  function scan(card, text) {
    if (sleeping || !card) return Promise.resolve();
    var my = ++job; beamOff();
    var r = card.getBoundingClientRect();
    return moveTo(r.left + r.width / 2 - W() / 2).then(function () {
      if (my !== job) return;
      r = card.getBoundingClientRect();
      var b = wrap.getBoundingClientRect(), top = Math.max(0, r.bottom), h = b.top + 10 - top;
      wrap.classList.add('scan'); card.classList.add('scanning'); setState('scan');
      if (h > 20) {
        var w = Math.min(r.width, 320);
        beam.style.left = (b.left + b.width / 2 - w / 2) + 'px'; beam.style.width = w + 'px';
        beam.style.top = top + 'px'; beam.style.height = h + 'px'; beam.classList.add('on');
      }
      say(text, 3600);
      return wait(1400).then(function () { if (my === job) { beamOff(); setState('talk'); } });
    });
  }

  function perform(name) {
    if (!DUR[name]) return false;
    if (sleeping) wake(true);
    job++; beamOff();
    act(name, DUR[name]);
    return true;
  }

  function sleep() {
    var my = ++job; sleeping = true; beamOff();
    say(t('bot.sleep'), 1800);
    E.emit('sleep', true);
    return wait(reduce ? 0 : 1500).then(function () {
      if (my !== job) return; hush();
      return moveTo(8).then(function () { if (my === job && sleeping) { wrap.classList.add('sleep'); setState('sleep'); } });
    });
  }
  function wake(quiet) {
    job++; sleeping = false; wrap.classList.remove('sleep'); setState('patrol'); E.emit('sleep', false);
    if (!quiet) { act('jump', DUR.jump); say(t('bot.wake')); setState('talk'); }
  }

  function visit(sectionId, idx, count) {
    if (sleeping) return;
    var my = ++job; beamOff();
    var span = window.innerWidth - W() - 32;
    moveTo(16 + span * (idx / Math.max(count - 1, 1))).then(function () {
      if (my !== job) return;
      setState('talk'); say(t('bot.s.' + sectionId));
      if (sectionId === 'contact') act('wave', DUR.wave);
    });
  }

  /* click reactions */
  var clicks = [], cycle = 0;
  btn.addEventListener('click', function () {
    lastActive = Date.now();
    if (sleeping) { wake(); return; }
    var now = Date.now(); clicks = clicks.filter(function (c) { return now - c < 2200; }); clicks.push(now);
    job++; beamOff();
    if (clicks.length >= 5) { clicks = []; act('dizzy', DUR.dizzy); say(t('bot.dizzy')); return; }
    var step = cycle++ % 3;
    if (step === 0) { act('wave', DUR.wave); say(t('bot.hi')); }
    else if (step === 1) { act('jump', DUR.jump); say(t('bot.tip')); }
    else { act('spin', DUR.spin); say(t('bot.idle.' + (1 + Math.floor(Math.random() * 4)))); }
    setState('talk');
  });

  /* eyes follow the pointer */
  window.addEventListener('pointermove', function (e) {
    lastActive = Date.now();
    if (sleeping || wrap.classList.contains('walking')) return;
    var r = wrap.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height * 0.35);
    var n = Math.max(1, Math.hypot(dx, dy));
    wrap.style.setProperty('--ex', (dx / n * 3.5).toFixed(1) + 'px');
    wrap.style.setProperty('--ey', (dy / n * 3).toFixed(1) + 'px');
  }, { passive: true });
  ['scroll', 'keydown', 'touchstart'].forEach(function (ev) { window.addEventListener(ev, function () { lastActive = Date.now(); }, { passive: true }); });
  window.addEventListener('resize', function () { x = clamp(x); wrap.style.transitionDuration = '0s'; wrap.style.transform = 'translateX(' + x + 'px)'; });

  /* idle behaviour */
  setInterval(function () {
    if (sleeping || document.hidden || Date.now() - lastActive < 26000 || bubble.classList.contains('show')) return;
    lastActive = Date.now();
    var n = 1 + Math.floor(Math.random() * 4);
    act(n % 2 ? 'look' : 'jump', n % 2 ? DUR.look : DUR.jump);
    say(t('bot.idle.' + n), 3200);
  }, 2000);

  /* konami code */
  var seq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'], pos = 0;
  window.addEventListener('keydown', function (e) {
    pos = (e.key === seq[pos]) ? pos + 1 : (e.key === seq[0] ? 1 : 0);
    if (pos === seq.length) { pos = 0; party(); }
  });
  function party() {
    if (sleeping) wake(true);
    job++; document.body.classList.add('party'); setState('party');
    say(t('bot.party'), 3000); act('dance', 4200).then(function () { document.body.classList.remove('party'); setState('patrol'); });
  }

  E.bot = {
    say: function (s, ms) { if (sleeping) return; setState('talk'); say(s, ms); },
    moveTo: moveTo, scan: scan, perform: perform, sleep: sleep, wake: wake, visit: visit, party: party,
    toggle: function () { return sleeping ? wake() : sleep(); },
    isSleeping: function () { return sleeping; },
    state: function () { return state; }
  };
})();
