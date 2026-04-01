chrome.action.onClicked.addListener(async (tab) => {
  await chrome.sidePanel.open({ windowId: tab.windowId });
});

chrome.commands.onCommand.addListener(async (command, tab) => {
  if (command === "open-side-panel") {
    if (!tab || !tab.windowId) return;
    await chrome.sidePanel.open({ windowId: tab.windowId });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "notify") {
    chrome.alarms.clear("cookieTimer");
    chrome.notifications.create({
      type: "basic",
      iconUrl: "cookie128.png",
      title: "Cookie Clicker",
      message: "目標のクッキー数に到達しました！",
      priority: 2,
      requireInteraction: true
    });
  }
});