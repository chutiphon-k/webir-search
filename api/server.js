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
	let data = search.getSearch(req.query.q)
	// let result = [
	// 	{url: 'url#1', title: 'title#1', snippet: 'snippet#1'},
	// 	{url: 'url#2', title: 'title#2', snippet: 'snippet#2'},
	// 	{url: 'url#3', title: 'title#3', snippet: 'snippet#3'},
	// 	{url: 'url#4', title: 'title#4', snippet: 'snippet#4'},
	// 	{url: 'url#5', title: 'title#5', snippet: 'snippet#5'},
	// 	{url: 'url#6', title: 'title#6', snippet: 'snippet#6'},
	// 	{url: 'url#7', title: 'title#7', snippet: 'snippet#7'},
	// 	{url: 'url#8', title: 'title#8', snippet: 'snippet#8'},
	// 	{url: 'url#9', title: 'title#9', snippet: 'snippet#9'},
	// 	{url: 'url#10', title: 'title#10', snippet: 'snippet#10'}
	// ]
	let sortType = req.query.sortType
	switch(sortType){
		case 'pagerank':
			data = pagerank.getRank(data)
	}

	let page = req.query.page || 0
	let limit = req.query.limit || 10
	let pagination = {
		pageStart: 0,
		pageCount: Math.ceil(data.length/limit),
		itemCount: data.length,		
	}
	data = data.splice(page*limit, limit)
	res.json({pagination, data})
})

app.get('*', (req, res) => {
	res.send('WebIR-Search API')
})

let PORT = process.env.PORT || config.port
app.listen(PORT, () => {
	console.log('Production Express server API running at localhost:' + PORT)
})