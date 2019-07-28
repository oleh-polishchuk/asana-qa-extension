const handleUpdatedTabEvent = (tabId, changeInfo) => {
    if (changeInfo.url) {
        chrome.tabs.sendMessage(tabId, {
            action: 'check',
            url: changeInfo.url
        })
    }
};

chrome.tabs.onUpdated.addListener(handleUpdatedTabEvent);
