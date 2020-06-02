window.onload = () => {
	var getData = chrome.storage.local.get((res) => {
		for (var i of ["background", "foreground", "text"]) {
			document.getElementById("col-" + i).value = res.config[i];
		}
		document.getElementById("size-text").value = res.config["font"];

		for (var i of document.getElementsByClassName("input")) {
			i.style.fontSize = res.config.font;
			i.style.backgroundColor = res.config.foreground;
			i.style.color = res.config.text;
		}
		document.body.style.backgroundColor = res.config.background;
	});

	for (var i of document.getElementsByClassName("input")) {
		i.onchange = () => {
			var a = {
				config: {
					background: document.getElementById("col-background").value,
					foreground: document.getElementById("col-foreground").value,
					text: document.getElementById("col-text").value,
					font: document.getElementById("size-text").value
				}
			};
			chrome.storage.local.set(a);
		}
	}
};