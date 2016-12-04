'use strict'

const yo = require('yo-yo')
const vbb = require('vbb-client')
const ms = require('ms')

const loop = require('./loop')
const lines = require('./lines.json')

const width = 500
const height = 500

const colors = {
	  S1:   '#de4da4'
	, S2:   '#005f27'
	, S3:   '#0a4c99'
	, S5:   '#ff5900'
	, S7:   '#6f4e9c'
	, S8:   '#55a822'
	, S9:   '#8a0e30'
	, S25:  '#005f27'
	, RING: '#a23b1e'
	, S45:  '#c38737'
	, S46:  '#c38737'
	, S47:  '#c38737'
	, S75:  '#6f4e9c'
	, S85:  '#55a822'
	, U1:   '#55a822'
	, U2:   '#ff3300'
	, U3:   '#019377'
	, U4:   '#ffd900'
	, U5:   '#672f17'
	, U6:   '#6f4e9c'
	, U7:   '#3690c0'
	, U8:   '#0a3c85'
	, U9:   '#ff7300'
	, U55:  '#672f17'
}

const delays = {} // by id



const s = new WebSocket('ws://163.172.184.156:8080/')
s.onmessage = (msg) => {
	const {station, delay} = JSON.parse(msg.data)
	delays[station] = delay
}
s.onerror = console.error

const getRandomTile = () => {
	var items = [
		'https://cdn.rawgit.com/tursics/isometric-icons/master/landscapeTiles/landscapeTiles_059.png',
		'https://cdn.rawgit.com/tursics/isometric-icons/master/landscapeTiles/landscapeTiles_067.png',
		'https://cdn.rawgit.com/tursics/isometric-icons/master/landscapeTiles/landscapeTiles_067.png',
		'https://cdn.rawgit.com/tursics/isometric-icons/master/landscapeTiles/landscapeTiles_067.png',
		'https://cdn.rawgit.com/tursics/isometric-icons/master/cityTiles/cityTiles_043.png',
		'https://cdn.rawgit.com/tursics/isometric-icons/master/cityTiles/cityTiles_051.png',
		'https://cdn.rawgit.com/tursics/isometric-icons/master/cityTiles/cityTiles_059.png',
		'https://cdn.rawgit.com/tursics/isometric-icons/master/cityTiles/cityTiles_067.png',
		'https://cdn.rawgit.com/tursics/isometric-icons/master/cityTiles/cityTiles_067.png',
		'https://cdn.rawgit.com/tursics/isometric-icons/master/cityTiles/cityTiles_067.png',
		'https://cdn.rawgit.com/tursics/isometric-icons/master/buildingTiles/buildingTiles_001.png',
		'https://cdn.rawgit.com/tursics/isometric-icons/master/buildingTiles/buildingTiles_004.png',
		'https://cdn.rawgit.com/tursics/isometric-icons/master/buildingTiles/buildingTiles_014.png',
		'https://cdn.rawgit.com/tursics/isometric-icons/master/buildingTiles/buildingTiles_020.png',
		'https://cdn.rawgit.com/tursics/isometric-icons/master/buildingTiles/buildingTiles_034.png',
		'https://cdn.rawgit.com/tursics/isometric-icons/master/buildingTiles/buildingTiles_099.png',
		'https://cdn.rawgit.com/tursics/isometric-icons/master/cityTiles/cityTiles_072.png'
	];
	return items[Math.floor(Math.random()*items.length)];
}

const renderFlat = (x, y) => yo `
	<image
		x="${x * 20 - 16.5}" y="${y * 20 * 0.55 - 25}"
		xlink:href="https://cdn.rawgit.com/tursics/isometric-icons/master/cityTiles/cityTiles_072.png"
		width="${20}" height="${60}" transform="scale(1, 1.82)"
	/>
`

const renderBackground = (x, y) => yo `
	<image
		x="${x * 20 - 16.5}" y="${y * 20 * 0.55 - 25}"
		xlink:href="${getRandomTile()}"
		width="${20}" height="${60}" transform="scale(1, 1.82)"
	/>
`

const renderSegment = (last, current, line) => yo `
	<path
		d="M${last.coords.x*20} ${last.coords.y*20} L ${current.coords.x*20} ${current.coords.y*20}"
		stroke="${colors[line.toUpperCase()] || '#555'}" stroke-width="5" stroke-linecap="round"
	/>
`

const delayColor = (delay) => {
	if (delay > 1000*60*10) return '#D92730'
	if (delay > 1000*60*5) return '#E0BB24'
	return '#0EB50E'
}

const renderHint = (s, delay) => yo `
	<text
		x="${s.coords.x * 20 + 5}" y="${s.coords.y * 20 * 0.55 - 15}"
		text-anchor="left" transform="scale(1, 1.82)"
		font-size="20" fill="${delayColor(delay || 0)}"
	>${ms(Math.abs(delay || 0))}</text>
`

const renderStation = (s, delay) => yo `
	<g>
		<image
			x="${s.coords.x * 20 - 10}" y="${s.coords.y * 20 * 0.55 - 35}"
			xlink:href="/transportDetails/transportDetailsSubahn_big.png"
			width="${20}" height="${60}" transform="scale(1, 1.82)"
		/>
		${delay > 0 ? renderHint(s, delay) : null}
	</g>
`

const bg = []

// for (let y = 0; y < 200; y += .5) {
// 	for (let x = 0; x < 100; x++) {
// 		const offset = y % 1 === 0 ? -.5 : 0
// 		if (Math.random() > .6) bg.push(renderBackground(x + offset, y))
// 		else bg.push(renderFlat(x + offset, y))
// 	}
// }

const render = (lines, delays) => {
	const tiles = [
		yo `<g class="bg">${bg}</g>`
	]

	for (let lineName in lines) {
		let lastPoint = null
		for (let point of lines[lineName]) {
			if (lastPoint) tiles.push(renderSegment(lastPoint, point, lineName))
			lastPoint = point
		}
	}

	const isRendered = {} // by id
	for (let lineName in lines) {
		let lastPoint = null
		for (let point of lines[lineName]) {
			if (point.type !== 'station') continue
			if (isRendered[point.id]) continue
			isRendered[point.id] = true
			tiles.push(renderStation(point, delays[point.id]))
		}
	}

	return yo `
		<g transform="scale(1, 0.55)">${tiles}</g>
	`
}

const el = render(lines, delays)
const rerender = () => {
	yo.update(el, render(lines, delays))
}
loop(rerender)
document.querySelector('#map').appendChild(el)
