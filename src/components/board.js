import React, { PropTypes } from 'react'
import { Block } from 'jsxstyle'

import Row from './row'
import { activeIdxMapPropType } from '../prop-types'

const Board = ({ gameState, width }) => {
	if (width === undefined) {
		return <div />
	}

	const cellSize = 3
	const numCells = Math.floor(width / cellSize)

	return (
		<Block>
			{gameState.map((idxMap, idx) => (
				<Row
					key={idx}
					activeIdxMap={idxMap}
					numCells={numCells}
					cellSize={cellSize} />
			))}
		</Block>
	)
}

Board.propTypes = {
	gameState: PropTypes.arrayOf(activeIdxMapPropType)
}

export default Board
