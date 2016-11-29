# WebIR-Search

## Screenshot
<p align="center">
	<img src="https://github.com/chutiphon-k/webir-search/blob/master/README-images/screenshot-home-v3.png">

	<img src="https://github.com/chutiphon-k/webir-search/blob/master/README-images/screenshot-result-v2.png">
</p>

## Packages (main)

### API Server
- Cheerio
- Elasticlunr
- Express
- Lodash
- Pagerank.js
- Robotto

### Web Application
- React
- React-Dom
- Redux
- Express
- Webpack 2
- Webpack-Dev-Server
- Babel
- Bootstrap
- React-Bootstrap
- lodash

## Using Api
```bash
git clone https://github.com/chutiphon-k/webir-search.git
cd api
npm install
npm run bot # For save content
npm run build # For create index file
npm run search # For search query
npm run dev # For run dev api server
npm run deploy:prod # For run prodtions api server
open url http://localhost:9090/api/search?search=Home
```

## Using Web
```bash
git clone https://github.com/chutiphon-k/webir-search.git
cd web
npm install
npm run dev # For run web dev
npm run deploy:prod # For run web prodtions
open url http://localhost:8080
```