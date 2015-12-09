module.exports = {
	entry: './src/main.js',
	output: {
		path: __dirname + '/dist',
		filename: 'main.js',
	},
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
		],
	},
}
