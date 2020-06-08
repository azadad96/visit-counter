window.onload = () => {
	document.getElementById("config").onclick = () => {
		window.open("configure.html");
	};

	document.getElementById("clear").onclick = () => {
		if (!confirm("Are you sure you want to delete all data?"))
			return;
		chrome.storage.local.get((res) => {
			chrome.storage.local.clear();
			chrome.storage.local.set({
				config: res.config
			}, () => {
				window.location.reload(false);
			});
		});
	};

	document.getElementById("export").onclick = () => {
		chrome.storage.local.get((res) => {
			var data = "website,visits";
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

			for (var i of elements)
				data += "\n" + i.url + "," + i.visits;

			var blob = new Blob([data], {type: 'text/csv'});
		    if (window.navigator.msSaveOrOpenBlob) {
		        window.navigator.msSaveBlob(blob, "visit_counter.csv");
		    } else {
		        var a = window.document.createElement('a');
		        a.href = window.URL.createObjectURL(blob);
		        a.download = "visit_counter.csv";        
		        document.body.appendChild(a);
		        a.click();        
		        document.body.removeChild(a);
		    }
		});
	};

	var dataDiv = document.getElementById("data");

	chrome.storage.local.get((res) => {
		for (var i of document.getElementsByClassName("btn")) {
			i.style.backgroundColor = res.config.foreground;
			i.style.color = res.config.text;
			i.style.fontSize = res.config.font;
		}
		document.body.style.fontSize = res.config.font;
		document.body.style.backgroundColor = res.config.background;

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
	});
};