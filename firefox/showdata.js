var getData = browser.storage.local.get();
getData.then((res) => {
	if (res["config"] == undefined) {
		var a = {
			config: {
				text: "#FFFFFF",
				background: "#1E2026",
				foreground: "#6E7070",
				font: "16px"
			}
		};
		browser.storage.local.set(a);
	}
});

browser.browserAction.onClicked.addListener(() => {
	browser.tabs.create({
		"url": "data.html"
	});
});