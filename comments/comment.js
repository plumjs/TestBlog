
const comments = [
    {
        id: 1,
        article: 1,
        text: '这篇文章写的不错',
        parent: null,
        author: '张艳艳',
        createdAt: new Date()
    },
    {
        id: 2,
        article: 1,
        text: '你说的很对',
        parent: 1,
        author: '李多多',
        createdAt: new Date()
    },
    {
        id: 3,
        article: 1,
        text: '我觉得在扯淡',
        parent: 1,
        author: 'John',
        createdAt: new Date()
    },
    {
        id: 4,
        article: 3,
        text: '我也觉得在扯淡',
        parent: null,
        author: 'Phiner',
        createdAt: new Date()
    },
    {
        id: 5,
        article: 0,
        text: '这篇文章写的不错',
        parent: null,
        author: '张艳艳002',
        createdAt: new Date()
    },
    {
        id: 6,
        article: 0,
        text: '你说的很对',
        parent: 5,
        author: '李多多002',
        createdAt: new Date()
    },
    {
        id: 7,
        article: 0,
        text: '我觉得在扯淡',
        parent: 6,
        author: 'John002',
        createdAt: new Date()
    },
]

function buildComment(id) {
    const articleNode = document.getElementById(`article_${id}`)
    buildCommentInput(articleNode)
    buildCommentContent(articleNode, id)
}
function buildCommentInput(articleNode) {
    const formElem = document.createElement('form')
    const inputElem = document.createElement('textarea')
    const lableElem = document.createElement('lable')
    lableElem.innerHTML = '评论：'
    const buttonElem = document.createElement('button')
    buttonElem.innerHTML = '提交'
    formElem.setAttribute('class', 'articleCommentInput')
    formElem.appendChild(lableElem)
    formElem.appendChild(inputElem)
    formElem.appendChild(buttonElem)
    articleNode.appendChild(formElem)
}
function buildCommentContent(articleNode, id) {
    const _comments = comments.filter(x => x.article === id)
    const topComments = _comments.filter(x => !x.parent)
    const ulNode = document.createElement('ul')
    ulNode.setAttribute('class', 'articleCommentContent')
    topComments.forEach(x => {
        _buildCommentTree(x, _comments, ulNode)
    });
    articleNode.appendChild(ulNode)
}
function _buildCommentTree(comment, comments, parentNode) {
    const liNode = document.createElement('li')
    liNode.innerHTML = `${comment.author} ${dateFormat(comment.createdAt, "yyyy-MM-dd hh:mm:ss.S")} </br>
                        ${comment.text}`
    const chirldren = comments.filter(x => x.parent === comment.id)
    if (chirldren.length > 0) {
        const ulNode = document.createElement('ul')
        chirldren.forEach(x => {
            _buildCommentTree(x, comments, ulNode)
        })
        liNode.appendChild(ulNode)
    }
    parentNode.appendChild(liNode)
}