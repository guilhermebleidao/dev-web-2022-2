const express = require('express')

const porta = 3000;
const app = express()

app.get('/', function(req, res) {
  res.json({teste: 'teste'})
})

app.listen(port, function() {
  console.log("Escutando na porta", porta)
})