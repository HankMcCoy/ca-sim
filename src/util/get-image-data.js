export default function getImageData({
	imageData,
	renderableRangesByRow,
	width,
	cellSize,
}) {
	const { data } = imageData

	for (let i = 0; i < data.length; i += 4) {
		data[i] = 255
		data[i + 1] = 255
		data[i + 2] = 255
		data[i + 3] = 255
	}

	for (let rowIdx = 0; rowIdx < renderableRangesByRow.length; rowIdx++) {
		const ranges = renderableRangesByRow[rowIdx]

		for (let rangeIdx = 0; rangeIdx < ranges.length; rangeIdx++) {
			const range = ranges[rangeIdx]
			const rangeStartInPx = range.start * cellSize
			const rangeLengthInPx = range.length * cellSize

			for (let yOffset = 0; yOffset < cellSize; yOffset++) {
				for (let xOffset = 0; xOffset < rangeLengthInPx; xOffset++) {
					const pxIdx = ((rowIdx * cellSize) + yOffset) * width +
						rangeStartInPx + xOffset
					const idx = pxIdx * 4
					data[idx] = 0
					data[idx + 1] = 0
					data[idx + 2] = 0
				}
			}
		}
	}

	return imageData
}
