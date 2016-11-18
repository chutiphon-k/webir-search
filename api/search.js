const elasticlunr = require('elasticlunr')
const readline = require('readline');
const fs = require('fs')
const path = require('path')

let data, idx

try {
  data = fs.readFileSync(path.join(__dirname, 'output', 'indexFile.json'),'utf8')
  idx = elasticlunr.Index.load(JSON.parse(data))
} catch(err) {
  console.log('Load Index Error!!!')
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let getSnippet = (query, content) => {
  let indexQuery = (content.toLowerCase()).indexOf(query)
  let queryLength = query.length
  let indexFirst = indexQuery - 50
  let indexLast = indexQuery + queryLength + 50

  if(indexFirst < 0){
    indexFirst = 0
  } else {
    let indexSpace = content.lastIndexOf(' ',indexFirst)
    if(indexSpace != -1){
      indexFirst = indexSpace
    }
  }

  if(indexLast > content.length){
    indexLast = content.length
  } else {
    let indexSpace = content.indexOf(' ',indexLast)
    if(indexSpace != -1){
      indexLast = indexSpace
    }
  }

  let snippet = content.substring(indexFirst, indexLast)
  indexQuery = (snippet.toLowerCase()).indexOf(query)
  while(indexQuery != -1){
    snippet = snippet.substring(0,indexQuery) + '<b>' + snippet.substring(indexQuery, indexQuery + queryLength) + '</b>' + snippet.substring(indexQuery + queryLength)
    indexQuery = (snippet.toLowerCase()).indexOf(query, indexQuery + queryLength)
  }
  return snippet
}

rl.question('Input query : ', (query) => {
  console.log('>>> Start Search <<<')
  let ans = idx.search(query).slice(0,10)
  let ansMaps = ans.map((value) => {
    let ansMap = idx.documentStore.getDoc(value.ref)
      ansMap.snippet = getSnippet(query.toLowerCase(), ansMap.content)
      delete ansMap.content
      return ansMap
  })
  console.log(ansMaps)
  console.log('>>> Search Done <<<')
  rl.close();
});