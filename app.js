const Koa = require('koa')
const static = require('koa-static');

const app = new Koa()
app.use(static('./'))

app.listen(process.env.PORT)
console.log(`start listening at ${process.env.PORT}...`)

