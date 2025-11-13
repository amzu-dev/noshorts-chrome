// Background service worker to manage URL blocking rules

const RULE_ID = 1;

// Initialize rules on installation
chrome.runtime.onInstalled.addListener(async () => {
  // Default to enabled
  const result = await chrome.storage.sync.get(['hideShortsEnabled']);
  const isEnabled = result.hideShortsEnabled !== false;

  if (isEnabled) {
    await enableBlockingRules();
  }
});

// Listen for storage changes from popup
chrome.storage.onChanged.addListener(async (changes, namespace) => {
  if (namespace === 'sync' && changes.hideShortsEnabled) {
    const isEnabled = changes.hideShortsEnabled.newValue;

    if (isEnabled) {
      await enableBlockingRules();
    } else {
      await disableBlockingRules();
    }
  }
});

// Enable URL blocking rules
async function enableBlockingRules() {
  try {
    // Remove existing rules first
    const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
    const ruleIds = existingRules.map(rule => rule.id);

    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: ruleIds,
      addRules: [
        {
          "id": RULE_ID,
          "priority": 1,
          "action": {
            "type": "redirect",
            "redirect": {
              "url": "https://www.youtube.com"
            }
          },
          "condition": {
            "urlFilter": "*://www.youtube.com/shorts/*",
            "resourceTypes": ["main_frame"]
          }
        }
      ]
    });
  } catch (error) {
    console.error('Error enabling blocking rules:', error);
  }
}

// Disable URL blocking rules
async function disableBlockingRules() {
  try {
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [RULE_ID]
    });
  } catch (error) {
    console.error('Error disabling blocking rules:', error);
  }
}

// Initialize on startup
chrome.storage.sync.get(['hideShortsEnabled'], async (result) => {
  const isEnabled = result.hideShortsEnabled !== false;

  if (isEnabled) {
    await enableBlockingRules();
  } else {
    await disableBlockingRules();
  }
});
