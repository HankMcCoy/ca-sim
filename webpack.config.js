/* eslint-env node */
'use strict'

module.exports = {
	entry: './src/main.js',
	output: {
		path: __dirname + '/dist',
		filename: 'main.js',
	},
	module: {
		loaders: [
			{ test: /\.css$/, loader: 'style-loader!css-loader?modules' },
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
		],
	},
}
