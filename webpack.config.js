/* eslint-env node */
'use strict'

const webpack = require('webpack')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
	entry: './src/main.js',
	output: {
		publicPath: '/dist',
		path: __dirname + '/dist',
		filename: 'main' + (isProd ? '.min.js' : '.js'),
	},
	module: {
		loaders: [
			{ test: /\.css$/, loader: 'style-loader!css-loader?modules' },
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
		],
	},
	plugins: (
			process.env.NODE_ENV === 'production'
				? [
					new webpack.optimize.UglifyJsPlugin({
						compress: {
							warnings: false,
						},
						output: {
							comments: false,
							semicolons: false,
						},
					}),
				]
				: []
		).concat(
			// React will exclude a bunch of debugging code if NODE_ENV is set to
			// 'production', getting us a performance boost.
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
			})
		),
}
