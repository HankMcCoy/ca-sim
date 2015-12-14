import _ from 'lodash'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Board from './components/board'
import Controls from './components/controls'
import getNextRow from './util/get-next-row'
import styles from './game.css'

export default class Game extends Component {
	constructor() {
		super()

		this.state = {
			initialTape: '1',
			rule: 110,
			width: undefined,
			height: undefined,
			stepInterval: undefined,
			isResizing: false,
			// Each row includes all active indexes for that row.
			rows: [
				[0],
			],
		}
	}

	render() {
		const {
			initialTape,
			rows,
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
						initialTape={initialTape}
						onInitialTapeChange={(initialTape) => this.setInitialTape(initialTape)}
						rule={rule}
						onRuleChange={(rule) => this.setRule(rule)}
						reset={() => this.reset()}
						step={() => this.step()}
						isStepping={stepInterval !== undefined}
						toggleStepping={() => this.toggleStepping()} />
				</div>
				<div className={styles.boardWrapper}>
					{isResizing
						? 'Loading...'
						: (
							<Board
								rows={rows}
								width={width}
								height={height} />
						)}
				</div>
			</div>
		)
	}

	componentDidMount() {
		this.resetSize()
		this.resetSizeSoon = _.debounce(() => this.resetSize(), 1000)

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
		const { initialTape } = this.state
		const activeIdxs = initialTape
			.split('')
			.reduce((arr, val, idx) => {
				return val === '1' ? arr.concat(idx) : arr
			}, [])

		this.setState({
			rows: [activeIdxs],
		})
	}

	setInitialTape(initialTape) {
		this.setState({
			initialTape,
		})
	}

	step() {
		this.setState((state) => ({
			rows: state.rows.concat([
				getNextRow(_.last(state.rows), state.rule),
			]),
		}))
	}

	toggleStepping() {
		const { stepInterval } = this.state

		if (stepInterval === undefined) {
			this.setState({
				stepInterval: setInterval(() => this.step(), 16),
			})
		} else {
			clearInterval(this.state.stepInterval)

			this.setState({ stepInterval: undefined })
		}
	}
}
