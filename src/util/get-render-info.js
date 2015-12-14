import getRenderableRanges from './get-renderable-ranges'
import getActiveIdxsMaxima from './get-active-idxs-maxima'

const minCellSize = 1
const maxCellSize = 5

export default function getRenderInfo({ rows, width, height }) {
	const renderWidthInPx = width
	const renderHeightInPx = height
	const constrainCellSize = (cellSize) => Math.max(Math.min(cellSize, maxCellSize), minCellSize)

	// We should center the viewport at the mid-point between the leftmost and rightmost active cells.
	const { leftmostActiveIdx, rightmostActiveIdx } = getActiveIdxsMaxima(rows)
	const activeRangeLength = rightmostActiveIdx - leftmostActiveIdx + 1
	const centerIdx = Math.round((rightmostActiveIdx + leftmostActiveIdx) / 2)

	// Figure out how small the cell size needs to be in order to display what we'd like to display
	// both horizontally and vertically. We then pick the smaller of these sizes so we guarantee we
	// display as much as of the graph as we can.
	const horizCellSize = constrainCellSize(Math.floor(renderWidthInPx / activeRangeLength))
	const vertCellSize = constrainCellSize(Math.floor(renderHeightInPx / rows.length))
	const cellSize = Math.min(horizCellSize, vertCellSize)

	const numCellsToDisplay = Math.floor(renderWidthInPx / cellSize)
	const startCellIdx = centerIdx - Math.floor(numCellsToDisplay / 2)
	const endCellIdx = startCellIdx + numCellsToDisplay - 1
	const numRowsToDisplay = Math.floor(renderHeightInPx / cellSize)
	const startRowIdx = Math.max(rows.length - numRowsToDisplay, 0)

	// Get the active indexes within only the viewable area
	const displayableRows = rows
		.filter((row, rowIdx) => rowIdx >= startRowIdx)
		.map((row) => {
			return row.filter((cellIdx) => cellIdx >= startCellIdx && cellIdx <= endCellIdx)
		})

	// Convert them to ranges
	const renderableRangesByRow = displayableRows.map((row) => {
		return getRenderableRanges({ startCellIdx, row })
	})

	// Return the ranges with the cell display size
	return {
		cellSize,
		renderableRangesByRow,
	}
}
