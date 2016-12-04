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



const renderGrass = (x, y) => yo `
	<path d="M ${x*20-10} ${y*20} L ${x*20} ${y*20-10} L ${x*20+10} ${y*20} L ${x*20} ${y*20+10} z" fill="#27ae60" />
`

const renderSegment = (last, current, line) => yo `
	<path
		d="M${last.coords.x*20} ${last.coords.y*20} L ${current.coords.x*20} ${current.coords.y*20}"
		stroke="${colors[line.toUpperCase()] || '#555'}" stroke-width="4" stroke-linecap="round"
	/>
`

const renderHint = (s, delay) => yo `
	<text
		x="${s.coords.x * 20}" y="${s.coords.y * 20 * 0.7 - 30}"
		text-anchor="middle" transform="scale(1, 1.43)"
	>${ms(Math.abs(delay || 0))}</text>
`

const renderStation = (s, delay) => yo `
	<g>
		<image
			style="cursor: pointer"
			x="${s.coords.x * 20 - 16.5}" y="${s.coords.y * 20 * 0.7 - 36}"
			xlink:href="/transportDetails/transportDetailsSubahn_big.png"
			width="${33}" height="${60}" transform="scale(1, 1.43)"
		/>
		${delay > 0 ? renderHint(s, delay) : null}
	</g>
`

const render = (lines, delays) => {
	const tiles = []

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
		<g transform="scale(1, .6)">${tiles}</g>
	`
}

const el = render(lines, delays)
const rerender = () => {
	yo.update(el, render(lines, delays))
}
loop(rerender)
document.querySelector('#map').appendChild(el)
