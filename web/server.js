const express = require('express')
const path = require('path')
const compression = require('compression')
const config = require('./config')

var app = express()

app.use(compression())
app.use(express.static(__dirname, { maxAge: 86400000 }))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

var PORT = process.env.PORT || config.port
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})