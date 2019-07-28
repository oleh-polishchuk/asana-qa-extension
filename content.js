var script = document.createElement("script");
script.src = "https://asana-qa-extension.s3.amazonaws.com/script.js?t=" + new Date();
var firstScriptTag = document.getElementsByTagName('script')[ 0 ];
firstScriptTag.parentNode.insertBefore(script, firstScriptTag);

const handleOnMessageEvent = req => {
    if (req.action === 'check') {
        document.dispatchEvent(new Event("validateTitle", req));
    }
};

chrome.runtime.onMessage.addListener(handleOnMessageEvent);
