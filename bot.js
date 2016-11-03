process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

const fs = require('fs')
const request = require('sync-request')
const cheerio = require('cheerio')
const urlmodule = require("url");
const base64url = require('base64-url');
const HTTPStatus = require('http-status');
const robotto = require('robotto');

const LIMIT = 10, TIMEOUT = 10000, STARTER_URL = 'http://www.human.ku.ac.th/newdesign/index.php/th/'
let q_urls = [], visited_urls = [], success_urls = [], error_urls = []
let looping, currentHost = '', currentUrl = '', src_dest = '', courses = []

let requestOption = {
	timeout: 10000,
	headers: {
		'User-Agent': 'Chutiphon.k'
	}
}

let checkBot = () => {
	if(q_urls.length == 0 || visited_urls.length >= LIMIT){
		console.log('>>> Stop Crawler <<<')
		clearInterval(looping)
		let sumCourses = courses.reduce((sum, course) => sum + course + '\n','')
		fs.writeFileSync('./courses', sumCourses, 'utf8')
		fs.writeFileSync('./src_dest', src_dest, 'utf8')
		let sumError  = error_urls.reduce((sum, url) => sum + `url : ${url.url}\n--> message : ${url.status_message}\n`,'')
		fs.writeFileSync('./error', sumError, 'utf8')
		return true
	} else {
		return false
	}
}


let getUrl = (data) => {
    let $ = cheerio.load(data)
	let urls = $('a').map(function(i, el) {
		let url = $(this).attr('href')
		if(url != undefined){
			if(url.indexOf('.ku.ac.th') != -1){
				return ((url.endsWith('/')) ? url.slice(0,-1) : url).trim()
			}
		}
	}).get()
	return urls
}

let filterUrl = (url) => {
	let regx = /\.(jpg|gif|png|pdf|ppt|pptx|rar|zip|doc|docx|xlsx|mp4)/gi
	if([...visited_urls,...q_urls].includes(url)){
		return false
	}
	else if(regx.test(url)) {
		return false
	}
	else{
		return true		
	}
}


let pushUrl = (urls) => {
	urls.map((url) => {
		if(filterUrl(url)){
			src_dest += `${currentUrl}    ${url}\n`
			q_urls.push(url)
		}
	})
}


let saveContent = (url, content) => {
	fs.writeFileSync('./contents/' + base64url.encode(url), content, 'utf8')
}

let setCurrentHost = (url) => {
	let urlParse = urlmodule.parse(url)
	if(urlParse.host){
		currentHost = urlParse.protocol + '//' + urlParse.host
	}
}

let getCourse = (data) => {
	if(data.indexOf('หลักสูตร')){
		let regx = /[A-Za-z0-9_./]/gi
		let first = data.indexOf('สาขา')
		while (first != -1) {
		  let last = data.indexOf('<', first)
		  let course = data.substring(first, last)
		  if(!courses.includes(course) && !regx.test(course)){
		  	courses.push(course)
		  }
		  first = data.indexOf('สาขา', last)
		}
	}
}

let requestFunc = (url) => {
	visited_urls.push(url)
	setCurrentHost(url)
	try {
		let res = request('GET',url,requestOption)
		if(res.statusCode < 400){
			currentUrl = url
			success_urls.push(url)
			getCourse(res.getBody('utf8'))
			saveContent(url, res.getBody('utf8'))
			let urls = getUrl(res.body)
			pushUrl(urls)
		} else{
			error_urls.push({
				url,
				status_message: HTTPStatus[res.statusCode]
			})
			console.log('status_message : ' ,HTTPStatus[res.statusCode])
		}
	} catch(err) {
		error_urls.push({
			url,
			status_message: err.message
		})
		console.log(err.message)
	}
}


let runBot = () => {
	new Promise((resolve, reject) => {
		let position = q_urls.findIndex(url => url.indexOf(currentHost) == -1)
		let url = (q_urls.splice(position, 1))[0]
		if(url != undefined){
			resolve(url)	
		} else {
			resolve()
		}
	}).then((url) => {
		return new Promise((resolve, reject) => {
			robotto.canCrawl('Chutiphon.k', url, function(err, isAllowed) {
			    if (err || isAllowed) {
					resolve({
						canCrawl: true,
						url
					})

			    } else {
					resolve({
						canCrawl: false,
						url
					})
			    }
			})
		})
	}).then((value) => {
		if(value.canCrawl){
			console.log(`[${visited_urls.length + 1}] : ${value.url}`)
			requestFunc(value.url)
		}
	}).then(checkBot)
}

q_urls.push(STARTER_URL)

looping = setInterval(runBot, 1000)
