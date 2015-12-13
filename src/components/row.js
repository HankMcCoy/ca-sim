import _ from 'lodash'
import React, { Component } from 'react'
import { Block } from 'jsxstyle'

import Cell from './cell'
import { activeIdxMapPropType } from '../prop-types'

export default class Row extends Component {
	render() {
		const { activeIdxMap, startIdx, numCells, cellSize } = this.props

		return (
			<Block height={`${cellSize}px`}>
				{_.range(startIdx, startIdx + numCells).map(idx => (
					<Cell key={idx} isAlive={activeIdxMap[idx]} size={cellSize} />
				))}
			</Block>
		)
	}

	shouldComponentUpdate(nextProps) {
		return !_.isEqual(this.props, nextProps)
	}
}

Row.propTypes = {
	activeIdxMap: activeIdxMapPropType,
}
