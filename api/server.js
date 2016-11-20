const express = require('express')
const path = require('path')
const config = require('./config')

const app = express()

app.use(express.static(__dirname))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.get('/api/search', (req, res) => {
	let results = [
		{
			title: 'title#1',
			snippet: 'snippet#1',
			url: 'url#1'
		},{
			title: 'title#2',
			snippet: 'snippet#2',
			url: 'url#2'
		},{
			title: 'title#3',
			snippet: 'snippet#3',
			url: 'url#3'
		}
	]
	res.json(results)
})

app.get('*', (req, res) => {
	res.send('ok')
})

let PORT = process.env.PORT || config.port
app.listen(PORT, () => {
	console.log('Production Express server API running at localhost:' + PORT)
})