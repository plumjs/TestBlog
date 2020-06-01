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

function buildTree(navs) {
	const tree = {
		id: '_0',
		level: -1,
		chirldren: {}
	};
	tree['parent'] = tree
	const _navs = JSON.parse(JSON.stringify(navs))
	_buildTree(_navs, tree)
	return tree
}

function _buildTree(navs, tree, cursor) {
	const nav = navs.shift()
	if (!nav) return
	nav.parent = null
	nav.chirldren = {}
	if (!cursor) {
		nav.parent = tree
		nav.parent.chirldren[nav.id] = nav
		_buildTree(navs, tree, nav)
	} else {
		if (nav.level === cursor.level) {
			nav.parent = cursor.parent
			nav.parent.chirldren[nav.id] = nav
			_buildTree(navs, tree, nav)
		}
		if (nav.level > cursor.level) {
			nav.parent = cursor
			nav.parent.chirldren[nav.id] = nav
			_buildTree(navs, tree, nav)
		}
		if (nav.level < cursor.level) {
			navs.unshift(nav)
			_buildTree(navs, tree, cursor.parent)
		}
	}
}

function dateFormat(date, fmt) { //author: meizz
	var o = {
		"M+": date.getMonth() + 1, //月份
		"d+": date.getDate(), //日
		"h+": date.getHours(), //小时
		"m+": date.getMinutes(), //分
		"s+": date.getSeconds(), //秒
		"q+": Math.floor((date.getMonth() + 3) / 3), //季度
		"S": date.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}