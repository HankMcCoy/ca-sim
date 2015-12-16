/* eslint-env node */
'use strict'

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
}
