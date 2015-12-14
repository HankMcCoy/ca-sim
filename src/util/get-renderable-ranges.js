import _ from 'lodash'

export default function getRenderableRanges({ startCellIdx, row }) {
	return row.reduce((ranges, idx) => {
		const relativeIdx = idx - startCellIdx
		if (!ranges.length) {
			return [{
				start: relativeIdx,
				length: 1,
				isActive: true,
			}]
		}

		const prevRange = _.last(ranges)
		const nextRangeStart = prevRange.start + prevRange.length

		if (nextRangeStart === relativeIdx) {
			prevRange.length += 1
		} else {
			ranges.push({
				start: relativeIdx,
				length: 1,
			})
		}

		return ranges
	}, [])
}
