import _ from 'lodash'

import getSortedActiveIdxs from './get-sorted-active-idxs'

export default function getActiveIdxsMaxima(activeIdxMap) {
	const sortedActiveIdxs = getSortedActiveIdxs(activeIdxMap)

	return {
		leftmostActiveIdx: _.first(sortedActiveIdxs),
		rightmostActiveIdx: _.last(sortedActiveIdxs),
	}
}
