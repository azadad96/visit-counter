chrome.browserAction.onClicked.addListener(() => {
	chrome.tabs.create({
		"url": "data.html"
	});
});