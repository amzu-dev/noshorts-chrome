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
    // Shorts shelf on home page
    'ytd-rich-shelf-renderer[is-shorts]',
    'ytd-reel-shelf-renderer',

    // Individual short videos in grid
    'ytd-reel-video-renderer',
    'ytd-reel-item-renderer',

    // Shorts button in sidebar
    'ytd-guide-entry-renderer:has(a[href="/shorts"])',
    'ytd-mini-guide-entry-renderer:has(a[href="/shorts"])',

    // Shorts tab on channel pages
    'yt-tab-shape:has(a[href*="/shorts"])',
    'ytd-browse[page-subtype="channels"] tp-yt-paper-tab:nth-child(3)', // Shorts tab

    // Shorts in search results
    'ytd-video-renderer:has([href^="/shorts/"])',
    'ytd-grid-video-renderer:has([href^="/shorts/"])',

    // Reel shelf
    'ytd-reel-shelf-renderer',

    // Additional shorts containers
    '[is-shorts]',
    '[class*="shorts"]',
    'a[href^="/shorts/"]'
  ];

  selectors.forEach(selector => {
    try {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        // Find the closest parent that's a complete item/card
        let target = element;
        if (element.tagName === 'A') {
          // For links, hide the parent container
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
