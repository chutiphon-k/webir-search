const express = require('express')
const path = require('path')
const search = require('./src/search')
const pagerank = require('./src/pagerank')
const config = require('./config')

const app = express()

app.use(express.static(__dirname))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.get('/api/search', (req, res) => {
	let result = search.getSearch(req.query.q)
	let sortType = req.query.sortType
	switch(sortType){
		case 'pagerank':
			result = pagerank.getRank(result)
	}
	res.json(result)
})

app.get('*', (req, res) => {
	res.send('WebIR-Search API')
})

let PORT = process.env.PORT || config.port
app.listen(PORT, () => {
	console.log('Production Express server API running at localhost:' + PORT)
})