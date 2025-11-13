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
    // Check if rule already exists
    const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
    const ruleExists = existingRules.some(rule => rule.id === RULE_ID);

    if (ruleExists) {
      // Rule already exists, no need to add it again
      return;
    }

    // Add the blocking rule
    await chrome.declarativeNetRequest.updateDynamicRules({
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
    // Check if rule exists before trying to remove
    const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
    const ruleExists = existingRules.some(rule => rule.id === RULE_ID);

    if (!ruleExists) {
      // Rule doesn't exist, nothing to remove
      return;
    }

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
