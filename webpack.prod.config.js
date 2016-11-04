const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
	cache: true,
	entry: {
		vendor: ['react','react-dom','react-router'],
		app: path.resolve(__dirname, 'src/index.js')
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'bundle.js',
		chunkFilename: '[name].chunk.js',
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
				loader: 'babel?cacheDirectory',
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
						    module: true
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
						    module: true
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
	plugins: [
        new ProgressBarPlugin(),
	    new webpack.LoaderOptionsPlugin({
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
	    new webpack.optimize.DedupePlugin(),
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
        new webpack.optimize.CommonsChunkPlugin({
        	name: 'vendor', 
        	filename: 'vendor.bundle.js'
        })
	]
}