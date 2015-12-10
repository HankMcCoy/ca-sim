import React, { Component } from 'react'
import { Block } from 'jsxstyle'

import Cell from './cell'
import { activeIdxMapPropType } from '../prop-types'

const boardSize = 400

export default class Row extends Component {
	render() {
		const { activeIdxMap } = this.props

		return (
			<Block height={Cell.size}>
				{_.range(Math.floor(-boardSize/2), Math.floor(boardSize/2)).map(idx => (
					<Cell key={idx} isAlive={activeIdxMap[idx]} />
				))}
			</Block>
		)
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.activeIdxMap !== this.props.activeIdxMap
	}
}

Row.propTypes = {
	activeIdxMap: activeIdxMapPropType,
}
