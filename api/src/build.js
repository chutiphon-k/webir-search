var elasticlunr = require('elasticlunr')
let cheerio = require('cheerio')
let fs = require('fs')
let path = require('path')
const _ = require('lodash')
const graph = require('pagerank.js')

// ----------------------------------------------Index-------------------------------------------------------

console.log('>>> Start Create Index <<<')

var idx = elasticlunr(function () {
  this.addField('title')
  this.addField('content')
  this.setRef('id')
});

idx.pipeline.remove(elasticlunr.trimmer)

try {
  let files = fs.readdirSync(path.join(__dirname, 'contents'))
  files.map((file, index) => {
      let data = fs.readFileSync(path.join(__dirname, 'contents', file), 'utf8')
      let getUrl = JSON.parse(fs.readFileSync(path.join(__dirname, 'outputs', 'success.json'), 'utf8'))
      try {
        let $ = cheerio.load(data, { normalizeWhitespace: true, ignoreWhitespace: true })
        $('script').remove()
        $('style').remove()
        let url = getUrl[file-1]
        console.log('[', index+1, '] : ', url)
        if(url != undefined){
          idx.addDoc({
              id: index+1,
              url,
              title: $('title').text().trim(),
              content: $('body').text().trim()
          })
        }
      } catch(err) {}
  })
} catch(err) {
  console.log('Read File Contents Or Success Error!!!')
}

let indexFilePath = path.join(__dirname, 'outputs', 'indexFile.json')

try {
  if(fs.existsSync(indexFilePath)){
    fs.unlinkSync(indexFilePath)   
  }
  fs.writeFileSync(indexFilePath, JSON.stringify(idx, null, 2), 'utf8')
  console.log('>>> Create Index Done <<<\n')
}
catch(err) {
  console.log('Write File Error!!!\n')
}

// ----------------------------------------------PageRank-------------------------------------------------------

console.log('>>> Start Calculate PageRank Score <<<')

const DAMPING = 0.85, EPSILON = 0.000001
let data

try {
  data = JSON.parse(fs.readFileSync(path.join(__dirname, 'outputs', 'src_dest.json'), 'utf8'))
}
catch(err) {
  console.log('Read File Src_dest Error!!!')
}

_.map(data, (value, key) => {
  value.map((x) => {
    graph.link(key, x)
  })
})

let pagerank_score = {}

graph.rank(DAMPING, EPSILON, (node, rank) => {
    Object.assign(pagerank_score, {[node]: rank})
})

let pagerank_scorePath = path.join(__dirname, 'outputs', 'pagerank_score.json')

try {
  if(fs.existsSync(pagerank_scorePath)){
    fs.unlinkSync(pagerank_scorePath)   
  }
  fs.writeFileSync(pagerank_scorePath, JSON.stringify(pagerank_score, null, 2), 'utf8')
  console.log('>>> Calculate PageRank Score Done <<<')
}
catch(err) {
  console.log('Write File Error!!!')
}