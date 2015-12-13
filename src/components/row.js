import _ from 'lodash'
import React, { Component } from 'react'
import { Block } from 'jsxstyle'

import { activeIdxMapPropType } from '../prop-types'
import getSortedActiveIdxs from '../util/get-sorted-active-idxs'

const Spacer = ({ isActive, width, height }) => (
	<Block
		float="left"
		background={isActive ? '#000' : 'transparent'}
		width={width}
		height={height} />
)

export default class Row extends Component {
	render() {
		const { activeIdxMap, startIdx, numCells, cellSize } = this.props
		const sortedActiveIdxs = getSortedActiveIdxs(activeIdxMap)
			.filter(idx => idx >= startIdx && idx < startIdx + numCells)
		const leftmostActiveIdx = _.first(sortedActiveIdxs)
		const rightmostActiveIdx = _.last(sortedActiveIdxs)
		const ranges = sortedActiveIdxs.reduce((ranges, idx) => {
			if (!ranges.length) {
				return [{
					start: idx,
					length: 1,
					isActive: true
				}]
			}

			const prevRange = _.last(ranges)
			const nextRangeStart = prevRange.start + prevRange.length

			if (nextRangeStart === idx) {
				prevRange.length += 1
			} else {
				ranges.push({
					start: nextRangeStart,
					length: idx - (nextRangeStart),
					isActive: false,
				})

				ranges.push({
					start: idx,
					length: 1,
					isActive: true,
				})
			}

			return ranges
		}, [])

		return (
			<Block height={`${cellSize}px`}>
				<Spacer
					isActive={false}
					width={(leftmostActiveIdx - startIdx) * cellSize}
					height={cellSize} />
				{ranges.map((range, idx) => (
					<Spacer
						key={idx}
						isActive={range.isActive}
						width={range.length * cellSize}
						height={cellSize} />
				))}
			</Block>
		)
	}

	shouldComponentUpdate(nextProps) {
		return !_.isEqual(this.props, nextProps)
	}
}

Row.propTypes = {
	activeIdxMap: activeIdxMapPropType,
}
