import React, { PropTypes } from 'react'
import { Block } from 'jsxstyle'

import Button from './button'

const Controls = ({
	initialState,
	onInitialStateChange,
	rule,
	onRuleChange,
	step,
	reset,
	isStepping,
	toggleStepping,
}) => (
	<Block>
		<label>
			Rule:
			<input
				type="text"
				value={rule}
				onChange={(event) => onRuleChange(event.target.value)} />
		</label>
		<label>
			Initial state:
			<input
				type="text"
				value={initialState}
				onChange={(event) => onInitialStateChange(event.target.value)} />
		</label>
		<Button onClick={reset}>
			Reset
		</Button>
		<Button onClick={step}>
			Step
		</Button>
		<Button onClick={toggleStepping}>
			{isStepping ? 'Stop' : 'Start'}
		</Button>
	</Block>
)

Controls.propTypes = {
	initialState: PropTypes.string.isRequired,
	onInitialStateChange: PropTypes.func.isRequired,
	rule: PropTypes.number.isRequired,
	onRuleChange: PropTypes.func.isRequired,
	step: PropTypes.func.isRequired,
	reset: PropTypes.func.isRequired,
	isStepping: PropTypes.bool.isRequired,
	toggleStepping: PropTypes.func.isRequired,
}

export default Controls
