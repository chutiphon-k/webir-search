'use strict';

const elasticlunr = require('elasticlunr')
const readline = require('readline');
const fs = require('fs')
const path = require('path')

let data, idx

try {
  data = fs.readFileSync(path.join(__dirname, 'outputs', 'indexFile.json'), 'utf8')
  idx = elasticlunr.Index.load(JSON.parse(data))
} catch(err) {
  console.log('Load Index Error!!!')
}

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
      indexFirst = indexSpace + 1
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
    snippet = snippet.substring(0,indexQuery) + '<mark>' + snippet.substring(indexQuery, indexQuery + queryLength) + '</mark>' + snippet.substring(indexQuery + queryLength)
    indexQuery = (snippet.toLowerCase()).indexOf(query, indexQuery + queryLength + '<mark>'.length)
  }
  return snippet
}

exports.getSearch = (query) => {
  console.log('>>> Start Search <<<')
  let ans = idx.search(query,  {
      fields: {
          title: {boost: 1},
          content: {boost: 1}
      },
      bool: "OR",
      expand: true
  })

  let ansMaps = ans.map((value) => {
    let ansMap = idx.documentStore.getDoc(value.ref)
    let snippet = getSnippet(query.toLowerCase(), ansMap.content)
    Object.assign(ansMap, {snippet}, {similarity_score: value.score})
    return ansMap
  })
  console.log('>>> Search Done <<<')
  return ansMaps.map((ansMap) => {
    let { id, url, title, snippet, similarity_score } = ansMap
    return { 
        id,
        url,
        title,
        snippet,
        similarity_score
    }
  })
}















