const express = require('express')
const path = require('path')
const config = require('./config')

const app = express()

app.use(express.static(__dirname))

app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, 'index.html'))
})

var PORT = process.env.PORT || 8080
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})