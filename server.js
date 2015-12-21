/* eslint-env node */
'use strict'

const express = require('express')

const app = express()

const host = 'localhost'
const port = parseInt(process.env.PORT, 10) || 3000
let scriptSrc

if (process.env.NODE_ENV === 'production') {
	app.use('/dist', express.static('dist'))

	scriptSrc = 'dist/main.min.js'
} else {
	const webpack = require('webpack')
	const cors = require('cors')
	const config = require('./webpack.config')
	const compiler = webpack(config)
	const devMiddleware = require('webpack-dev-middleware')

	app.use(cors())
	app.use(devMiddleware(compiler, {
		noInfo: true,
		publicPath: config.output.publicPath,
	}))

	scriptSrc = 'dist/main.js'
}

app.get('/', (req, res) => {
	res.send(
`
<!doctype html>
<style>
	html { height: 100%; }
	body { margin: 0; height: 100%; }
	.rule110-container { position: relative; height: 100%; }
</style>
<div class="rule110-container"></div>
<script src="${scriptSrc}"></script>
`
	)
})

/* eslint-disable no-console */
app.listen(port, host, err => {
	if (err) {
		console.log(err)
		return
	}

	console.info('Server listening on %s:%s', host, port)
})
/* eslint-enable no-console */
