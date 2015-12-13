import _ from 'lodash'

export default function getActiveIdxsMaxima(activeIdxMap) {
	const activeIdxs = Object.keys(activeIdxMap).map(x => parseInt(x, 10))
	const sortedActiveIdxs = _.sortBy(activeIdxs)

	return {
		leftmostActiveIdx: _.first(sortedActiveIdxs),
		rightmostActiveIdx: _.last(sortedActiveIdxs),
	}
}
