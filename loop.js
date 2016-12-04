'use strict'

const raf = require('raf')

const request = (cb) => {
	const loop = () => {
		cb()
		requestAnimationFrame(loop)
	}
	setTimeout(loop, 0)
	return loop
}

module.exports = request
