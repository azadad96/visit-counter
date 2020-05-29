browser.browserAction.onClicked.addListener(() => {
	browser.tabs.create({
		"url": "data.html"
	});
});