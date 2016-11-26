process.env.NODE_ENV = 'development'

const webpack = require('webpack')
const path = require('path')
const DashboardPlugin = require('webpack-dashboard/plugin')
const autoprefixer = require('autoprefixer')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./config')
// import 'bootstrap/dist/css/bootstrap.css'
// const bootstrap = require('bootstrap/dist/css/bootstrap.css')

module.exports = {
	devtool: 'eval',
	cache: true,
	entry: [
		'bootstrap/dist/css/bootstrap.css',
		'react-hot-loader/patch',
		'webpack-dev-server/client?http://localhost:' + config.port,
		'webpack/hot/only-dev-server',
		path.resolve(__dirname, 'src/index.js')
	],
	output: {
		path: path.resolve(__dirname, 'build'),
		publicPath: '/build/',
		filename: 'bundle.js',
		chunkFilename: '[id].chunk.js'
	},
	resolve: {
        modules: [
	      'src',
	      'node_modules'
        ],
        extensions: [".jsx", ".js"]
	},
	resolveLoader: {
	    moduleExtensions: ['-loader']
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/,
				loader: 'babel?cacheDirectory!eslint',
				include: path.resolve(__dirname, 'src')
			},{
				test: /\.css/,
				loaders: [
					'style', 
					{
						loader: 'css',
						query: {
							sourceMap: true,
						    module: true,
						    localIdentName: '[local]'
						}
					},
					'postcss'
				]
			},{
				test: /\.scss$/,
				include: path.resolve(__dirname, 'src'),
				loaders: [
					'style',
					{
						loader: 'css',
						query: {
							sourceMap: true,
						    module: true,
						    localIdentName: '[local]___[hash:base64:5]'
						}
					},
					'postcss',
					{
						loader: 'sass',
						query: {
							outputStyle: 'expanded',
							sourceMap: true
						}
					}
				]
			},{
				test: /\.(png|jpg|gif)$/,
				include: path.resolve(__dirname, 'src/assets'),
				loader: 'url?limit=25000'
			},{
				test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
				loader: 'url?limit=10000&mimetype=application/font-woff'
			},{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url?limit=10000&mimetype=application/octet-stream'
			},{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
				loader: 'file'
			},{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
				loader: 'url?limit=10000&mimetype=image/svg+xml'
			}
		]
	},
	devServer: {
		hot: true,
		inline: false,
		host: 'localhost',
		port: config.port,
		historyApiFallback: {
	      index: '/build/index.html'
	    },
	    contentBase: "/build",
		quiet: true
	},
	plugins: [
	    new DashboardPlugin(),
	    new webpack.LoaderOptionsPlugin({
	      options: {
			postcss: [autoprefixer()],
	        context: __dirname,
	      }
	    }),
	    new webpack.HotModuleReplacementPlugin(),
	    new webpack.DefinePlugin({
	    	__DEBUG__: 'true',
	    	__HOST__: '"http://localhost:8080"',
	    	__VERSION__: '"1.0.0"',
	    	'process.env': { NODE_ENV: JSON.stringify('development') }
	    }),
	    new CleanWebpackPlugin([
			path.resolve(__dirname, 'build')
	    ]),
	    new webpack.optimize.CommonsChunkPlugin({
        	name: 'vendor', 
        	filename: 'vendor.bundle.js'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/assets/template.html'
        })
	]
}