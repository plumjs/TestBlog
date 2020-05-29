let seqIndex = 0;
const seq = () => { return `nav_id_${seqIndex++}` }

const articles = [{
	id: 0,
	name: 'index.md',
	menu: 0,
},
{
	id: 1,
	name: 'A1.md',
	menu: 'A1',
},
{
	id: 2,
	name: 'A2.md',
	menu: 'A2',
},
{
	id: 3,
	name: 'B1.md',
	menu: 'B1',
},
{
	id: 4,
	name: 'B2.md',
	menu: 'B2',
}
]

function markedParse(response) {
	const nav = []
	const renderer = new marked.Renderer()
	renderer.heading = function (text, level) {
		const id = seq()
		nav.push({ id, level, text })
		return `<h${level} id ="${id}"> ${text}</h${level}>`;
	}
	return [marked(response, { renderer }), nav];
}

function buildContentExtra(navs, nodeId) {
	const elem = document.getElementById(nodeId)
	while (elem.lastElementChild) {
		elem.removeChild(elem.lastElementChild);
	}
	Object.keys(navs.chirldren).forEach(x => {
		const node = buildExtraElem(navs.chirldren[x])
		elem.appendChild(node)
	})
}

function buildExtraElem(nav) {
	const liNode = document.createElement('li')
	const aNode = document.createElement('a')
	aNode.setAttribute('href', `#${nav.id}`)
	aNode.innerHTML = nav.text
	liNode.appendChild(aNode)
	if (Object.keys(nav.chirldren).length > 0) {
		const ulNode = document.createElement('ul')
		Object.keys(nav.chirldren).forEach(x => {
			const node = buildExtraElem(nav.chirldren[x])
			ulNode.appendChild(node)
		})
		liNode.appendChild(ulNode)
	}
	return liNode
}

async function fetch(id) {
	const name = articles.filter(x => x.id === id).pop().name
	const response = await getAsync(`${BASE_URL}/${name}`)
	const elem = document.createElement('div')
	elem.classList.add('article')
	const [innerHTML, navs] = markedParse(response)
	elem.innerHTML = innerHTML
	const pageCenter = document.getElementById('content-body')
	while (pageCenter.lastElementChild) {
		pageCenter.removeChild(pageCenter.lastElementChild);
	}
	document.getElementById('content-body').appendChild(elem)

	// add content-body-extra
	buildContentExtra(buildTree(navs), 'content-extra-ul')

}

async function createArticle(id) {
	const name = articles.filter(x => x.id === id).pop().name
	const content = await getAsync(`${BASE_URL}/${name}`)
	const elem = document.createElement('div')
	elem.classList.add('article')
	elem.innerHTML = marked(content);
	return elem;
}

async function createNavAiticle(id) {
	const article = articles.filter(x => x.id === id).pop()
	const content = await getAsync(`${BASE_URL}/${article.name}`)
	const elem = document.createElement('div')
	elem.classList.add('articleNav')
	elem.innerHTML = marked(content);
	return elem;
}

async function appendNavArticles(menu) {
	const pageCenter = document.getElementById('content-body')
	while (pageCenter.lastElementChild) {
		pageCenter.removeChild(pageCenter.lastElementChild);
	}
	articles
		.filter(x => x.menu === menu)
		.forEach(async x => {
			const navArticleElem = await createNavAiticle(x.id)
			pageCenter.appendChild(navArticleElem)
		})
}

async function appendArticle(id) {
	const articleElem = await createAiticle(id)
	const pageCenter = document.getElementById('content-body')
	pageCenter.appendChild(articleElem)
}
