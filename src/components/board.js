import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

class Board extends Component {
	render() {
		const { width, height } = this.props

		return (
			<canvas width={width} height={height} style={{ display: 'block' }}>
				You are using a browser that does not support canvas. Please upgrade to a newer browser to
				view this simulation.
			</canvas>
		)
	}

	componentDidMount() {
		this.worker = new Worker('dist/worker.js')

		this.worker.onmessage = (event) => {
			this.paintCanvas(event.data)
		}

		this.requestCanvasUpdate()
	}

	componentDidUpdate() {
		this.requestCanvasUpdate()
	}

	componentWillUnmount() {
		this.worker.terminate()
	}

	requestCanvasUpdate() {
		const canvas = ReactDOM.findDOMNode(this)
		const ctx = canvas.getContext('2d')
		const { rows, width, height } = this.props

		if (typeof width !== 'number' ||  typeof height !== 'number') {
			return
		}

		const buffer = ctx.createImageData(width, height).data.buffer
		this.worker.postMessage({
			rows,
			width,
			height,
			buffer,
		}, [buffer])
	}

	paintCanvas({ buffer, width, height }) {
		const canvas = ReactDOM.findDOMNode(this)
		const ctx = canvas.getContext('2d')
		const data = new Uint8ClampedArray(buffer)
		const imageData = new ImageData(data, width, height)

		ctx.putImageData(imageData, 0, 0)
	}
}

Board.propTypes = {
	rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
	width: PropTypes.number,
	height: PropTypes.number,
}

export default Board
