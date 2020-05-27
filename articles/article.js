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

async function fetch(id) {
	const name = articles.filter(x => x.id === id).pop().name
	const response = await getAsync(`${BASE_URL}/${name}`)
	const elem = document.createElement('div')
	elem.classList.add('article')
	elem.innerHTML = marked(response);
	const pageCenter = document.getElementById('content-body')
	while (pageCenter.lastElementChild) {
		pageCenter.removeChild(pageCenter.lastElementChild);
	}
	document.getElementById('content-body').appendChild(elem)
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
