import React, { PropTypes } from 'react'
import { Block } from 'jsxstyle'

const cellSize = '2px'

const Cell = ({ isAlive }) => (
	<Block
		width={cellSize}
		height={cellSize}
		float={'left'}
		background={isAlive ? '#000' : '#eee'} />
)

Cell.propTypes = {
	isAlive: PropTypes.bool,
}

Cell.size = cellSize

export default Cell
