import React, { PropTypes } from 'react'
import { Block } from 'jsxstyle'

const Cell = ({ isAlive, size }) => (
	<Block
		float={'left'}
		width={`${size}px`}
		height={`${size}px`}
		background={isAlive ? '#000' : '#eee'} />
)

Cell.propTypes = {
	isAlive: PropTypes.bool,
}

export default Cell
