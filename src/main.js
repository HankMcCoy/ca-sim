import React from 'react'
import ReactDOM from 'react-dom'

import Game from './game'

[].forEach.call(document.querySelectorAll('.rule110-container'), (el) => {
	ReactDOM.render(<Game />, el)
})
