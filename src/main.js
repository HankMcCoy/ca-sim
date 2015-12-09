import _ from 'lodash'
import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import { Flex, Block } from 'jsxstyle'

window._ = _

const cellSize = '5px'
const boardSize = 200

function getNextActiveIdxMap(prevActiveIdxMap, rule) {
	if (rule % 2 === 1) {
		throw new Error('Only even numbered automata supported at this time')
	}

	const prevActiveIdxs = _.sortBy(Object.keys(prevActiveIdxMap).map(key => +key))
	const firstActiveIdx = _.first(prevActiveIdxs)
	const lastActiveIdx = _.last(prevActiveIdxs)
	const getPrevBitForIdx = (idx) => getBitForIdx(idx, prevActiveIdxMap)

	return _.range(firstActiveIdx - 1, lastActiveIdx + 2)
		.reduce((nextActiveIdxMap, idx) => {
			const leftBit = getPrevBitForIdx(idx - 1)
			const centerBit = getPrevBitForIdx(idx)
			const rightBit = getPrevBitForIdx(idx + 1)
			const ruleMask = 1 << ((leftBit << 2) + (centerBit << 1) + rightBit)

			if (rule & ruleMask) {
				nextActiveIdxMap[idx] = true
			}

			return nextActiveIdxMap
		}, {})
}

window.getNextActiveIdxMap = getNextActiveIdxMap

const getBitForIdx = (idx, activeIdxMap) => idx in activeIdxMap | 0

const activeIdxMapPropType = PropTypes.objectOf(PropTypes.bool)

const Board = ({ gameState }) => {
	return (
		<Block>
			{gameState.map((idxMap, idx) => (
				<Row key={idx} activeIdxMap={idxMap} />
			))}
		</Block>
	)
}

Board.propTypes = {
	gameState: PropTypes.arrayOf(activeIdxMapPropType)
}

const Controls = ({ rule, onRuleChange, step, reset }) => (
	<Block>
		<input type="text" value={rule} onChange={onRuleChange} />
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

class Row extends Component {
	render() {
		const { activeIdxMap } = this.props

		return (
			<Block height={cellSize}>
				{_.range(Math.floor(-boardSize/2), Math.floor(boardSize/2)).map(idx => (
					<Cell key={idx} isAlive={activeIdxMap[idx]} />
				))}
			</Block>
		)
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.activeIdxMap !== this.props.activeIdxMap
	}
}

Row.propTypes = {
	activeIdxMap: activeIdxMapPropType,
}

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

class Game extends Component {
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
			<div>
				<Controls
					rule={rule}
					onRuleChange={(event) => this.setRule(event.target.value)}
					reset={(initialState) => { this.reset(initialState) }}
					step={() => { this.step() }} />
				<Board gameState={gameState} />
			</div>
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

ReactDOM.render(<Game />, document.querySelector('#content'))
