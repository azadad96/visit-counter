var getData = chrome.storage.local.get((res) => {
	if (res["config"] == undefined) {
		var a = {
			config: {
				text: "#FFFFFF",
				background: "#1E2026",
				foreground: "#6E7070",
				font: "16px"
			}
		};
		chrome.storage.local.set(a);
	}
});

chrome.browserAction.onClicked.addListener(() => {
	chrome.tabs.create({
		"url": "data.html"
	});
});