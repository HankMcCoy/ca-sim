import _ from 'lodash'

const getBitForIdx = (idx, activeIdxMap) => idx in activeIdxMap | 0

export default function getNextRow(prevRow, rule) {
	if (rule % 2 === 1) {
		throw new Error('Only even numbered automata supported at this time')
	}

	const firstActiveIdx = _.first(prevRow)
	const lastActiveIdx = _.last(prevRow)
	const prevActiveIdxMap = prevRow.reduce((map, idx) => {
		return _.assign(map, { [idx]: true })
	}, {})
	const getPrevBitForIdx = (idx) => getBitForIdx(idx, prevActiveIdxMap)

	return _.range(firstActiveIdx - 1, lastActiveIdx + 2)
		.reduce((nextRow, idx) => {
			const leftBit = getPrevBitForIdx(idx - 1)
			const centerBit = getPrevBitForIdx(idx)
			const rightBit = getPrevBitForIdx(idx + 1)
			const ruleMask = 1 << ((leftBit << 2) + (centerBit << 1) + rightBit)

			return (rule & ruleMask)
				? nextRow.concat(idx)
				: nextRow
		}, [])
}
