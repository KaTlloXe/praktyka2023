const express = require('express')
const app = express()

app.get('/', function(req, res){
    res.render('main',{
    title: "main_page"})
})



module.exports = app;