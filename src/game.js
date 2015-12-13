import _ from 'lodash'
import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import { Block } from 'jsxstyle'
import '!!style-loader!css-loader!../css/normalize.css'
import '!!style-loader!css-loader!../css/skeleton.css'

import Board from './components/board'
import Controls from './components/controls'
import getNextActiveIdxMap from './util/get-next-active-idx-map'

export default class Game extends Component {
	constructor() {
		super()

		this.state = {
			initialState: '1',
			rule: 110,
			width: undefined,
			stepInterval: undefined,
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
		} = this.state

		return (
			<Block
				padding="10px"
				color="#555"
				fontFamily="Helvetica, Arial"
				fontSize="16px">
				<Controls
					initialState={initialState}
					onInitialStateChange={(initialState) => this.setInitialState(initialState)}
					rule={rule}
					onRuleChange={(rule) => this.setRule(rule)}
					reset={() => { this.reset() }}
					step={() => { this.step() }}
					isStepping={stepInterval !== undefined}
					toggleStepping={() => { this.toggleStepping() }} />
				<Board gameState={gameState} width={width} />
			</Block>
		)
	}

	componentDidMount() {
		this.resetWidth()

		window.addEventListener('resize', _.debounce(() => {
			this.resetWidth()
		}, 1000))
	}

	resetWidth() {
		this.setState({
			width: ReactDOM.findDOMNode(this).offsetWidth
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
