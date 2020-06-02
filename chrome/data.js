function configure() {
	window.open("configure.html");
}

window.onload = () => {
	document.getElementById("config").onclick = configure;

	var dataDiv = document.getElementById("data");

	var getVisited = chrome.storage.local.get((res) => {
		var elements = [];
		for (var i of Object.keys(res)) {
			if (i == "config")
				continue;
			elements.push({
				url: i,
				visits: res[i]
			});
		}
		elements.sort((a, b) => (a.visits > b.visits) ? -1 : 0);
		
		if (elements.length == 0)
			return;
		var max = elements[0].visits;
		for (var obj of elements) {
			var val = obj.visits / max * 100;
			var div = document.createElement("div");
			div.style.width = val.toString() + "%";
			div.className = "bar";
			var a = "";
			for (var i = 0; i < (5 - obj.visits.toString().length); i++) {
				a += "&nbsp;";
			}
			div.innerHTML = obj.visits.toString() + a + obj.url + "<span class=\"tooltip\">" + obj.url + "</span>";
			dataDiv.appendChild(div);
		}

		for (var i of document.getElementsByClassName("bar")) {
			i.style.backgroundColor = res.config.foreground;
			i.style.color = res.config.text;
			i.style.height = (20 * Number(res.config.font.split("px")[0]) / 16).toString() + "px";
		}

		for (var i of document.getElementsByClassName("tooltip")) {
			i.style.backgroundColor = res.config.foreground;
			i.style.color = res.config.text;
			i.style.height = (20 * Number(res.config.font.split("px")[0]) / 16).toString() + "px";
		}
		document.getElementById("config").style.backgroundColor = res.config.foreground;
		document.getElementById("config").style.color = res.config.text;
		document.body.style.fontSize = res.config.font;
		document.body.style.backgroundColor = res.config.background;
	});
};