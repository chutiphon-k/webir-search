const fs = require('fs')
const path = require('path')

let pagerank_score 

try {
	pagerank_score = JSON.parse(fs.readFileSync(path.join(__dirname, 'outputs', 'pagerank_score.json'), 'utf8'))
}
catch(err) {
  console.log('Load Pagerank_score Error!!!')
}

exports.getPageRank = (result) => {
	result = result.map(value => Object.assign(value, {pagerank_score: pagerank_score[value.url]}))
	result = result.sort((a, b) => (b.pagerank_score - a.pagerank_score))
	return result
}

exports.getReRank = (result, alpha) => {
	result = this.getPageRank(result)
	result = result.map(value => Object.assign(value, {rerank_score: alpha*value.similarity_score + (1-alpha)*value.pagerank_score}))
	result = result.sort((a, b) => (b.rerank_score - a.rerank_score))
	return result
}