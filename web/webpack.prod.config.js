process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const path = require('path')
const autoprefixer = require('autoprefixer')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin")
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const WebpackMd5Hash = require('webpack-md5-hash')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	cache: true,
	entry: {
		vendor: ['react', 'react-router', 'react-redux', 'redux-api-middleware', 'react-router-redux'],
		bundle: path.resolve(__dirname, 'src/index.js')
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		publicPath: '/build/',
		filename: '[name].[chunkhash].js',
		chunkFilename: '[id].[chunkhash].chunk.js'
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
				loader: 'babel?cacheDirectory',
				include: path.resolve(__dirname, 'src')
			},{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					notExtractLoader: "style-loader",
					loader: [
						{
							loader: 'css',
							query: {
								sourceMap: true,
							    module: true,
							    localIdentName: '[local]'
							}
						}, 
						'postcss'
					],
					publicPath: "./build"
				})
			},{
				test: /\.scss$/,
				include: path.resolve(__dirname, 'src'),
				loader: ExtractTextPlugin.extract({
					notExtractLoader: "style-loader",
					loader: [
						{
							loader: 'css',
							query: {
								sourceMap: true,
							    module: true,
							    localIdentName: '[local]'
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
					],
					publicPath: "./build"
				})
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
	plugins: [
        new ProgressBarPlugin(),
	    new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false,
			options: {
				postcss: [autoprefixer()],
				context: __dirname,
			}
	    }),
	    new webpack.DefinePlugin({
	    	__DEBUG__: 'false',
	    	__HOST__: '"http://react-starter"',
	    	__VERSION__: '"1.0.0"',
	    	'process.env': { NODE_ENV: JSON.stringify('production') }

	    }),
	    new CleanWebpackPlugin([
			path.resolve(__dirname, 'build')
	    ]),
	    new webpack.optimize.OccurrenceOrderPlugin(),
	    new webpack.optimize.UglifyJsPlugin({
		    compress: {
		        warnings: false
		    }
		}),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new ExtractTextPlugin({
        	filename: "[name].[chunkhash].css",
        	allChunks: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
        	name: 'vendor', 
        	filename: 'vendor.[chunkhash].bundle.js'
        }),
        new webpack.PrefetchPlugin(__dirname + '/src/assets/images/index.js'),
        new WebpackMd5Hash(),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: 'src/assets/template.html'
        })
	]
}