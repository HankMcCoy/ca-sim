import _ from 'lodash'
import React, { PropTypes, Component } from 'react'
import { Block } from 'jsxstyle'

import Board from './components/board'
import Controls from './components/controls'
import getNextActiveIdxMap from './util/get-next-active-idx-map'

export default class Game extends Component {
	constructor() {
		super()

		this.state = {
			rule: 110,
			gameState: [{ '0': true }],
		}
	}

	render() {
		const { gameState, rule } = this.state

		return (
			<Block>
				<Controls
					rule={rule}
					onRuleChange={(event) => this.setRule(event.target.value)}
					reset={(initialState) => { this.reset(initialState) }}
					step={() => { this.step() }} />
				<Board gameState={gameState} />
			</Block>
		)
	}

	setRule(rule) {
		rule = parseInt(rule, 10)
		rule = isNaN(rule) ? 0 : rule
		rule = Math.max(rule, 0)
		rule = Math.min(rule, 255)

		this.setState({ rule })
	}

	reset(initialState) {
		this.setState({
			rule,
			gameState: [initialState],
		})
	}

	step() {
		this.setState((state) => ({
			gameState: state.gameState.concat(
				getNextActiveIdxMap(_.last(state.gameState), state.rule)
			)
		}))
	}
}