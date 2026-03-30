/* ============================================================
   POETRY SOCIETY OF AMERICA — WIREFRAME PROTOTYPE
   Router + Interactions
   ============================================================ */

// Map of page keys → element IDs
const PAGE_MAP = {
  'home':                  'page-home',
  'poems':                 'page-poems',
  'poem-detail':           'page-poem-detail',
  'poems-series':          'page-poems-series',
  'voices':                'page-voices',
  'voices-listen':         'page-voices-listen',
  'voices-listen-detail':  'page-voices-listen-detail',
  'essay-detail':          'page-essay-detail',
  'awards':                'page-awards',
  'events':                'page-events',
  'events-past':           'page-events-past',
  'event-detail':          'page-event-detail',
  'about':                 'page-about',
  'about-news-detail':     'page-about-news-detail',
  'programs':              'page-programs',
  'program-detail':        'page-program-detail',
  'author':                'page-author',
  'support':               'page-support',
  'search':                'page-search',
  'search-results':        'page-search-results',
  'shop':                  'page-shop',
};

// Which nav item to highlight for each page
const NAV_PARENT = {
  'poem-detail':          'poems',
  'poems-series':         'poems',
  'voices-listen':        'voices',
  'voices-listen-detail': 'voices',
  'essay-detail':         'voices',
  'event-detail':         'events',
  'events-past':          'events',
  'about-news-detail':    'about',
  'program-detail':       'programs',
  'search-results':       'search',
  'author':               null,
  'shop':                 'shop',
};

// ============================================================
// ROUTING
// ============================================================

function showPage(key, opts = {}) {
  // Normalise
  if (!PAGE_MAP[key]) key = 'home';

  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Show target
  const el = document.getElementById(PAGE_MAP[key]);
  if (el) el.classList.add('active');

  // Scroll to top
  window.scrollTo(0, 0);

  // Update nav active state
  const navKey = NAV_PARENT.hasOwnProperty(key) ? NAV_PARENT[key] : key;
  document.querySelectorAll('nav a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === navKey);
  });

  // Handle About sub-tab switching
  if (key === 'about') {
    const panel = opts.aboutPanel || 'overview';
    switchAboutPanel(panel);
  }
}

function navigate(key, opts = {}) {
  const hash = opts.aboutPanel ? `${key}:${opts.aboutPanel}` : key;
  history.pushState({ page: key, ...opts }, '', `#${hash}`);
  showPage(key, opts);
}

// ============================================================
// ABOUT SUB-TABS
// ============================================================

function switchAboutPanel(panelId) {
  document.querySelectorAll('.about-panel').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(`about-${panelId}`);
  if (target) target.classList.add('active');

  document.querySelectorAll('.about-tabs a').forEach(a => {
    a.classList.toggle('active', a.dataset.about === panelId);
  });
}

// ============================================================
// CLICK DELEGATION
// ============================================================

document.addEventListener('click', e => {
  // data-page links
  const link = e.target.closest('[data-page]');
  if (link) {
    // Skip plain <a href="#"> buttons
    const href = link.getAttribute('href');
    if (href === '#') return;

    e.preventDefault();
    const pageKey = link.dataset.page;
    const aboutPanel = link.dataset.about || null;

    if (pageKey === 'about' && aboutPanel) {
      navigate('about', { aboutPanel });
    } else {
      navigate(pageKey);
    }
    return;
  }

  // About sub-tabs (data-about only, inside about page)
  const aboutTab = e.target.closest('[data-about]');
  if (aboutTab && !aboutTab.dataset.page) {
    e.preventDefault();
    switchAboutPanel(aboutTab.dataset.about);
    history.replaceState({ page: 'about', aboutPanel: aboutTab.dataset.about }, '', `#about:${aboutTab.dataset.about}`);
    return;
  }
});

// ============================================================
// SEARCH
// ============================================================

function doSearch(term) {
  if (!term.trim()) return;
  const el = document.getElementById('search-term');
  if (el) el.textContent = term.trim();
  // Mirror the query into the results input
  const ri = document.getElementById('search-input-results');
  if (ri) ri.value = term.trim();
  navigate('search-results');
}

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const searchBtn   = document.getElementById('search-btn');
  const searchInputResults = document.getElementById('search-input-results');
  const searchBtnResults   = document.getElementById('search-btn-results');

  if (searchBtn) {
    searchBtn.addEventListener('click', () => doSearch(searchInput.value));
  }
  if (searchInput) {
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') doSearch(searchInput.value);
    });
  }
  if (searchBtnResults) {
    searchBtnResults.addEventListener('click', () => doSearch(searchInputResults.value));
  }
  if (searchInputResults) {
    searchInputResults.addEventListener('keydown', e => {
      if (e.key === 'Enter') doSearch(searchInputResults.value);
    });
  }
});

// ============================================================
// BROWSER BACK / FORWARD
// ============================================================

window.addEventListener('popstate', e => {
  if (e.state && e.state.page) {
    showPage(e.state.page, e.state);
  } else {
    const raw = location.hash.slice(1) || 'home';
    const [key, panel] = raw.split(':');
    showPage(key, panel ? { aboutPanel: panel } : {});
  }
});

// ============================================================
// INITIAL LOAD
// ============================================================

(function init() {
  const raw = location.hash.slice(1) || 'home';
  const [key, panel] = raw.split(':');
  showPage(key, panel ? { aboutPanel: panel } : {});
})();
