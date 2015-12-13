import _ from 'lodash'

export default function getSortedActiveIdxs(activeIdxMap) {
	const activeIdxs = Object.keys(activeIdxMap).map(x => parseInt(x, 10))
	return _.sortBy(activeIdxs)
}
