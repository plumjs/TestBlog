const menus = [{
	id: "0",
	name: '首页',
	icon: 'images/icons/house.svg',
	level: 2,
	parent: null,
	content: '0',
},
{
	id: "A",
	name: '笔记',
	icon: 'images/icons/chevron-compact-right.svg',
	spreadIcon: 'images/icons/chevron-compact-down.svg',
	level: 1,
	parent: null,
	children: [{
		id: "A1",
		name: '笔记-CSS笔记',
		icon: 'images/icons/chevron-compact-right.svg',
		level: 2,
		parent: 'A',
		content: '1',
	},
	{
		id: "A2",
		name: '笔记-HTML笔记',
		icon: 'images/icons/chevron-compact-right.svg',
		level: 2,
		parent: 'A',
		content: '2',
	},
	]
},
{
	id: "B",
	name: '收藏',
	icon: 'images/icons/chevron-compact-right.svg',
	spreadIcon: 'images/icons/chevron-compact-down.svg',
	level: 1,
	parent: null,
	children: [{
		id: "B1",
		name: '收藏-文档规范',
		icon: 'images/icons/chevron-compact-right.svg',
		level: 2,
		parent: 'B',
		content: '3',
	},
	{
		id: "B2",
		name: '收藏-git注释',
		icon: 'images/icons/chevron-compact-right.svg',
		level: 2,
		parent: 'B',
		content: '4',
	},
	]
},

]

const navs = [{
	id: "N1",
	name: '首页',
	icon: 'images/icons/house.svg',
	level: 2,
	parent: null,
	content: '0',
},
{
	id: "N2",
	name: '归档',
	icon: 'images/icons/collection.svg',
	level: 2,
	parent: null,
	content: '0',
}
]
/**
 * 根据menuId 查询id
 */
function pick(menuId, menus) {
	menus.forEach(x => {
		if (x.id === menuId)
			return x
		else if (menus.children)
			return pick(menuId, menus.children)
		else
			return null
	})
}

/**
 * 点击一级菜单时,二级菜单列表的收拢与展开
 * @param {Object} elem 
 */
function menuScroll(elem) {
	const chirldrens = []
	elem.childNodes.forEach(x => chirldrens.push(x))
	const [iNode, , ulNode] = chirldrens.map(x => { return x })
	if (!ulNode.style.display || ulNode.style.display === 'none') {
		ulNode.style.display = 'list-item'
		iNode.style.backgroundImage = 'url( images/icons/chevron-compact-down.svg )'
		return
	}
	if (ulNode.style.display === 'list-item') {
		ulNode.style.display = 'none'
		iNode.style.backgroundImage = 'url( images/icons/chevron-compact-right.svg )'
		return

	}
}

/**
 * 创建一个一级菜单以及其子级菜单
 * @param {Object} menu
 */
function createMenuLiNode(menu) {
	const liNode = document.createElement('li')
	const iNode = document.createElement('i')
	iNode.setAttribute("class", "menu-li-i")
	iNode.style.backgroundImage = 'url(' + menu.icon + ')'
	const aNode = document.createElement('a')

	if (menu.children) aNode.setAttribute('onclick', 'menuScroll(this.parentNode)')
	else aNode.setAttribute('onclick', 'fetch(' + menu.content + ')')
	aNode.innerHTML = menu.name
	liNode.appendChild(iNode)
	liNode.appendChild(aNode)
	if (menu.children) {
		const ulNode = document.createElement('ul')
		menu.children.forEach(x => {
			const node = createMenuLiNode(x)
			ulNode.appendChild(node)
		})
		liNode.appendChild(ulNode)
	}
	return liNode
}

/**
 * 初始化左侧菜单导航栏
 * @param {Object} nodeId
 */
function menuInit(nodeId) {
	const elem = document.getElementById(nodeId)
	menus.forEach(x => {
		const node = createMenuLiNode(x)
		elem.appendChild(node)
	})
}


/**
 * 创建一个nav导航栏
 * @param {Object} menu
 */
function createNavLiNode(nav) {
	const liNode = document.createElement('li')
	const iNode = document.createElement('i')
	iNode.setAttribute("class", "nav-li-i")
	iNode.style.backgroundImage = 'url(' + nav.icon + ')'
	const aNode = document.createElement('a')
	aNode.setAttribute('onclick', 'fetch(' + nav.content + ')')
	aNode.innerHTML = nav.name
	liNode.appendChild(iNode)
	liNode.appendChild(aNode)
	return liNode
}

function navInit(nodeId) {
	const elem = document.getElementById(nodeId)
	navs.forEach(x => {
		const node = createNavLiNode(x)
		elem.appendChild(node)
	})
}
