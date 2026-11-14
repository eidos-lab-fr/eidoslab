/* Eidos Lab — page wiring: rendering, filters, theme, live GitHub log, status bar. */
(function () {
  var E = window.EIDOS, t = E.t, $ = function (id) { return document.getElementById(id); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia('(hover: hover)').matches;
  var root = document.documentElement, started = Date.now();
  var state = { cat: 'all', q: '' }, currentSection = 'home';

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  /* ---------- theme ---------- */
  E.setTheme = function (th, silent) {
    root.dataset.theme = th; E.store('eidos.theme', th);
    var m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = th === 'light' ? '#f3f2ec' : '#1d1e22';
    if (!silent) E.bot.say(t('bot.theme'));
  };
  E.setTheme(E.store('eidos.theme') === 'light' ? 'light' : 'dark', true);
  $('themeBtn').addEventListener('click', function () { E.setTheme(root.dataset.theme === 'light' ? 'dark' : 'light'); });

  /* ---------- helpers shared with the shell ---------- */
  E.stats = function () {
    var p = E.projects;
    return { total: p.length, oss: p.filter(function (x) { return x.repo; }).length, mac: p.filter(function (x) { return x.cat === 'mac'; }).length,
      skills: p.filter(function (x) { return x.cat === 'skill' || x.id === 'daily-snapshot'; }).length };
  };
  E.findProject = function (q) {
    q = String(q || '').trim().toLowerCase(); if (!q) return null;
    var n = function (s) { return s.toLowerCase().replace(/[^a-z0-9]/g, ''); }, k = n(q);
    return E.projects.filter(function (p) { return p.id === q; })[0] || E.projects.filter(function (p) { return n(p.id) === k || n(p.name) === k; })[0] ||
      E.projects.filter(function (p) { return k.length > 2 && (n(p.id).indexOf(k) === 0 || n(p.name).indexOf(k) === 0); })[0] || null;
  };
  E.go = function (id) { var el = $(id); if (el) el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); };
  function scanText(p) {
    return (p.q && (p.q[E.lang] || p.q.fr)) || t('bot.scan', { name: p.name, tags: p.tags.slice(0, 3).join(', '), status: t('st.' + p.status) });
  }
  E.scanProject = function (p) {
    if (E.bot.isSleeping()) E.bot.wake(true);
    if (!p.flag && state.cat !== 'all' && state.cat !== p.cat || state.q) { state.cat = 'all'; state.q = ''; $('grep').value = ''; renderGrid(); }
    var card = document.querySelector('.card[data-id="' + p.id + '"]'); if (!card) return;
    card.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    setTimeout(function () { E.bot.scan(card, scanText(p)); }, reduce ? 0 : 650);
  };

  /* ---------- cards ---------- */
  function card(p, i) {
    var shot = p.img
      ? '<div class="shot photo"><img src="assets/img/' + p.img + '" alt="" loading="lazy" width="800" height="500">'
      : '<div class="shot">' + E.art(p.art);
    shot += '<span class="fig">FIG. ' + (i < 9 ? '0' : '') + (i + 1) + ' · ' + esc(p.id) + '</span></div>';
    var links = '';
    if (p.url) links += '<a href="' + esc(p.url) + '" target="_blank" rel="noopener">' + esc(t(p.cat === 'mac' ? 'link.download' : 'link.open')) + '</a>';
    if (p.repo) links += '<a href="' + esc(p.repo) + '" target="_blank" rel="noopener">' + esc(t('link.code')) + '</a>';
    if (!links) links = '<span class="none">' + esc(t('link.soon')) + '</span>';
    return '<article class="card' + (p.flag ? ' flag' : '') + '" data-id="' + esc(p.id) + '">' + shot +
      '<div class="card-body"><div class="card-top"><span class="badge ' + p.status + '">' + esc(t('st.' + p.status)) + '</span><span>' + esc(t('cat.' + (p.flag ? 'flag' : p.cat))) + '</span></div>' +
      '<h3>' + esc(p.name) + '</h3><p>' + esc(p.d[E.lang] || p.d.fr) + '</p>' +
      '<div class="tags">' + p.tags.map(function (g) { return '<span>' + esc(g) + '</span>'; }).join('') + '</div>' +
      '<div class="card-links">' + links + '</div></div></article>';
  }
  var flags = E.projects.filter(function (p) { return p.flag; }), rest = E.projects.filter(function (p) { return !p.flag; });

  function renderFlags() { $('flagGrid').innerHTML = flags.map(card).join(''); }
  function matches(p) {
    if (state.cat !== 'all' && p.cat !== state.cat) return false;
    if (!state.q) return true;
    var hay = (p.id + ' ' + p.name + ' ' + p.tags.join(' ') + ' ' + (p.d[E.lang] || '') + ' ' + t('cat.' + p.cat)).toLowerCase();
    return state.q.toLowerCase().split(/\s+/).every(function (w) { return hay.indexOf(w) >= 0; });
  }
  function renderChips() {
    $('chips').innerHTML = ['all'].concat(E.cats).map(function (c) {
      var n = c === 'all' ? rest.length : rest.filter(function (p) { return p.cat === c; }).length;
      return '<button type="button" class="chip" data-cat="' + c + '" aria-pressed="' + (state.cat === c) + '">' + esc(t('cat.' + c)) + '<b>' + n + '</b></button>';
    }).join('');
  }
  function renderGrid() {
    var list = rest.filter(matches);
    $('grid').innerHTML = list.length ? list.map(function (p) { return card(p, flags.length + rest.indexOf(p)); }).join('')
      : '<p class="lead">' + esc(t('projects.none')) + '</p>';
    $('count').textContent = t('projects.count', { n: list.length, t: rest.length });
    $('lsCmd').textContent = 'ls ./projects' + (state.cat !== 'all' ? ' --cat=' + state.cat : '') + (state.q ? ' | grep -i "' + state.q + '"' : '');
    renderChips();
    return list.length;
  }
  $('chips').addEventListener('click', function (e) {
    var b = e.target.closest('.chip'); if (!b) return;
    state.cat = b.dataset.cat; var n = renderGrid();
    E.bot.say(t('bot.filter', { n: n, cat: t('cat.' + state.cat) }), 2600);
  });
  var grepT;
  $('grep').addEventListener('input', function (e) {
    state.q = e.target.value.trim(); var n = renderGrid();
    clearTimeout(grepT); if (!n) grepT = setTimeout(function () { E.bot.say(t('bot.empty'), 2600); }, 500);
  });

  /* hover → the robot rolls under the card and scans it */
  var hoverT, lastScan = '';
  function hoverScan(e) {
    var c = e.target.closest('.card'); clearTimeout(hoverT);
    if (!c || c.dataset.id === lastScan || E.bot.isSleeping() || !$('shell').hidden) return;
    hoverT = setTimeout(function () {
      if (!c.matches(':hover')) return;
      lastScan = c.dataset.id; var p = E.findProject(c.dataset.id); if (p) E.bot.scan(c, scanText(p));
    }, 550);
  }
  if (canHover) { $('grid').addEventListener('mouseover', hoverScan); $('flagGrid').addEventListener('mouseover', hoverScan); }

  /* ---------- hero ---------- */
  var typedT;
  function typeHero() {
    var line = t('hero.typed'), el = $('typed'); clearTimeout(typedT);
    if (reduce) { el.textContent = line; return; }
    var k = 0; (function tick() { el.textContent = line.slice(0, k++); if (k <= line.length) typedT = setTimeout(tick, 20); })();
  }
  function boot() {
    var el = $('boot'), lines = [t('boot.1'), t('boot.2', { n: E.projects.length }), t('boot.3'), t('boot.4')];
    el.textContent = '';
    lines.forEach(function (l, i) {
      setTimeout(function () {
        el.appendChild(document.createTextNode(l));
        if (i < 3) { var ok = document.createElement('span'); ok.className = 'ok'; ok.textContent = 'ok\n'; el.appendChild(ok); }
      }, reduce ? 0 : 180 + i * 260);
    });
  }
  function renderFetch() {
    var s = E.stats(), rows = [['fetch.projects', s.total], ['fetch.oss', s.oss], ['fetch.mac', s.mac], ['fetch.skills', s.skills], ['fetch.agents', t('fetch.agents.v')], ['fetch.uptime', '<span id="uptime">00:00</span>'],
      ['fetch.status', '<span class="dot"></span>' + esc(t('fetch.status.v'))]];
    $('fetchStats').innerHTML = rows.map(function (r) { return '<dt>' + esc(t(r[0])) + '</dt><dd>' + r[1] + '</dd>'; }).join('');
    $('stCount').textContent = s.total + ' ' + t('fetch.projects');
  }

  /* ---------- live log (public GitHub events) ---------- */
  var known = {}, logData = null;
  E.projects.forEach(function (p) { if (p.repo) known[p.repo.replace('https://github.com/', '').toLowerCase()] = 1; });
  var KIND = { PushEvent: 'push', CreateEvent: 'create', ReleaseEvent: 'release', PullRequestEvent: 'pr' };
  function detail(ev) {
    var p = ev.payload || {};
    if (ev.type === 'PushEvent') return (p.ref || '').replace('refs/heads/', '');
    if (ev.type === 'CreateEvent') return (p.ref_type || '') + (p.ref ? ' ' + p.ref : '');
    if (ev.type === 'ReleaseEvent') return (p.release && p.release.tag_name) || '';
    if (ev.type === 'PullRequestEvent') return (p.action || '') + (p.number ? ' #' + p.number : '');
    return '';
  }
  function renderLog() {
    var el = $('logFeed');
    if (logData === null) { el.innerHTML = '<div class="out">' + esc(t('log.loading')) + '<span class="cursor">_</span></div>'; return; }
    if (!logData.length) {
      el.innerHTML = '<div class="out tag">' + esc(t('log.error')) + '</div><div><a href="https://github.com/orgs/eidos-lab-fr/repositories" target="_blank" rel="noopener">' + esc(t('log.see')) + '</a></div>'; return;
    }
    el.innerHTML = logData.map(function (r) {
      var d = new Date(r.at), ts = d.toLocaleDateString('sv') + ' ' + d.toLocaleTimeString(E.lang, { hour: '2-digit', minute: '2-digit', hour12: false });
      return '<div class="row"><span class="out">[' + esc(ts) + ']</span><span class="tag">' + esc(t('log.' + r.kind)) + '</span>' +
        '<a href="https://github.com/' + esc(r.repo) + '" target="_blank" rel="noopener">' + esc(r.repo) + (r.detail ? ' <span class="x">' + esc(r.detail) + '</span>' : '') + '</a></div>';
    }).join('') + '<div style="margin-top:10px"><span class="ps">$</span> <span class="cursor">_</span></div>';
  }
  function loadLog() {
    try {
      var c = JSON.parse(sessionStorage.getItem('eidos.log') || 'null');
      if (c && Date.now() - c.at < 6e5 && c.rows.length) { logData = c.rows; renderLog(); return; }
    } catch (e) { /* no cache */ }
    var urls = ['https://api.github.com/orgs/eidos-lab-fr/events?per_page=40', 'https://api.github.com/users/AdrienBalcioglu/events/public?per_page=60'];
    Promise.all(urls.map(function (u) {
      return fetch(u, { headers: { Accept: 'application/vnd.github+json' } }).then(function (r) { return r.ok ? r.json() : []; }).catch(function () { return []; });
    })).then(function (res) {
      var seen = {}, rows = [];
      res[0].concat(res[1]).forEach(function (ev) {
        if (!ev || seen[ev.id] || !KIND[ev.type] || !ev.repo || !known[ev.repo.name.toLowerCase()]) return;
        seen[ev.id] = 1; rows.push({ at: ev.created_at, kind: KIND[ev.type], repo: ev.repo.name, detail: detail(ev) });
      });
      rows.sort(function (a, b) { return a.at < b.at ? 1 : -1; });
      logData = rows.slice(0, 16); renderLog();
      try { sessionStorage.setItem('eidos.log', JSON.stringify({ at: Date.now(), rows: logData })); } catch (e) { /* private mode */ }
      if (logData.length && currentSection === 'log') E.bot.say(t('bot.log', { n: logData.length }));
    });
  }

  /* ---------- status bar ---------- */
  function renderStatus() {
    $('cornerBtn').textContent = t(E.bot.isSleeping() ? 'status.wake' : 'status.corner');
    $('stBot').textContent = 'E1D0 · ' + t('state.' + E.bot.state());
    $('stSec').textContent = '§ ' + currentSection;
  }
  E.on('bot', renderStatus); E.on('sleep', renderStatus);
  $('cornerBtn').addEventListener('click', function () { E.bot.toggle(); });
  $('stTerm').addEventListener('click', function () { E.shell.toggle(); });
  $('promptBtn').addEventListener('click', function () { E.shell.toggle(); });
  $('heroTerm').addEventListener('click', function () { E.shell.open(); });
  setInterval(function () {
    var s = Math.floor((Date.now() - started) / 1000), u = $('uptime'), p = function (n) { return (n < 10 ? '0' : '') + n; };
    if (u) u.textContent = p(Math.floor(s / 60)) + ':' + p(s % 60);
    $('stClock').textContent = new Date().toLocaleTimeString(E.lang, { hour12: false });
  }, 1000);

  /* ---------- sections: nav highlight + robot patrol ---------- */
  var secs = [].slice.call(document.querySelectorAll('section[data-section]'));
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var id = en.target.dataset.section; if (id === currentSection && io.ready) return;
      currentSection = id; io.ready = true;
      document.querySelectorAll('.links a').forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + id); });
      renderStatus();
      if ($('shell').hidden) E.bot.visit(id, secs.indexOf(en.target), secs.length);
      if (id === 'log' && logData === null && !loadLog.started) { loadLog.started = true; loadLog(); }
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
  secs.forEach(function (s) { io.observe(s); });

  /* ---------- language ---------- */
  document.querySelectorAll('.langs button').forEach(function (b) { b.addEventListener('click', function () { E.setLang(b.dataset.lang); }); });
  function renderAll() { renderFlags(); renderGrid(); renderFetch(); renderLog(); renderStatus(); typeHero(); }
  E.on('lang', function (o) { renderAll(); boot(); if (!o.silent) E.bot.say(t('bot.lang')); });

  $('year').textContent = new Date().getFullYear();
  E.applyI18n(); renderAll(); boot();
})();
