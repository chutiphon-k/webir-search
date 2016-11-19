var express = require('express')
var path = require('path')
const config = require('./config')

var app = express()

app.use(express.static(__dirname))

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

var PORT = process.env.PORT || config.port
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})