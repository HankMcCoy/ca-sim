import React, { PropTypes } from 'react'
import { Block } from 'jsxstyle'

const Controls = ({ rule, onRuleChange, step, reset }) => (
	<Block>
		<label>
			Rule:
			<input type="text" value={rule} onChange={onRuleChange} />
		</label>
		<button
			style={{
				width: '120px',
				height: '30px',
				background: '#fff',
				border: '1px solid #000',
			}}
			onClick={step}>
			Step
		</button>
	</Block>
)

Controls.propTypes = {
	rule: PropTypes.number,
	step: PropTypes.func,
	reset: PropTypes.func,
}

export default Controls
