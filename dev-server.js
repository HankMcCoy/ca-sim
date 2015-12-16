/* eslint-env node */
'use strict'

const express = require('express')
const webpack = require('webpack')
const devMiddleware = require('webpack-dev-middleware')
const cors = require('cors')

const config = require('./webpack.config')

const app = express()
const compiler = webpack(config)

const host = 'localhost'
const port = parseInt(process.env.PORT, 10) + 1 || 3001

app.use(cors())

app.use(devMiddleware(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath,
}))

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
<script src="dist/main.js"></script>
`
	)
})

/* eslint-disable no-console */
app.listen(port, host, err => {
	if (err) {
		console.log(err)
		return
	}

	console.info('Webpack dev server listening on %s:%s', host, port)
})
/* eslint-enable no-console */
