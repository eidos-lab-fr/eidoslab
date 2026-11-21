/* Eidos Lab — product pages (eidoslab.fr/<product>): Umami loading, funnel events, small page helpers.
   Same opt-out as the home page (localStorage eidos.noanalytics + umami.disabled), same Umami website.

   Funnel events (every event carries product and type = mac | web | skill):
     product_view    —                          once per page load (the page view itself is also counted by Umami)
     cta_click       cta (download | open_app | install | source), place (hero | nav | footer | install)
     download        —                          Mac app: click on the .dmg download
     app_open        —                          web tool: click on "Open the app"
     skill_install   method (copy_button | manual_copy)   skill: install command copied
     outbound_click  host                       any other link leaving eidoslab.fr */
(function () {
  var body = document.body;
  var base = { product: body.dataset.product, type: body.dataset.type };
  var WEBSITE_ID = '736e5a91-3390-487c-939e-64d5ce62daa3';
  var OPT_KEY = 'eidos.noanalytics';

  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } }
  function optedOut() { return get(OPT_KEY) === '1'; }

  var queue = [];
  function send(name, data) { try { window.umami.track(name, data); } catch (e) { /* never break the page */ } }
  function track(name, data) {
    if (optedOut()) return;
    var d = {}, k;
    for (k in base) d[k] = base[k];
    for (k in (data || {})) d[k] = data[k];
    if (window.umami && typeof window.umami.track === 'function') send(name, d);
    else queue.push([name, d]);
  }

  if (!optedOut() && location.hostname === 'eidoslab.fr') {
    var s = document.createElement('script');
    s.defer = true; s.src = 'https://cloud.umami.is/script.js';
    s.setAttribute('data-website-id', WEBSITE_ID);
    s.setAttribute('data-domains', 'eidoslab.fr');
    s.onload = function () { queue.splice(0).forEach(function (q) { send(q[0], q[1]); }); };
    document.head.appendChild(s);
  }
  track('product_view');

  var CONVERSION = { download: 'download', open_app: 'app_open' };
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a'); if (!a) return;
    var cta = a.getAttribute('data-cta');
    if (cta) {
      track('cta_click', { cta: cta, place: a.getAttribute('data-place') || '' });
      if (CONVERSION[cta]) track(CONVERSION[cta]);
      return;
    }
    var href = a.getAttribute('href') || '';
    if (/^https?:\/\//.test(href)) {
      try { var h = new URL(href).hostname; if (h !== location.hostname) track('outbound_click', { host: h }); } catch (err) { /* ignore */ }
    }
  }, true);

  /* skills: copy button under the install command */
  var pre = document.querySelector('pre[data-install]');
  if (pre) {
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'copy'; btn.textContent = 'Copy the command';
    btn.addEventListener('click', function () {
      var done = function () { btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = 'Copy the command'; }, 1600); };
      if (navigator.clipboard) navigator.clipboard.writeText(pre.textContent.trim()).then(done, function () {});
      track('skill_install', { method: 'copy_button' });
    });
    pre.insertAdjacentElement('afterend', btn);
    pre.addEventListener('copy', function () { track('skill_install', { method: 'manual_copy' }); });
  }

  /* opt-out, same storage as the home page footer */
  var opt = document.getElementById('optBtn');
  function renderOpt() { if (opt) opt.textContent = optedOut() ? 'Visits not measured · re-enable' : 'Do not measure my visits'; }
  if (opt) opt.addEventListener('click', function () {
    var off = !optedOut();
    set(OPT_KEY, off ? '1' : '0'); set('umami.disabled', off ? '1' : '');
    renderOpt();
  });
  renderOpt();

  /* web tools: scale the live preview to its frame */
  var frame = document.querySelector('.frame'), iframe = frame && frame.querySelector('iframe');
  if (iframe) {
    var fit = function () { iframe.style.transform = 'scale(' + (frame.clientWidth / 1280) + ')'; };
    fit(); addEventListener('resize', fit);
  }
})();
