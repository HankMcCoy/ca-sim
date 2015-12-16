/* global onmessage */

import getImageData from './util/get-image-data'
import getRenderInfo from './util/get-render-info'

onmessage = (event) => { // eslint-disable-line
	const {
		data: {
			rows,
			width,
			height,
			buffer,
		},
	} = event

	const data = new Uint8ClampedArray(buffer)
	const {
		cellSize,
		renderableRangesByRow,
	} = getRenderInfo({ rows, width, height })

	getImageData({
		data,
		width,
		cellSize,
		renderableRangesByRow,
	})

	postMessage({
		buffer: data.buffer,
		width,
		height,
	}, [data.buffer])
}
