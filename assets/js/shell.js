/* Eidos Lab — eidos-sh, the in-page terminal. Press "/" to open it. */
(function () {
  var E = window.EIDOS, t = E.t;
  var box = document.getElementById('shell'), out = document.getElementById('shellOut');
  var form = document.getElementById('shellForm'), input = document.getElementById('shellInput');
  var hist = [], hi = 0, greeted = false;
  var CMDS = ['help', 'ls', 'open', 'cat', 'goto', 'cd', 'lang', 'theme', 'bot', 'neofetch', 'whoami', 'date', 'contact', 'clear', 'exit', 'party', 'echo', 'pwd', 'sudo'];
  var BOT = ['wave', 'dance', 'jump', 'spin', 'scan', 'sleep', 'wake', 'say'];

  function print(text, cls) {
    var d = document.createElement('div');
    if (cls) d.className = cls;
    d.textContent = text; out.appendChild(d); out.scrollTop = out.scrollHeight;
    return d;
  }
  function open() {
    box.hidden = false;
    if (!greeted) { greeted = true; print(t('sh.welcome'), 'c'); }
    input.focus();
  }
  function close() { box.hidden = true; }
  E.shell = { open: open, close: close, toggle: function () { box.hidden ? open() : close(); }, run: run };

  // Mesure : le nom de la commande et un argument connu (projet, section, langue…), jamais le texte libre.
  function trackCmd(cmd, parts) {
    var known = CMDS.indexOf(cmd) >= 0 || cmd === '?' || cmd === 'quit', a = (parts[1] || '').toLowerCase(), arg = '';
    if (cmd === 'open' || cmd === 'cat') { var p = E.findProject(parts.slice(1).join(' ')); arg = p ? p.id : (a ? 'unknown' : ''); }
    else if (cmd === 'bot') arg = BOT.indexOf(a) >= 0 || a === 'look' ? a : (a ? 'other' : '');
    else if (cmd === 'goto' || cmd === 'cd') arg = E.sections.indexOf(a.replace(/^[#./~]+/, '')) >= 0 ? a.replace(/^[#./~]+/, '') : (a ? 'unknown' : '');
    else if (cmd === 'lang' || cmd === 'theme' || cmd === 'ls') arg = /^[a-z]{1,12}$/.test(a) ? a : '';
    E.track('terminal_command', { command: known ? cmd : 'unknown', arg: arg });
  }
  function pad(s, n) { s = String(s); while (s.length < n) s += ' '; return s; }

  function run(line) {
    line = line.trim(); if (!line) return;
    print('$ ' + line, 'u');
    var parts = line.split(/\s+/), cmd = parts[0].toLowerCase(), arg = parts.slice(1).join(' '), a0 = (parts[1] || '').toLowerCase();
    trackCmd(cmd, parts);
    switch (cmd) {
      case 'help': case '?': print(t('sh.help'), 'c'); break;
      case 'ls': {
        var list = E.projects.filter(function (p) { return !a0 || a0 === 'all' || (a0 === 'flag' ? p.flag : p.cat === a0); });
        if (!list.length) { print(t('sh.noproject', { c: a0 }), 'e'); break; }
        list.forEach(function (p) { print(pad(p.id, 26) + pad('[' + t('st.' + p.status) + ']', 16) + t('cat.' + (p.flag ? 'flag' : p.cat)), 'c'); });
        print(list.length + ' / ' + E.projects.length, 'k');
        break;
      }
      case 'open': case 'cat': {
        var p = E.findProject(arg);
        if (!p) { print(t('sh.noproject', { c: arg || '?' }), 'e'); break; }
        if (cmd === 'cat') {
          print(p.name + ' — ' + t('st.' + p.status), 'k'); print(p.d[E.lang] || p.d.fr, 'c');
          if (p.url) print(p.url, 'c'); if (p.repo) print(p.repo, 'c');
          E.scanProject(p); break;
        }
        var href = p.url || p.repo;
        if (!href) { print(t('sh.private', { c: p.name }), 'e'); E.scanProject(p); break; }
        print(t('sh.opened', { c: href }), 'c'); E.bot.say(t('bot.open', { name: p.name }));
        window.open(href, '_blank', 'noopener');
        break;
      }
      case 'goto': case 'cd': {
        var s = a0.replace(/^[#./~]+/, '') || 'home';
        if (E.sections.indexOf(s) < 0) { print(t('sh.nosection', { c: a0 }), 'e'); break; }
        E.bot.say(t('bot.follow', { name: s })); E.go(s); print(t('sh.ok'), 'c'); break;
      }
      case 'lang': if (!E.setLang(a0)) print(t('sh.lang'), 'e'); else print(t('sh.ok'), 'c'); break;
      case 'theme': if (a0 !== 'dark' && a0 !== 'light') print(t('sh.theme'), 'e'); else { E.setTheme(a0); print(t('sh.ok'), 'c'); } break;
      case 'bot': {
        if (a0 === 'sleep') E.bot.sleep();
        else if (a0 === 'wake') E.bot.wake();
        else if (a0 === 'say' && parts[2]) { if (E.bot.isSleeping()) E.bot.wake(true); E.bot.say(parts.slice(2).join(' ').slice(0, 140)); }
        else if (a0 === 'scan') { var sp = E.findProject(parts.slice(2).join(' ')); if (!sp) { print(t('sh.noproject', { c: parts[2] || '?' }), 'e'); break; } E.scanProject(sp); }
        else if (!E.bot.perform(a0)) { print(t('sh.bot'), 'e'); break; }
        print(t('sh.ok'), 'c'); break;
      }
      case 'party': E.bot.party(); print('♪ ┏(・o・)┛ ♪', 'k'); break;
      case 'neofetch': {
        var art = ['    o    ', '    |    ', ' .-----. ', ' | ▮ ▮ | ', " '-----' ", ' [o o o] ', '(=======)'];
        var st = E.stats(), rows = ['lab@eidos', '---------', t('fetch.projects') + ': ' + st.total, t('fetch.oss') + ': ' + st.oss, t('fetch.mac') + ': ' + st.mac, t('fetch.skills') + ': ' + st.skills, 'lang: ' + E.lang + ' · theme: ' + document.documentElement.dataset.theme];
        art.forEach(function (l, i) { print(l + '  ' + (rows[i] || ''), i < 2 ? 'k' : 'c'); });
        break;
      }
      case 'whoami': print(t('sh.whoami'), 'c'); break;
      case 'pwd': print('/home/visitor/eidos-lab', 'c'); break;
      case 'date': print(new Date().toLocaleString(E.lang), 'c'); break;
      case 'echo': print(arg, 'c'); break;
      case 'contact': print('contact@eidoslab.fr', 'k'); E.go('contact'); break;
      case 'sudo': print(t('sh.sudo'), 'e'); E.bot.perform('look'); break;
      case 'clear': out.textContent = ''; break;
      case 'exit': case 'quit': close(); break;
      default: print(t('sh.notfound', { c: cmd }), 'e');
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = input.value; input.value = '';
    if (v.trim()) { hist.push(v); hi = hist.length; }
    run(v);
  });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowUp') { if (hi > 0) input.value = hist[--hi]; e.preventDefault(); }
    else if (e.key === 'ArrowDown') { input.value = hi < hist.length - 1 ? hist[++hi] : (hi = hist.length, ''); e.preventDefault(); }
    else if (e.key === 'Tab') {
      e.preventDefault();
      var parts = input.value.split(/\s+/), last = parts[parts.length - 1].toLowerCase(), pool;
      if (parts.length === 1) pool = CMDS;
      else if (parts[0] === 'bot' && parts.length === 2) pool = BOT;
      else if (parts[0] === 'goto' || parts[0] === 'cd') pool = E.sections;
      else if (parts[0] === 'ls') pool = E.cats.concat(['flag', 'all']);
      else if (parts[0] === 'lang') pool = E.langs;
      else if (parts[0] === 'theme') pool = ['dark', 'light'];
      else pool = E.projects.map(function (p) { return p.id; });
      var m = pool.filter(function (c) { return c.indexOf(last) === 0; });
      if (m.length === 1) { parts[parts.length - 1] = m[0]; input.value = parts.join(' ') + ' '; }
      else if (m.length > 1 && last) print(m.join('  '), 'c');
    }
  });
  box.addEventListener('click', function (e) { if (e.target === out) input.focus(); });
  document.getElementById('shellClose').addEventListener('click', close);
  window.addEventListener('keydown', function (e) {
    var tag = (e.target.tagName || '').toLowerCase(), typing = tag === 'input' || tag === 'textarea';
    if (e.key === 'Escape' && !box.hidden) { close(); return; }
    if (!typing && !e.metaKey && !e.ctrlKey && !e.altKey && e.key === '/') {
      e.preventDefault(); if (box.hidden) E.track('terminal_open', { source: 'keyboard' }); open();
    }
  });
})();
