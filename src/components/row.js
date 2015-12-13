import _ from 'lodash'
import React, { Component } from 'react'
import { Block } from 'jsxstyle'

import Cell from './cell'
import { activeIdxMapPropType } from '../prop-types'
import getActiveIdxsMaxima from '../util/get-active-idxs-maxima'

const Spacer = ({ numCells, cellSize }) => (
	<Block
		float="left"
		width={numCells * cellSize}
		height={cellSize} />
)

export default class Row extends Component {
	render() {
		const { activeIdxMap, startIdx, numCells, cellSize } = this.props
		const { leftmostActiveIdx, rightmostActiveIdx } = getActiveIdxsMaxima(activeIdxMap)

		return (
			<Block height={`${cellSize}px`}>
				<Spacer
					numCells={leftmostActiveIdx - startIdx}
					cellSize={cellSize} />
				{_.range(leftmostActiveIdx, rightmostActiveIdx + 1).map(idx => (
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
