/* eslint-env node */
'use strict'

const webpack = require('webpack')

module.exports = {
	entry: {
		main: './src/main.js',
		worker: './src/worker.js',
	},
	output: {
		publicPath: '/dist',
		path: __dirname + '/dist',
		filename: '[name].js',
	},
	module: {
		loaders: [
			{ test: /\.css$/, loader: 'style-loader!css-loader?modules' },
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
		],
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
			},
			output: {
				comments: false,
				semicolons: false,
			},
		}),
		// React will exclude a bunch of debugging code if NODE_ENV is set to
		// 'production', getting us a performance boost. In addition we use this
		// flag to disable various dev tools.
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': "'production'",
		}),
	],
}
