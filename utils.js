function desc(id) {
	const elem = getElementById(id)
	const style = getStyle(id)
	console.log("elem:", elem.nodeName)
	console.log("height:", style.height)
	console.log("width:", style.width)
	console.log("margin:", style.margin)
	console.log("padding:", style.padding)
	console.log("display:", style.display)
	console.log("border:", style.border)
}

function getAsync(url) {
	return new Promise((resolve, reject) => {
		$.get(url, (response) => {
			resolve(response)
		}).fail((error) => {
			reject(error)
		});
	})
}
