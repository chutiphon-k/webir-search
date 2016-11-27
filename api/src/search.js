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
  if(indexQuery != -1){
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
    return snippet
  } else {
    return -1
  }
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
    let splitQuery = query.split(/(\s+)/).filter((str) => str.trim().length > 0 )
    let snippet = getSnippet(query.toLowerCase(), ansMap.content)
    if(snippet == -1){
      let snippetSplit = splitQuery.map((value) => {
        return getSnippet(value.toLowerCase(), ansMap.content)
      })
  
      snippet = snippetSplit.find((snippet) => snippet != -1)
      if(snippet == undefined){
        snippet = ansMap.content.substring(0, 50)
      }
    }
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















