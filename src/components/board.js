import React, { PropTypes } from 'react'
import { Block } from 'jsxstyle'

import Row from './row'
import { activeIdxMapPropType } from '../prop-types'

const Board = ({ gameState }) => {
	return (
		<Block>
			{gameState.map((idxMap, idx) => (
				<Row key={idx} activeIdxMap={idxMap} />
			))}
		</Block>
	)
}

Board.propTypes = {
	gameState: PropTypes.arrayOf(activeIdxMapPropType)
}

export default Board
