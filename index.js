'use strict'

const yo = require('yo-yo')

const lines = require('./lines.json')

const width = 1000
const height = 1000



const renderGrass = (x, y) => yo `
	<path d="M ${x*20-10} ${y*20} L ${x*20} ${y*20-10} L ${x*20+10} ${y*20} L ${x*20} ${y*20+10} z" fill="#27ae60" />
`

const renderSegment = (last, current) => yo `
	<path
		d="M${last.coords.x*20} ${last.coords.y*20} L ${current.coords.x*20} ${current.coords.y*20}"
		stroke="#333" stroke-width="5" stroke-linecap="round"
	/>
`

	// <circle cx="${s.coords.x * 20}" cy="${s.coords.y * 20}" r="${6}" fill="#e74c3c" />
const renderStation = (s) => yo `
	<image
		x="${s.coords.x * 20}" y="${s.coords.y * 20}"
		xlink:href="/isometric-icons/transportDetails/transportDetailsSubahn.png"
	/>
`

const render = (lines) => {
	const tiles = []

	// grass
	for (let y = 0; y < height; y += 1) {
		for (let x = 0; x < width; x += 1) {
			const offset = y % 2 === 1 ? .5 : 0
			if (Math.random() < .3) tiles.push(renderGrass(x - offset, y - offset))
		}
	}

	for (let lineName in lines) {
		let lastPoint = null
		for (let point of lines[lineName]) {
			if (lastPoint) tiles.push(renderSegment(lastPoint, point))
			lastPoint = point
		}
	}

	for (let lineName in lines) {
		let lastPoint = null
		for (let point of lines[lineName]) {
			if (point) tiles.push(renderStation(point))
		}
	}

	tiles.push(renderStation({coords: {x: 0, y: 0}}))
	tiles.push(renderStation({coords: {x: 1, y: 1}}))

	return yo `
		<g transform="scale(1, .7)">${tiles}</g>
	`
}

const el = render(lines)
document.querySelector('#map').appendChild(el)
