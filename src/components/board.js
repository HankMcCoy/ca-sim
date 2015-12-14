import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import getRenderInfo from '../util/get-render-info'

class Board extends Component {
	render() {
		const { width, height } = this.props

		return (
			<canvas width={width} height={height}>
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
		} = getRenderInfo({ rows, width, height })

		let curRowIdx = 0

		ctx.clearRect(0, 0, width, height)
		ctx.fillStyle = '#000'

		renderableRangesByRow.forEach((renderableRanges, rowIdx) => {
			renderableRanges.forEach((range) => {
				const x = range.start * cellSize
				const y = rowIdx * cellSize
				const rectWidth = range.length * cellSize
				const rectHeight = cellSize

				ctx.fillRect(x, y, rectWidth, rectHeight)
			})

			curRowIdx += 1
		})
	}
}

Board.propTypes = {
	rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
	width: PropTypes.number,
	height: PropTypes.number,
}

export default Board
