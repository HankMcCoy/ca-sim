const getBitForIdx = (idx, activeIdxMap) => idx in activeIdxMap | 0

export default function getNextActiveIdxMap(prevActiveIdxMap, rule) {
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
