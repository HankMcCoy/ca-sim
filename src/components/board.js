import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import getRenderInfo from '../util/get-render-info'
import getImageData from '../util/get-image-data'

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
		this.updateCanvas()
	}

	componentDidUpdate() {
		this.updateCanvas()
	}

	updateCanvas() {
		const canvas = ReactDOM.findDOMNode(this)
		const ctx = canvas.getContext('2d')
		const { rows, width, height } = this.props
		const {
			cellSize,
			renderableRangesByRow,
			centerIdx,
		} = getRenderInfo({
			rows,
			width,
			height,
			prevCenterIdx: this.centerIdx,
		})

		this.centerIdx = centerIdx

		ctx.clearRect(0, 0, width, height)

		if (typeof width !== 'number' ||  typeof height !== 'number') {
			return
		}

		const imageData = getImageData({
			width,
			cellSize,
			renderableRangesByRow,
			imageData: ctx.createImageData(width, height),
		})

		ctx.putImageData(imageData, 0, 0)
	}
}

Board.propTypes = {
	rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
	width: PropTypes.number,
	height: PropTypes.number,
}

export default Board
