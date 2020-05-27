const Koa = require('koa')
const static = require('koa-static');

const app = new Koa()
app.use(static('./'))

const port = 3000
app.listen(port)
console.log(`start listening at ${port}...`)