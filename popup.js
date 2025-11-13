// Get DOM elements
const toggle = document.getElementById('toggleShorts');
const status = document.getElementById('status');

// Load saved state when popup opens
chrome.storage.sync.get(['hideShortsEnabled'], function(result) {
  const isEnabled = result.hideShortsEnabled !== false; // Default to true
  toggle.checked = isEnabled;
  updateStatus(isEnabled);
});

// Listen for toggle changes
toggle.addEventListener('change', function() {
  const isEnabled = toggle.checked;

  // Save state to storage
  chrome.storage.sync.set({ hideShortsEnabled: isEnabled }, function() {
    updateStatus(isEnabled);

    // Notify all YouTube tabs to update
    chrome.tabs.query({ url: 'https://www.youtube.com/*' }, function(tabs) {
      tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, {
          action: 'toggleShorts',
          enabled: isEnabled
        });
      });
    });
  });
});

// Update status text
function updateStatus(enabled) {
  if (enabled) {
    status.textContent = 'Shorts are hidden';
    status.className = 'status enabled';
  } else {
    status.textContent = 'Shorts are visible';
    status.className = 'status disabled';
  }
}
