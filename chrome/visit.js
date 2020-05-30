var numVisited;
var getVisited = chrome.storage.local.get((res) => {
	if (res[window.location.host] == undefined)
		numVisited = 1;
	else
		numVisited = res[window.location.host] + 1;

  var a = {};
  a[window.location.host] = numVisited;
	chrome.storage.local.set(a);
	console.log(res);
});