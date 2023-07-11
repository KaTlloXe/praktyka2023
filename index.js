const express = require('express')
const app = express()
var path = require('path')

var main_routes = require('./routers/main_router')

const host = '127.0.0.1'
//const host = '0.0.0.0'
const port = 8080

app.use(express.static('css'));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, './public')));

app.use('/', main_routes)

app.listen(port, host, () => {
  console.log(`Start app on port ${port}`)
})