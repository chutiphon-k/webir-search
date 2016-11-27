const express = require('express')
const path = require('path')
const search = require('./src/search')
const ranking = require('./src/ranking')
const config = require('./config')

const app = express()

app.use(express.static(__dirname))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.get('/api/search', (req, res) => {
	console.log(req.query.search)
	let { filter, page, limit, alpha } = req.query
	let data = search.getSearch(req.query.search)
	page = +page || 1
	limit = +limit || 10
	alpha = +alpha || 0.5
	switch(filter){
		case 'pagerank':
			data = ranking.getPageRank(data)
		case 'rerank':
			data = ranking.getReRank(data, alpha)
	}

	let pageCount = Math.ceil(data.length/limit)
	let pagination = {
		pageStart: 1,
		pagePrevious: ((page-1) <= 1) ? 1:page-1,
		pageCorrent: page,
		pageNext: ((page+1) >= pageCount) ? pageCount: page+1,
		pageCount,
		itemCount: data.length,		
	}
	data = data.splice((page-1)*limit, limit)
	res.json({pagination, data})
})

app.get('*', (req, res) => {
	res.send('WebIR-Search API')
})

let PORT = process.env.PORT || config.port
app.listen(PORT, () => {
	console.log('Production Express server API running at localhost:' + PORT)
})