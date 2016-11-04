const webpack = require('webpack');
const path = require('path');
const DashboardPlugin = require('webpack-dashboard/plugin');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	devtool: 'eval',
	cache: true,
	entry: [
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server',
		path.resolve(__dirname, 'src/index.js')
	],
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/build/'
	},
	resolve: {
        modules: [
	      'src',
	      'node_modules'
        ]
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel?cacheDirectory!eslint',
				include: path.resolve(__dirname, 'src')
			},{
				test: /\.css$/,
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
				test: /\.(png|jpg|gif|svg|ttf)$/,
				include: path.resolve(__dirname, 'src/assets'),
				loader: 'url?limit=25000'
			}
		]
	},
	devServer: {
		hot: true,
		inline: false,
		host: 'localhost',
		port: 8080,
		historyApiFallback: true,
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
        })
	]
}