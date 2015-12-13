import React, { PropTypes } from 'react'

const Button = ({ children, onClick }) => (
	<button
		style={{
			width: '120px',
			height: '30px',
			background: '#fff',
			border: '1px solid #000',
		}}
		onClick={onClick}>
		{children}
	</button>
)

Button.propTypes = {
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func,
}

export default Button
