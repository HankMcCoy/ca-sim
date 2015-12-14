import React, { PropTypes } from 'react'
import { Block } from 'jsxstyle'

import Row from './row'
import { activeIdxMapPropType } from '../prop-types'
import getActiveIdxsMaxima from '../util/get-active-idxs-maxima'

const minCellSize = 1
const maxCellSize = 5

const Board = ({ gameState, width, height }) => {
	if (width === undefined) {
		return <div />
	}

	const renderWidthInPx = width
	const renderHeightInPx = height
	const constrainCellSize = (cellSize) => Math.max(Math.min(cellSize, maxCellSize), minCellSize)

	// We should center the viewport at the mid-point between the leftmost and rightmost active cells.
	// For the moment we'll just look at the most recent row. In the future we should expand to look at all rows
	// since it is entirely possible the maxima may be earlier.
	// We should also start tracking the maxima for each row separately
	const { leftmostActiveIdx, rightmostActiveIdx } = getActiveIdxsMaxima(_.last(gameState))
	const activeRangeLength = rightmostActiveIdx - leftmostActiveIdx + 1
	const centerIdx = Math.round((rightmostActiveIdx + leftmostActiveIdx) / 2)

	// Figure out how small the cell size needs to be in order to display what we'd like to display
	// both horizontally and vertically. We then pick the smaller of these sizes so we guarantee we
	// display as much as of the graph as we can.
	const horizCellSize = constrainCellSize(Math.floor(renderWidthInPx / activeRangeLength))
	const vertCellSize = constrainCellSize(Math.floor(renderHeightInPx / gameState.length))
	const cellSize = Math.min(horizCellSize, vertCellSize)

	const numCellsToDisplay = Math.floor(renderWidthInPx / cellSize)
	const startIdx = centerIdx - Math.floor(numCellsToDisplay / 2)
	const numRowsToDisplay = Math.floor(renderHeightInPx / cellSize)
	const startRow = Math.max(gameState.length - numRowsToDisplay, 0)

	return (
		<Block>
			{gameState
				.filter((idxMap, rowIdx) => rowIdx >= startRow)
				.map((idxMap, idx) => (
					<Row
						key={idx}
						activeIdxMap={idxMap}
						startIdx={startIdx}
						numCells={numCellsToDisplay}
						cellSize={cellSize} />
				))}
		</Block>
	)
}

Board.propTypes = {
	gameState: PropTypes.arrayOf(activeIdxMapPropType)
}

export default Board
