import _ from 'lodash'
import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'

import Board from './components/board'
import Controls from './components/controls'
import getNextActiveIdxMap from './util/get-next-active-idx-map'
import styles from './game.css'

export default class Game extends Component {
	constructor() {
		super()

		this.state = {
			initialState: '1',
			rule: 110,
			width: undefined,
			height: undefined,
			stepInterval: undefined,
			isResizing: false,
			gameState: [{ '0': true }],
		}
	}

	render() {
		const {
			initialState,
			gameState,
			rule,
			stepInterval,
			width,
			height,
			isResizing,
		} = this.state

		return (
			<div className={styles.root}>
				<div className={styles.controlsWrapper}>
					<Controls
						initialState={initialState}
						onInitialStateChange={(initialState) => this.setInitialState(initialState)}
						rule={rule}
						onRuleChange={(rule) => this.setRule(rule)}
						reset={() => { this.reset() }}
						step={() => { this.step() }}
						isStepping={stepInterval !== undefined}
						toggleStepping={() => { this.toggleStepping() }} />
				</div>
				<div className={styles.boardWrapper}>
					{isResizing
						? 'Loading...'
						: (
							<Board
								gameState={gameState}
								width={width}
								height={height} />
						)}
				</div>
			</div>
		)
	}

	componentDidMount() {
		this.resetSize()
		this.resetSizeSoon = _.debounce(() => { this.resetSize() }, 1000)

		window.addEventListener('resize', () => {
			this.setState({ isResizing: true })
			this.resetSizeSoon()
		})
	}

	resetSize() {
		const el = ReactDOM.findDOMNode(this).querySelector(`.${styles.boardWrapper}`)
		const computedStyle = getComputedStyle(el)

		this.setState({
			isResizing: false,
			width: parseInt(computedStyle.width, 10),
			height: parseInt(computedStyle.height, 10),
		})
	}

	setRule(rule) {
		rule = parseInt(rule, 10)
		rule = isNaN(rule) ? 0 : rule
		rule = Math.max(rule, 0)
		rule = Math.min(rule, 255)

		this.setState({ rule })
	}

	reset() {
		const { initialState } = this.state
		const activeIdxs = initialState
			.split('')
			.reduce((map, val, idx) => (
				val === '1'
					? _.assign(map, { [idx]: true })
					: map
			), {})

		this.setState({
			gameState: [activeIdxs],
		})
	}

	setInitialState(initialState) {
		this.setState({
			initialState,
		})
	}

	step() {
		this.setState((state) => ({
			gameState: state.gameState.concat(
				getNextActiveIdxMap(_.last(state.gameState), state.rule)
			)
		}))
	}

	toggleStepping() {
		const { stepInterval } = this.state

		if (stepInterval === undefined) {
			this.setState({
				stepInterval: setInterval(() => { this.step() }, 16)
			})
		} else {
			clearInterval(this.state.stepInterval)

			this.setState({ stepInterval: undefined })
		}
	}
}
