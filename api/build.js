var elasticlunr = require('elasticlunr')
let cheerio = require('cheerio')
let fs = require('fs')
let path = require('path')
// var base64url = require('base64-url');


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
      let getUrl = JSON.parse(fs.readFileSync(path.join(__dirname, 'output', 'success.json'), 'utf8'))
      let $ = cheerio.load(data,{ normalizeWhitespace: true })
      idx.addDoc({
          id: index+1,
          url: getUrl[file-1],
          title: $('title').text().trim(),
          content: $('body').text().trim()
      })
  })
} catch(err) {
  console.log('Read File Error!!!')
}


try {
  fs.writeFileSync(path.join(__dirname, 'output', 'indexFile.json'), JSON.stringify(idx,null,2), 'utf8')
  console.log('>>> Create Index Done <<<')
}
catch(err) {
  console.log('Write File Error!!!')
}

