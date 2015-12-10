import React, { Component } from 'react'
import { Block } from 'jsxstyle'

import Cell from './cell'
import { activeIdxMapPropType } from '../prop-types'

export default class Row extends Component {
	render() {
		const { activeIdxMap, numCells, cellSize } = this.props

		return (
			<Block height={`${cellSize}px`}>
				{_.range(Math.ceil(-numCells/2), Math.floor(numCells/2)).map(idx => (
					<Cell key={idx} isAlive={activeIdxMap[idx]} size={cellSize} />
				))}
			</Block>
		)
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.activeIdxMap !== this.props.activeIdxMap ||
			nextProps.numCells !== this.props.numCells ||
			nextProps.cellSize !== this.props.cellSize
	}
}

Row.propTypes = {
	activeIdxMap: activeIdxMapPropType,
}
