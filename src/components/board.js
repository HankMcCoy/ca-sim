import React, { PropTypes } from 'react'
import { Block } from 'jsxstyle'

import Row from './row'
import { activeIdxMapPropType } from '../prop-types'
import getActiveIdxsMaxima from '../util/get-active-idxs-maxima'

const minCellSize = 1
const maxCellSize = 5

const Board = ({ gameState, width }) => {
	if (width === undefined) {
		return <div />
	}

	// We should center the viewport at the mid-point between the leftmost and rightmost active cells.
	// For the moment we'll just look at the most recent row. In the future we should expand to look at all rows
	// since it is entirely possible the maxima may be earlier.
	// We should also start tracking the maxima for each row separately
	const { leftmostActiveIdx, rightmostActiveIdx } = getActiveIdxsMaxima(_.last(gameState))
	const numCellsToTryToDisplay = rightmostActiveIdx - leftmostActiveIdx + 1
	const centerIdx = Math.round((rightmostActiveIdx + leftmostActiveIdx) / 2)
	let cellSize = Math.floor(width / numCellsToTryToDisplay)
	cellSize = Math.max(cellSize, minCellSize)
	cellSize = Math.min(cellSize, maxCellSize)
	const numCellsToActuallyDisplay = Math.floor(width / cellSize)
	const startIdx = centerIdx - Math.floor(numCellsToActuallyDisplay / 2)

	return (
		<Block border="1px solid #eee">
			{gameState.map((idxMap, idx) => (
				<Row
					key={idx}
					activeIdxMap={idxMap}
					startIdx={startIdx}
					numCells={numCellsToActuallyDisplay}
					cellSize={cellSize} />
			))}
		</Block>
	)
}

Board.propTypes = {
	gameState: PropTypes.arrayOf(activeIdxMapPropType)
}

export default Board
