const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');

const porta = 3000;
const app = express()

app.use(bodyParser.urlencoded({extended:true}))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/login.html'))
})

app.post('/', function(req, res) {
  console.log(req.body.login, req.body.senha)
})

app.listen(porta, function() {
  console.log("Escutando na porta", porta)
})