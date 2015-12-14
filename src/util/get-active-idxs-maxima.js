import _ from 'lodash'

export default function getActiveIdxsMaxima(rows) {
	let leftmostActiveIdx = _.first(_.first(rows))
	let rightmostActiveIdx = _.last(_.first(rows))

	rows.slice(1).forEach((row) => {
		leftmostActiveIdx = Math.min(leftmostActiveIdx, _.first(row))
		rightmostActiveIdx = Math.max(rightmostActiveIdx, _.last(row))
	})

	return {
		leftmostActiveIdx,
		rightmostActiveIdx,
	}
}
