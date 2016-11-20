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
			title: 'Teayeon',
			snippet: 'SNSD',
			url: 'http://f.ptcdn.info/983/046/000/og1ozwnfhXYFEC3zb19-o.jpg'
		},{
			title: 'Krystal',
			snippet: 'f(x)',
			url: 'http://i.imgur.com/60dJN98.jpg?1'
		},{
			title: 'Google',
			snippet: 'Google Googlee Googleee',
			url: 'https://www.google.co.th'
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