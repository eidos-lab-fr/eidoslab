/* Eidos Lab — audience measurement (Umami Cloud) and tracking plan.
   Umami sets no cookie and stores no persistent identifier: aggregated, anonymous stats,
   exempt from consent (CNIL) as long as visitors are informed and can opt out (footer button).

   Tracking plan (event → properties):
     project_click     project, link (open|download|code), place (lab|home|projects), category
     cta_click         cta (explore_lab|see_projects|see_all_projects|mission|about_site)
     nav_click         section, page
     contact_click     channel (email|github_org|github_user)
     outbound_click    host
     terminal_open     source (keyboard|prompt|status_bar|hero)
     terminal_command  command, arg (project id, section, lang… never free text)
     project_filter    category
     project_search    query (40 chars max), results
     section_view      section (once per page load)
     language_change   lang
     theme_change      theme
     robot_click       —
   Page views, referrers, UTM tags, countries and devices are collected by Umami itself. */
(function () {
  var E = window.EIDOS;
  var WEBSITE_ID = '736e5a91-3390-487c-939e-64d5ce62daa3';
  var OPT_KEY = 'eidos.noanalytics';

  function optedOut() { return E.store(OPT_KEY) === '1'; }
  E.analyticsOff = optedOut;
  E.setAnalytics = function (on) {
    E.store(OPT_KEY, on ? '0' : '1');
    E.store('umami.disabled', on ? '' : '1'); // honoured by the Umami script itself
  };

  E.track = function (name, data) {
    if (optedOut() || !window.umami || typeof window.umami.track !== 'function') return;
    try { window.umami.track(name, data || {}); } catch (e) { /* never break the page */ }
  };

  if (!optedOut() && location.hostname === 'eidoslab.fr') {
    var s = document.createElement('script');
    s.defer = true; s.src = 'https://cloud.umami.is/script.js';
    s.setAttribute('data-website-id', WEBSITE_ID);
    s.setAttribute('data-domains', 'eidoslab.fr');
    document.head.appendChild(s);
  }

  /* ---------- clicks: one delegated listener (capture, so it runs before the handlers) ---------- */
  var page = document.body.dataset.page === 'projects' ? 'projects' : 'home';
  var CTA = { 'hero.cta.lab': 'explore_lab', 'hero.cta.projects': 'see_projects', 'missions.cta': 'mission', 'about.site': 'about_site' };
  var TERM = { promptBtn: 'prompt', stTerm: 'status_bar', heroTerm: 'hero' };
  function shellClosed() { var sh = document.getElementById('shell'); return sh && sh.hidden; }

  document.addEventListener('click', function (e) {
    var el = e.target.closest && e.target.closest('a, button'); if (!el) return;

    if (el.tagName === 'BUTTON') {
      if (TERM[el.id] && shellClosed()) E.track('terminal_open', { source: TERM[el.id] });
      else if (el.dataset.lang && el.dataset.lang !== E.lang) E.track('language_change', { lang: el.dataset.lang });
      else if (el.id === 'themeBtn') E.track('theme_change', { theme: document.documentElement.dataset.theme === 'light' ? 'dark' : 'light' });
      else if (el.id === 'botBtn') E.track('robot_click');
      return;
    }

    var href = el.getAttribute('href') || '';
    var card = el.closest('.card');
    if (card) {
      var p = E.findProject(card.dataset.id) || {};
      E.track('project_click', {
        project: card.dataset.id,
        link: href === p.repo ? 'code' : (p.cat === 'mac' ? 'download' : 'open'),
        place: card.classList.contains('flag') ? 'lab' : page,
        category: p.flag ? 'lab' : (p.cat || '')
      });
      return;
    }
    if (el.closest('.links')) { E.track('nav_click', { section: href.replace(/^\/?#/, ''), page: page }); return; }
    if (el.id === 'moreLink') { E.track('cta_click', { cta: 'see_all_projects' }); return; }
    var key = el.getAttribute('data-i18n');
    if (CTA[key]) { E.track('cta_click', { cta: CTA[key] }); return; }
    if (href.indexOf('mailto:') === 0) { E.track('contact_click', { channel: 'email' }); return; }
    if (el.closest('#contact') && /github\.com/.test(href)) {
      E.track('contact_click', { channel: /eidos-lab-fr/.test(href) ? 'github_org' : 'github_user' }); return;
    }
    if (/^https?:\/\//.test(href)) {
      try { var h = new URL(href).hostname; if (h !== location.hostname) E.track('outbound_click', { host: h }); } catch (err) { /* ignore */ }
    }
  }, true);
})();
