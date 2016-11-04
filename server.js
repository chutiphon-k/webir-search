var express = require('express')
var path = require('path')
var test = require('./test.js')

var app = express()

app.use(express.static(__dirname))

app.get('/eiei', function (req, res) {
	// console.log(res)
	// a.eiei('eiei')
  // res.send(a.eiei(req.query.x))
  res.send(test.x())
})

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

var PORT = process.env.PORT || 9999
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})