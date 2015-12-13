import React, { PropTypes } from 'react'

import styles from './controls.css'

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
	<div className={styles.root}>
		<div className={styles.row}>
			<label>Initial state:</label>
			<input
				type="text"
				className="u-full-width"
				value={initialState}
				onChange={(event) => onInitialStateChange(event.target.value)} />
			<button className="u-full-width" onClick={reset}>
				Reset
			</button>
		</div>
		<div className={styles.row}>
			<label>Rule:</label>
			<input
				type="text"
				className="u-full-width"
				value={rule}
				onChange={(event) => onRuleChange(event.target.value)} />
			<button className="u-full-width" onClick={step}>
				Step
			</button>
			<button className="u-full-width button-primary" onClick={toggleStepping}>
				{isStepping ? 'Stop' : 'Start'}
			</button>
		</div>
	</div>
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
