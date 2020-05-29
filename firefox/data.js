window.onload = () => {
	var dataDiv = document.getElementById("data");

	var getVisited = browser.storage.local.get();
	getVisited.then((res) => {
		var elements = [];
		for (var i of Object.keys(res)) {
			elements.push({
				url: i,
				visits: res[i]
			});
		}
		elements.sort((a, b) => (a.visits > b.visits) ? 0 : 1);
		
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
	});
};