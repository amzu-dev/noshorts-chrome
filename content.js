// Check if shorts should be hidden
let hideShortsEnabled = true; // Default to true

// Wait for body to be available
function waitForBody(callback) {
  if (document.body) {
    callback();
  } else {
    const observer = new MutationObserver(function() {
      if (document.body) {
        observer.disconnect();
        callback();
      }
    });
    observer.observe(document.documentElement, { childList: true });
  }
}

// Initialize on load
chrome.storage.sync.get(['hideShortsEnabled'], function(result) {
  hideShortsEnabled = result.hideShortsEnabled !== false;
  if (hideShortsEnabled) {
    waitForBody(() => hideShorts());
  }
});

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'toggleShorts') {
    hideShortsEnabled = request.enabled;
    waitForBody(() => {
      if (hideShortsEnabled) {
        hideShorts();
      } else {
        showShorts();
      }
    });
  }
});

// Function to hide shorts
function hideShorts() {
  if (!document.body) return;
  document.body.classList.add('noshorts-enabled');
  removeShorts();
  observeDOM();
}

// Function to show shorts
function showShorts() {
  if (!document.body) return;
  document.body.classList.remove('noshorts-enabled');
  if (observer) {
    observer.disconnect();
  }
  // Remove any inline styles we added
  const hiddenElements = document.querySelectorAll('[data-noshorts-hidden]');
  hiddenElements.forEach(el => {
    el.removeAttribute('data-noshorts-hidden');
    el.style.display = '';
  });
}

// Function to remove shorts from DOM
function removeShorts() {
  // Selectors for different places where shorts appear on YouTube
  const selectors = [
    // New shorts lockup view models (main shorts containers)
    'ytm-shorts-lockup-view-model-v2',
    'ytm-shorts-lockup-view-model',

    // Rich item renderers containing shorts
    'ytd-rich-item-renderer:has(ytm-shorts-lockup-view-model-v2)',
    'ytd-rich-item-renderer:has(ytm-shorts-lockup-view-model)',
    'ytd-rich-item-renderer:has(a[href^="/shorts/"])',

    // Shorts shelf on home page
    'ytd-rich-shelf-renderer[is-shorts]',
    'ytd-reel-shelf-renderer',

    // Individual short videos in grid
    'ytd-reel-video-renderer',
    'ytd-reel-item-renderer',

    // Shorts button in sidebar - multiple selectors for reliability
    'ytd-guide-entry-renderer:has(a[href="/shorts"])',
    'ytd-guide-entry-renderer:has(a[title="Shorts"])',
    'ytd-guide-entry-renderer:has(.title:text-matches("^Shorts$", i))',
    'ytd-mini-guide-entry-renderer:has(a[href="/shorts"])',
    'ytd-mini-guide-entry-renderer:has(a[title="Shorts"])',

    // Shorts tab on channel pages
    'yt-tab-shape:has(a[href*="/shorts"])',
    'ytd-browse[page-subtype="channels"] tp-yt-paper-tab:nth-child(3)', // Shorts tab

    // Shorts in search results
    'ytd-video-renderer:has([href^="/shorts/"])',
    'ytd-grid-video-renderer:has([href^="/shorts/"])',

    // Additional shorts containers
    '[is-shorts]',
    'a[href^="/shorts/"]'
  ];

  selectors.forEach(selector => {
    try {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        // Find the closest parent that's a complete item/card
        let target = element;

        // For shorts lockup models, hide the parent rich-item-renderer
        if (element.tagName === 'YTM-SHORTS-LOCKUP-VIEW-MODEL-V2' ||
            element.tagName === 'YTM-SHORTS-LOCKUP-VIEW-MODEL') {
          target = element.closest('ytd-rich-item-renderer') || element;
        }
        // For links, hide the parent container
        else if (element.tagName === 'A') {
          target = element.closest('ytd-video-renderer, ytd-grid-video-renderer, ytd-rich-item-renderer, ytd-guide-entry-renderer, ytd-mini-guide-entry-renderer') || element;
        }

        if (target && !target.hasAttribute('data-noshorts-hidden')) {
          target.style.display = 'none';
          target.setAttribute('data-noshorts-hidden', 'true');
        }
      });
    } catch (e) {
      // Ignore invalid selectors
    }
  });

  // Additional check: Hide sidebar items with "Shorts" text
  const guideEntries = document.querySelectorAll('ytd-guide-entry-renderer, ytd-mini-guide-entry-renderer');
  guideEntries.forEach(entry => {
    const titleElement = entry.querySelector('yt-formatted-string.title');
    const linkElement = entry.querySelector('a[title]');

    if (titleElement && titleElement.textContent.trim() === 'Shorts') {
      if (!entry.hasAttribute('data-noshorts-hidden')) {
        entry.style.display = 'none';
        entry.setAttribute('data-noshorts-hidden', 'true');
      }
    }

    if (linkElement && linkElement.getAttribute('title') === 'Shorts') {
      if (!entry.hasAttribute('data-noshorts-hidden')) {
        entry.style.display = 'none';
        entry.setAttribute('data-noshorts-hidden', 'true');
      }
    }
  });
}

// Observer to watch for dynamically loaded content
let observer = null;

function observeDOM() {
  if (!document.body) return;

  if (observer) {
    observer.disconnect();
  }

  observer = new MutationObserver(function(mutations) {
    if (hideShortsEnabled) {
      removeShorts();
    }
  });

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Run on initial load
waitForBody(() => {
  if (hideShortsEnabled) {
    hideShorts();
  }
});
