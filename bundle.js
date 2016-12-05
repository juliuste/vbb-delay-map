(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _templateObject = _taggedTemplateLiteral(['\n\t<path\n\t\td="M', ' ', ' L ', ' ', '"\n\t\tstroke="', '" stroke-width="5" stroke-linecap="round"\n\t/>\n'], ['\n\t<path\n\t\td="M', ' ', ' L ', ' ', '"\n\t\tstroke="', '" stroke-width="5" stroke-linecap="round"\n\t/>\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n\t<text\n\t\tx="', '" y="', '"\n\t\ttext-anchor="left" transform="scale(1, 1)"\n\t\tfont-size="20" fill="', '"\n\t>', '</text>\n'], ['\n\t<text\n\t\tx="', '" y="', '"\n\t\ttext-anchor="left" transform="scale(1, 1)"\n\t\tfont-size="20" fill="', '"\n\t>', '</text>\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n\t<g>\n\t\t<circle\n\t\t\tcx="', '" cy="', '" r="3"\n\t\t\tfill="#fff"\n\t\t/>\n\t\t', '\n\t</g>\n'], ['\n\t<g>\n\t\t<circle\n\t\t\tcx="', '" cy="', '" r="3"\n\t\t\tfill="#fff"\n\t\t/>\n\t\t', '\n\t</g>\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n\t\t<g transform="scale(1, 1)">', '</g>\n\t'], ['\n\t\t<g transform="scale(1, 1)">', '</g>\n\t']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var yo = require('yo-yo');
var vbb = require('vbb-client');
var ms = require('ms');

var loop = require('./loop');
var lines = require('./lines.json');

var width = 500;
var height = 500;

var colors = {
	S1: '#de4da4',
	S2: '#005f27',
	S3: '#0a4c99',
	S5: '#ff5900',
	S7: '#6f4e9c',
	S8: '#55a822',
	S9: '#8a0e30',
	S25: '#005f27',
	RING: '#a23b1e',
	S45: '#c38737',
	S46: '#c38737',
	S47: '#c38737',
	S75: '#6f4e9c',
	S85: '#55a822',
	U1: '#55a822',
	U2: '#ff3300',
	U3: '#019377',
	U4: '#ffd900',
	U5: '#672f17',
	U6: '#6f4e9c',
	U7: '#3690c0',
	U8: '#0a3c85',
	U9: '#ff7300',
	U55: '#672f17'
};

var delays = {}; // by id


var s = new WebSocket('ws://163.172.184.156:8080/');
s.onmessage = function (msg) {
	var { station, delay } = JSON.parse(msg.data);
	delays[station] = delay;
};
s.onerror = console.error;

var renderSegment = function (last, current, line) {
	return yo(_templateObject, last.coords.x * 20, last.coords.y * 20, current.coords.x * 20, current.coords.y * 20, colors[line.toUpperCase()] || '#555');
};

var delayColor = function (delay) {
	if (delay > 1000 * 60 * 10) return '#D92730';
	if (delay > 1000 * 60 * 5) return '#E0BB24';
	return '#0EB50E';
};

var renderHint = function (s, delay) {
	return yo(_templateObject2, s.coords.x * 20 + 5, s.coords.y * 20 * 1 - 15, delayColor(delay || 0), ms(Math.abs(delay || 0)));
};

var renderStation = function (s, delay) {
	return yo(_templateObject3, s.coords.x * 20, s.coords.y * 20 * 1, delay > 0 ? renderHint(s, delay) : null);
};

var render = function (lines, delays) {
	var tiles = [];

	for (var lineName in lines) {
		var lastPoint = null;
		for (var point of lines[lineName]) {
			if (lastPoint) tiles.push(renderSegment(lastPoint, point, lineName));
			lastPoint = point;
		}
	}

	var isRendered = {}; // by id
	for (var _lineName in lines) {
		var _lastPoint = null;
		for (var _point of lines[_lineName]) {
			if (_point.type !== 'station') continue;
			if (isRendered[_point.id]) continue;
			isRendered[_point.id] = true;
			tiles.push(renderStation(_point, delays[_point.id]));
		}
	}

	return yo(_templateObject4, tiles);
};

var el = render(lines, delays);
var rerender = function () {
	yo.update(el, render(lines, delays));
};
loop(rerender);
document.querySelector('#map').appendChild(el);
},{"./lines.json":2,"./loop":3,"ms":23,"vbb-client":52,"yo-yo":55}],2:[function(require,module,exports){
module.exports={
  "ring": [
    {
      "coords": {
        "x": 22,
        "y": 40
      },
      "type": "station",
      "name": "Westkreuz",
      "id": 9024102
    },
    {
      "coords": {
        "x": 22,
        "y": 43
      },
      "type": "station",
      "name": "Halensee",
      "id": 9040101
    },
    {
      "coords": {
        "x": 22,
        "y": 48
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 23,
        "y": 49
      },
      "type": "station",
      "name": "Hohenzollerndamm",
      "id": 9044101
    },
    {
      "coords": {
        "x": 27,
        "y": 53
      },
      "type": "station",
      "name": "Heidelberger Platz",
      "id": 9045102
    },
    {
      "coords": {
        "x": 33,
        "y": 53
      },
      "type": "station",
      "name": "Bundesplatz",
      "id": 9044202
    },
    {
      "coords": {
        "x": 39,
        "y": 53
      },
      "type": "station",
      "name": "Innsbrucker Platz",
      "id": 9054105
    },
    {
      "coords": {
        "x": 43,
        "y": 53
      },
      "type": "station",
      "name": "Schöneberg",
      "id": 9054104
    },
    {
      "coords": {
        "x": 48,
        "y": 53
      },
      "type": "station",
      "name": "Südkreuz",
      "id": 9058101
    },
    {
      "coords": {
        "x": 53,
        "y": 53
      },
      "type": "station",
      "name": "Tempelhof",
      "id": 9068201
    },
    {
      "coords": {
        "x": 63,
        "y": 53
      },
      "type": "station",
      "name": "Hermannstraße",
      "id": 9131527
    },
    {
      "coords": {
        "x": 68,
        "y": 53
      },
      "type": "station",
      "name": "Neukölln",
      "id": 9078102
    },
    {
      "coords": {
        "x": 70,
        "y": 53
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 72,
        "y": 51
      },
      "type": "station",
      "name": "Sonnenallee",
      "id": 9077106
    },
    {
      "coords": {
        "x": 76,
        "y": 47
      },
      "type": "station",
      "name": "Treptower Park",
      "id": 9190001
    },
    {
      "coords": {
        "x": 76,
        "y": 41
      },
      "type": "station",
      "name": "Ostkreuz",
      "id": 9120003
    },
    {
      "coords": {
        "x": 76,
        "y": 38
      },
      "type": "station",
      "name": "Frankfurter Allee",
      "id": 9120001
    },
    {
      "coords": {
        "x": 76,
        "y": 35
      },
      "type": "station",
      "name": "Storkower Straße",
      "id": 9160014
    },
    {
      "coords": {
        "x": 76,
        "y": 32
      },
      "type": "station",
      "name": "Landsberger Allee",
      "id": 9110004
    },
    {
      "coords": {
        "x": 76,
        "y": 30
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 72,
        "y": 26
      },
      "type": "station",
      "name": "Greifswalder Straße",
      "id": 9110020
    },
    {
      "coords": {
        "x": 70,
        "y": 24
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 68,
        "y": 24
      },
      "type": "station",
      "name": "Prenzlauer Allee",
      "id": 9110002
    },
    {
      "coords": {
        "x": 60,
        "y": 24
      },
      "type": "station",
      "name": "Schönhauser Allee",
      "id": 9110001
    },
    {
      "coords": {
        "x": 52,
        "y": 24
      },
      "type": "station",
      "name": "Gesundbrunnen",
      "id": 9007102
    },
    {
      "coords": {
        "x": 43,
        "y": 24
      },
      "type": "station",
      "name": "Wedding",
      "id": 9009104
    },
    {
      "coords": {
        "x": 38,
        "y": 24
      },
      "type": "station",
      "name": "Westhafen",
      "id": 9001201
    },
    {
      "coords": {
        "x": 33,
        "y": 24
      },
      "type": "station",
      "name": "Beusselstraße",
      "id": 9002102
    },
    {
      "coords": {
        "x": 27,
        "y": 24
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 26,
        "y": 25
      },
      "type": "station",
      "name": "Jungfernheide",
      "id": 9020201
    },
    {
      "coords": {
        "x": 22,
        "y": 29
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 22,
        "y": 32
      },
      "type": "station",
      "name": "Westend",
      "id": 9026207
    },
    {
      "coords": {
        "x": 22,
        "y": 37
      },
      "type": "station",
      "name": "Messe Nord / ICC",
      "id": 9024106
    },
    {
      "coords": {
        "x": 22,
        "y": 40
      },
      "type": "station",
      "name": "Westkreuz",
      "id": 9024102
    }
  ],
  "s1": [
    {
      "coords": {
        "x": 35,
        "y": 0
      },
      "type": "station",
      "name": "Oranienburg",
      "id": 9200005
    },
    {
      "coords": {
        "x": 36,
        "y": 1
      },
      "type": "station",
      "name": "Lehnitz",
      "id": 9200006
    },
    {
      "coords": {
        "x": 37,
        "y": 2
      },
      "type": "station",
      "name": "Borgsdorf",
      "id": 9200007
    },
    {
      "coords": {
        "x": 38,
        "y": 3
      },
      "type": "station",
      "name": "Birkenwerder",
      "id": 9200008
    },
    {
      "coords": {
        "x": 39,
        "y": 4
      },
      "type": "station",
      "name": "Hohen Neuendorf",
      "id": 9200009
    },
    {
      "coords": {
        "x": 40,
        "y": 5
      },
      "type": "station",
      "name": "Frohnau",
      "id": 9092201
    },
    {
      "coords": {
        "x": 41,
        "y": 6
      },
      "type": "station",
      "name": "Hermsdorf",
      "id": 9092257
    },
    {
      "coords": {
        "x": 42,
        "y": 7
      },
      "type": "station",
      "name": "Waidmannslust",
      "id": 9094101
    },
    {
      "coords": {
        "x": 43,
        "y": 8
      },
      "type": "station",
      "name": "Wittenau",
      "id": 9096407
    },
    {
      "coords": {
        "x": 44,
        "y": 9
      },
      "type": "station",
      "name": "Wilhelmsruh",
      "id": 9084101
    },
    {
      "coords": {
        "x": 46,
        "y": 11
      },
      "type": "station",
      "name": "Schönholz",
      "id": 9085201
    },
    {
      "coords": {
        "x": 52,
        "y": 17
      },
      "type": "station",
      "name": "Wollankstraße",
      "id": 9130003
    },
    {
      "coords": {
        "x": 55,
        "y": 20
      },
      "type": "station",
      "name": "Bornholmer Straße",
      "id": 9110011
    },
    {
      "coords": {
        "x": 52,
        "y": 23
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 52,
        "y": 24
      },
      "type": "station",
      "name": "Gesundbrunnen",
      "id": 9007102
    },
    {
      "coords": {
        "x": 52,
        "y": 26
      },
      "type": "station",
      "name": "Humboldthain",
      "id": 9008101
    },
    {
      "coords": {
        "x": 52,
        "y": 27
      },
      "type": "station",
      "name": "Nordbahnhof",
      "id": 9007104
    },
    {
      "coords": {
        "x": 52,
        "y": 29
      },
      "type": "station",
      "name": "Oranienburger Straße",
      "id": 9096202
    },
    {
      "coords": {
        "x": 52,
        "y": 31
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 51,
        "y": 32
      },
      "type": "station",
      "name": "Friedrichstraße",
      "id": 9024108
    },
    {
      "coords": {
        "x": 48,
        "y": 35
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 48,
        "y": 36
      },
      "type": "station",
      "name": "Brandenburger Tor",
      "id": 9100025
    },
    {
      "coords": {
        "x": 48,
        "y": 39
      },
      "type": "station",
      "name": "Potsdamer Platz",
      "id": 9100020
    },
    {
      "coords": {
        "x": 48,
        "y": 41
      },
      "type": "station",
      "name": "Anhalter Bahnhof",
      "id": 9012101
    },
    {
      "coords": {
        "x": 48,
        "y": 48
      },
      "type": "station",
      "name": "Yorckstraße",
      "id": 9017105
    },
    {
      "coords": {
        "x": 45,
        "y": 51
      },
      "type": "station",
      "name": "Julius-Leber-Brücke",
      "id": 9057104
    },
    {
      "coords": {
        "x": 43,
        "y": 53
      },
      "type": "station",
      "name": "Schöneberg",
      "id": 9054104
    },
    {
      "coords": {
        "x": 39,
        "y": 57
      },
      "type": "station",
      "name": "Friedenau",
      "id": 9060101
    },
    {
      "coords": {
        "x": 36,
        "y": 60
      },
      "type": "station",
      "name": "Feuerbachstraße",
      "id": 9063101
    },
    {
      "coords": {
        "x": 33,
        "y": 63
      },
      "type": "station",
      "name": "Rathaus Steglitz",
      "id": 9062782
    },
    {
      "coords": {
        "x": 31,
        "y": 65
      },
      "type": "station",
      "name": "Botanischer Garten",
      "id": 9051307
    },
    {
      "coords": {
        "x": 29,
        "y": 67
      },
      "type": "station",
      "name": "Lichterfelde West",
      "id": 9066171
    },
    {
      "coords": {
        "x": 24,
        "y": 67
      },
      "type": "station",
      "name": "Sundgauer Straße",
      "id": 9049202
    },
    {
      "coords": {
        "x": 19,
        "y": 67
      },
      "type": "station",
      "name": "Zehlendorf",
      "id": 9049201
    },
    {
      "coords": {
        "x": 16,
        "y": 64
      },
      "type": "station",
      "name": "Mexikoplatz",
      "id": 9050301
    },
    {
      "coords": {
        "x": 12,
        "y": 64
      },
      "type": "station",
      "name": "Schlachtensee",
      "id": 9050355
    },
    {
      "coords": {
        "x": 9,
        "y": 67
      },
      "type": "station",
      "name": "Nikolassee",
      "id": 9052201
    },
    {
      "coords": {
        "x": 8,
        "y": 68
      },
      "type": "station",
      "name": "Wannsee",
      "id": 9053301
    }
  ],
  "s2": [
    {
      "coords": {
        "x": 72,
        "y": 3
      },
      "type": "station",
      "name": "Bernau",
      "id": 9350160
    },
    {
      "coords": {
        "x": 71,
        "y": 4
      },
      "type": "station",
      "name": "Bernau-Friedenstal",
      "id": 9350161
    },
    {
      "coords": {
        "x": 70,
        "y": 5
      },
      "type": "station",
      "name": "Zepernick",
      "id": 9350163
    },
    {
      "coords": {
        "x": 69,
        "y": 6
      },
      "type": "station",
      "name": "Röntgental",
      "id": 9350162
    },
    {
      "coords": {
        "x": 68,
        "y": 7
      },
      "type": "station",
      "name": "Buch",
      "id": 9135001
    },
    {
      "coords": {
        "x": 67,
        "y": 8
      },
      "type": "station",
      "name": "Karow",
      "id": 9143509
    },
    {
      "coords": {
        "x": 64,
        "y": 11
      },
      "type": "station",
      "name": "Blankenburg",
      "id": 9142001
    },
    {
      "coords": {
        "x": 62,
        "y": 13
      },
      "type": "station",
      "name": "Pankow-Heinersdorf",
      "id": 9130001
    },
    {
      "coords": {
        "x": 60,
        "y": 15
      },
      "type": "station",
      "name": "Pankow",
      "id": 9130002
    },
    {
      "coords": {
        "x": 55,
        "y": 20
      },
      "type": "station",
      "name": "Bornholmer Straße",
      "id": 9110011
    },
    {
      "coords": {
        "x": 52,
        "y": 23
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 52,
        "y": 24
      },
      "type": "station",
      "name": "Gesundbrunnen",
      "id": 9007102
    },
    {
      "coords": {
        "x": 52,
        "y": 26
      },
      "type": "station",
      "name": "Humboldthain",
      "id": 9008101
    },
    {
      "coords": {
        "x": 52,
        "y": 27
      },
      "type": "station",
      "name": "Nordbahnhof",
      "id": 9007104
    },
    {
      "coords": {
        "x": 52,
        "y": 29
      },
      "type": "station",
      "name": "Oranienburger Straße",
      "id": 9096202
    },
    {
      "coords": {
        "x": 52,
        "y": 31
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 51,
        "y": 32
      },
      "type": "station",
      "name": "Friedrichstraße",
      "id": 9024108
    },
    {
      "coords": {
        "x": 48,
        "y": 35
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 48,
        "y": 36
      },
      "type": "station",
      "name": "Brandenburger Tor",
      "id": 9100025
    },
    {
      "coords": {
        "x": 48,
        "y": 39
      },
      "type": "station",
      "name": "Potsdamer Platz",
      "id": 9100020
    },
    {
      "coords": {
        "x": 48,
        "y": 41
      },
      "type": "station",
      "name": "Anhalter Bahnhof",
      "id": 9012101
    },
    {
      "coords": {
        "x": 48,
        "y": 48
      },
      "type": "station",
      "name": "Yorckstraße",
      "id": 9017105
    },
    {
      "coords": {
        "x": 48,
        "y": 53
      },
      "type": "station",
      "name": "Südkreuz",
      "id": 9058101
    },
    {
      "coords": {
        "x": 48,
        "y": 59
      },
      "type": "station",
      "name": "Priesterweg",
      "id": 9058102
    },
    {
      "coords": {
        "x": 48,
        "y": 60
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 50,
        "y": 62
      },
      "type": "station",
      "name": "Attilastraße",
      "id": 9068304
    },
    {
      "coords": {
        "x": 52,
        "y": 64
      },
      "type": "station",
      "name": "Marienfelde",
      "id": 9073101
    },
    {
      "coords": {
        "x": 52,
        "y": 66
      },
      "type": "station",
      "name": "Buckower Chaussee",
      "id": 9072101
    },
    {
      "coords": {
        "x": 52,
        "y": 69
      },
      "type": "station",
      "name": "Schichauweg",
      "id": 9074202
    },
    {
      "coords": {
        "x": 52,
        "y": 72
      },
      "type": "station",
      "name": "Lichtenrade",
      "id": 9074201
    },
    {
      "coords": {
        "x": 52,
        "y": 74
      },
      "type": "station",
      "name": "Mahlow",
      "id": 9245028
    },
    {
      "coords": {
        "x": 52,
        "y": 76
      },
      "type": "station",
      "name": "Blankenfelde",
      "id": 9133503
    }
  ],
  "s25": [
    {
      "coords": {
        "x": 25,
        "y": 5
      },
      "type": "station",
      "name": "Hennigsdorf",
      "id": 9200000
    },
    {
      "coords": {
        "x": 27,
        "y": 7
      },
      "type": "station",
      "name": "Heiligensee",
      "id": 9091203
    },
    {
      "coords": {
        "x": 28,
        "y": 8
      },
      "type": "station",
      "name": "Schulzendorf",
      "id": 9091205
    },
    {
      "coords": {
        "x": 30,
        "y": 10
      },
      "type": "station",
      "name": "Tegel",
      "id": 9089451
    },
    {
      "coords": {
        "x": 31,
        "y": 11
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 33,
        "y": 11
      },
      "type": "station",
      "name": "Eichborndamm",
      "id": 9096405
    },
    {
      "coords": {
        "x": 39,
        "y": 11
      },
      "type": "station",
      "name": "Karl-Bonhoeffer-Nervenklinik",
      "id": 9096458
    },
    {
      "coords": {
        "x": 42,
        "y": 11
      },
      "type": "station",
      "name": "Alt-Reinickendorf",
      "id": 9085105
    },
    {
      "coords": {
        "x": 46,
        "y": 11
      },
      "type": "station",
      "name": "Schönholz",
      "id": 9085201
    },
    {
      "coords": {
        "x": 52,
        "y": 17
      },
      "type": "station",
      "name": "Wollankstraße",
      "id": 9130003
    },
    {
      "coords": {
        "x": 55,
        "y": 20
      },
      "type": "station",
      "name": "Bornholmer Straße",
      "id": 9110011
    },
    {
      "coords": {
        "x": 52,
        "y": 23
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 52,
        "y": 24
      },
      "type": "station",
      "name": "Gesundbrunnen",
      "id": 9007102
    },
    {
      "coords": {
        "x": 52,
        "y": 26
      },
      "type": "station",
      "name": "Humboldthain",
      "id": 9008101
    },
    {
      "coords": {
        "x": 52,
        "y": 27
      },
      "type": "station",
      "name": "Nordbahnhof",
      "id": 9007104
    },
    {
      "coords": {
        "x": 52,
        "y": 29
      },
      "type": "station",
      "name": "Oranienburger Straße",
      "id": 9096202
    },
    {
      "coords": {
        "x": 52,
        "y": 31
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 51,
        "y": 32
      },
      "type": "station",
      "name": "Friedrichstraße",
      "id": 9024108
    },
    {
      "coords": {
        "x": 48,
        "y": 35
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 48,
        "y": 36
      },
      "type": "station",
      "name": "Brandenburger Tor",
      "id": 9100025
    },
    {
      "coords": {
        "x": 48,
        "y": 39
      },
      "type": "station",
      "name": "Potsdamer Platz",
      "id": 9100020
    },
    {
      "coords": {
        "x": 48,
        "y": 41
      },
      "type": "station",
      "name": "Anhalter Bahnhof",
      "id": 9012101
    },
    {
      "coords": {
        "x": 48,
        "y": 48
      },
      "type": "station",
      "name": "Yorckstraße",
      "id": 9017105
    },
    {
      "coords": {
        "x": 48,
        "y": 53
      },
      "type": "station",
      "name": "Südkreuz",
      "id": 9058101
    },
    {
      "coords": {
        "x": 48,
        "y": 59
      },
      "type": "station",
      "name": "Priesterweg",
      "id": 9058102
    },
    {
      "coords": {
        "x": 48,
        "y": 60
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 46,
        "y": 62
      },
      "type": "station",
      "name": "Südende",
      "id": 9063452
    },
    {
      "coords": {
        "x": 44,
        "y": 64
      },
      "type": "station",
      "name": "Lichterfelde Ost",
      "id": 9064301
    },
    {
      "coords": {
        "x": 41,
        "y": 67
      },
      "type": "station",
      "name": "Osdorfer Straße",
      "id": 9064256
    },
    {
      "coords": {
        "x": 38,
        "y": 70
      },
      "type": "station",
      "name": "Lichterfelde Süd",
      "id": 9064278
    },
    {
      "coords": {
        "x": 36,
        "y": 72
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 31,
        "y": 72
      },
      "type": "station",
      "name": "Teltow Stadt",
      "id": 9220114
    }
  ],
  "s3": [
    {
      "coords": {
        "x": 76,
        "y": 41
      },
      "type": "station",
      "name": "Ostkreuz",
      "id": 9120003
    },
    {
      "coords": {
        "x": 79,
        "y": 41
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 80,
        "y": 42
      },
      "type": "station",
      "name": "Rummelsburg",
      "id": 9160001
    },
    {
      "coords": {
        "x": 82,
        "y": 44
      },
      "type": "station",
      "name": "Betriebsbahnhof Rummelsburg",
      "id": 9160002
    },
    {
      "coords": {
        "x": 84,
        "y": 46
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 86,
        "y": 46
      },
      "type": "station",
      "name": "Karlshorst",
      "id": 9162001
    },
    {
      "coords": {
        "x": 90,
        "y": 46
      },
      "type": "station",
      "name": "Wuhlheide",
      "id": 9180002
    },
    {
      "coords": {
        "x": 92,
        "y": 48
      },
      "type": "station",
      "name": "Köpenick",
      "id": 9180001
    },
    {
      "coords": {
        "x": 94,
        "y": 50
      },
      "type": "station",
      "name": "Hirschgarten",
      "id": 9182003
    },
    {
      "coords": {
        "x": 96,
        "y": 52
      },
      "type": "station",
      "name": "Friedrichshagen",
      "id": 9182002
    },
    {
      "coords": {
        "x": 98,
        "y": 54
      },
      "type": "station",
      "name": "Rahnsdorf",
      "id": 9183001
    },
    {
      "coords": {
        "x": 100,
        "y": 56
      },
      "type": "station",
      "name": "Wilhelmshagen",
      "id": 9183002
    },
    {
      "coords": {
        "x": 102,
        "y": 58
      },
      "type": "station",
      "name": "Erkner",
      "id": 9310004
    }
  ],
  "s45": [
    {
      "coords": {
        "x": 48,
        "y": 53
      },
      "type": "station",
      "name": "Südkreuz",
      "id": 9058101
    },
    {
      "coords": {
        "x": 53,
        "y": 53
      },
      "type": "station",
      "name": "Tempelhof",
      "id": 9068201
    },
    {
      "coords": {
        "x": 63,
        "y": 53
      },
      "type": "station",
      "name": "Hermannstraße",
      "id": 9131527
    },
    {
      "coords": {
        "x": 68,
        "y": 53
      },
      "type": "station",
      "name": "Neukölln",
      "id": 9078102
    },
    {
      "coords": {
        "x": 76,
        "y": 53
      },
      "type": "station",
      "name": "Köllnische Heide",
      "id": 9077155
    },
    {
      "coords": {
        "x": 82,
        "y": 53
      },
      "type": "station",
      "name": "Baumschulenweg",
      "id": 9191001
    },
    {
      "coords": {
        "x": 84,
        "y": 55
      },
      "type": "station",
      "name": "Schöneweide",
      "id": 9194006
    },
    {
      "coords": {
        "x": 86,
        "y": 57
      },
      "type": "station",
      "name": "Betriebsbahnhof Schöneweide",
      "id": 9193001
    },
    {
      "coords": {
        "x": 88,
        "y": 59
      },
      "type": "station",
      "name": "Adlershof",
      "id": 9193002
    },
    {
      "coords": {
        "x": 88,
        "y": 64
      },
      "type": "station",
      "name": "Altglienicke",
      "id": 9195006
    },
    {
      "coords": {
        "x": 85,
        "y": 67
      },
      "type": "station",
      "name": "Grünbergallee",
      "id": 9196001
    },
    {
      "coords": {
        "x": 78,
        "y": 74
      },
      "type": "station",
      "name": "Flughafen Berlin-Schönefeld",
      "id": 9260005
    }
  ],
  "s46": [
    {
      "coords": {
        "x": 22,
        "y": 32
      },
      "type": "station",
      "name": "Westend",
      "id": 9026207
    },
    {
      "coords": {
        "x": 22,
        "y": 40
      },
      "type": "station",
      "name": "Westkreuz",
      "id": 9024102
    },
    {
      "coords": {
        "x": 22,
        "y": 43
      },
      "type": "station",
      "name": "Halensee",
      "id": 9040101
    },
    {
      "coords": {
        "x": 22,
        "y": 48
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 23,
        "y": 49
      },
      "type": "station",
      "name": "Hohenzollerndamm",
      "id": 9044101
    },
    {
      "coords": {
        "x": 27,
        "y": 53
      },
      "type": "station",
      "name": "Heidelberger Platz",
      "id": 9045102
    },
    {
      "coords": {
        "x": 33,
        "y": 53
      },
      "type": "station",
      "name": "Bundesplatz",
      "id": 9044202
    },
    {
      "coords": {
        "x": 39,
        "y": 53
      },
      "type": "station",
      "name": "Innsbrucker Platz",
      "id": 9054105
    },
    {
      "coords": {
        "x": 43,
        "y": 53
      },
      "type": "station",
      "name": "Schöneberg",
      "id": 9054104
    },
    {
      "coords": {
        "x": 48,
        "y": 53
      },
      "type": "station",
      "name": "Südkreuz",
      "id": 9058101
    },
    {
      "coords": {
        "x": 53,
        "y": 53
      },
      "type": "station",
      "name": "Tempelhof",
      "id": 9068201
    },
    {
      "coords": {
        "x": 63,
        "y": 53
      },
      "type": "station",
      "name": "Hermannstraße",
      "id": 9131527
    },
    {
      "coords": {
        "x": 68,
        "y": 53
      },
      "type": "station",
      "name": "Neukölln",
      "id": 9078102
    },
    {
      "coords": {
        "x": 76,
        "y": 53
      },
      "type": "station",
      "name": "Köllnische Heide",
      "id": 9077155
    },
    {
      "coords": {
        "x": 82,
        "y": 53
      },
      "type": "station",
      "name": "Baumschulenweg",
      "id": 9191001
    },
    {
      "coords": {
        "x": 84,
        "y": 55
      },
      "type": "station",
      "name": "Schöneweide",
      "id": 9194006
    },
    {
      "coords": {
        "x": 86,
        "y": 57
      },
      "type": "station",
      "name": "Betriebsbahnhof Schöneweide",
      "id": 9193001
    },
    {
      "coords": {
        "x": 88,
        "y": 59
      },
      "type": "station",
      "name": "Adlershof",
      "id": 9193002
    },
    {
      "coords": {
        "x": 91,
        "y": 62
      },
      "type": "station",
      "name": "Grünau",
      "id": 9186001
    },
    {
      "coords": {
        "x": 93,
        "y": 64
      },
      "type": "station",
      "name": "Eichwalde",
      "id": 9260004
    },
    {
      "coords": {
        "x": 95,
        "y": 66
      },
      "type": "station",
      "name": "Zeuthen",
      "id": 9260003
    },
    {
      "coords": {
        "x": 97,
        "y": 68
      },
      "type": "station",
      "name": "Wildau",
      "id": 9260002
    },
    {
      "coords": {
        "x": 99,
        "y": 70
      },
      "type": "station",
      "name": "Königs Wusterhausen",
      "id": 9260001
    }
  ],
  "s47": [
    {
      "coords": {
        "x": 63,
        "y": 53
      },
      "type": "station",
      "name": "Hermannstraße",
      "id": 9131527
    },
    {
      "coords": {
        "x": 68,
        "y": 53
      },
      "type": "station",
      "name": "Neukölln",
      "id": 9078102
    },
    {
      "coords": {
        "x": 76,
        "y": 53
      },
      "type": "station",
      "name": "Köllnische Heide",
      "id": 9077155
    },
    {
      "coords": {
        "x": 82,
        "y": 53
      },
      "type": "station",
      "name": "Baumschulenweg",
      "id": 9191001
    },
    {
      "coords": {
        "x": 84,
        "y": 55
      },
      "type": "station",
      "name": "Schöneweide",
      "id": 9194006
    },
    {
      "coords": {
        "x": 87,
        "y": 55
      },
      "type": "station",
      "name": "Oberspree",
      "id": 9180547
    },
    {
      "coords": {
        "x": 90,
        "y": 55
      },
      "type": "station",
      "name": "Spindlersfeld",
      "id": 9180003
    }
  ],
  "s5": [
    {
      "coords": {
        "x": 3,
        "y": 28
      },
      "type": "station",
      "name": "Spandau",
      "id": 9029302
    },
    {
      "coords": {
        "x": 5,
        "y": 30
      },
      "type": "station",
      "name": "Stresow",
      "id": 9030202
    },
    {
      "coords": {
        "x": 8,
        "y": 33
      },
      "type": "station",
      "name": "Pichelsberg",
      "id": 9025424
    },
    {
      "coords": {
        "x": 10,
        "y": 35
      },
      "type": "station",
      "name": "Olympiastadion",
      "id": 9025301
    },
    {
      "coords": {
        "x": 12,
        "y": 37
      },
      "type": "station",
      "name": "Heerstraße",
      "id": 9032106
    },
    {
      "coords": {
        "x": 15,
        "y": 40
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 16,
        "y": 40
      },
      "type": "station",
      "name": "Messe Süd",
      "id": 9025423
    },
    {
      "coords": {
        "x": 22,
        "y": 40
      },
      "type": "station",
      "name": "Westkreuz",
      "id": 9024102
    },
    {
      "coords": {
        "x": 27,
        "y": 40
      },
      "type": "station",
      "name": "Charlottenburg",
      "id": 9024101
    },
    {
      "coords": {
        "x": 30,
        "y": 40
      },
      "type": "station",
      "name": "Savignyplatz",
      "id": 9024204
    },
    {
      "coords": {
        "x": 34,
        "y": 40
      },
      "type": "station",
      "name": "Zoologischer Garten",
      "id": 9023201
    },
    {
      "coords": {
        "x": 37,
        "y": 37
      },
      "type": "station",
      "name": "Tiergarten",
      "id": 9003155
    },
    {
      "coords": {
        "x": 40,
        "y": 34
      },
      "type": "station",
      "name": "Bellevue",
      "id": 9003252
    },
    {
      "coords": {
        "x": 42,
        "y": 32
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 44,
        "y": 32
      },
      "type": "station",
      "name": "Hauptbahnhof",
      "id": 9003201
    },
    {
      "coords": {
        "x": 51,
        "y": 32
      },
      "type": "station",
      "name": "Friedrichstraße",
      "id": 9024108
    },
    {
      "coords": {
        "x": 55,
        "y": 32
      },
      "type": "station",
      "name": "Hackescher Markt",
      "id": 9100002
    },
    {
      "coords": {
        "x": 60,
        "y": 32
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 62,
        "y": 34
      },
      "type": "station",
      "name": "Alexanderplatz",
      "id": 9100005
    },
    {
      "coords": {
        "x": 64,
        "y": 36
      },
      "type": "station",
      "name": "Jannowitzbrücke",
      "id": 9100004
    },
    {
      "coords": {
        "x": 66,
        "y": 38
      },
      "type": "station",
      "name": "Ostbahnhof",
      "id": 9120005
    },
    {
      "coords": {
        "x": 69,
        "y": 41
      },
      "type": "station",
      "name": "Warschauer Straße",
      "id": 9120014
    },
    {
      "coords": {
        "x": 76,
        "y": 41
      },
      "type": "station",
      "name": "Ostkreuz",
      "id": 9120003
    },
    {
      "coords": {
        "x": 79,
        "y": 41
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 80,
        "y": 40
      },
      "type": "station",
      "name": "Nöldnerplatz",
      "id": 9160003
    },
    {
      "coords": {
        "x": 82,
        "y": 38
      },
      "type": "station",
      "name": "Lichtenberg",
      "id": 9160522
    },
    {
      "coords": {
        "x": 84,
        "y": 36
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 85,
        "y": 36
      },
      "type": "station",
      "name": "Friedrichsfelde Ost",
      "id": 9171002
    },
    {
      "coords": {
        "x": 90,
        "y": 36
      },
      "type": "station",
      "name": "Biesdorf",
      "id": 9171001
    },
    {
      "coords": {
        "x": 93,
        "y": 36
      },
      "type": "station",
      "name": "Wuhletal",
      "id": 9175001
    },
    {
      "coords": {
        "x": 97,
        "y": 36
      },
      "type": "station",
      "name": "Kaulsdorf",
      "id": 9175002
    },
    {
      "coords": {
        "x": 101,
        "y": 36
      },
      "type": "station",
      "name": "Mahlsdorf",
      "id": 9176001
    },
    {
      "coords": {
        "x": 106,
        "y": 36
      },
      "type": "station",
      "name": "Birkenstein",
      "id": 9320026
    },
    {
      "coords": {
        "x": 108,
        "y": 36
      },
      "type": "station",
      "name": "Hoppegarten",
      "id": 9320008
    },
    {
      "coords": {
        "x": 109,
        "y": 35
      },
      "type": "station",
      "name": "Neuenhagen",
      "id": 9320007
    },
    {
      "coords": {
        "x": 110,
        "y": 34
      },
      "type": "station",
      "name": "Fredersdorf",
      "id": 9320006
    },
    {
      "coords": {
        "x": 111,
        "y": 33
      },
      "type": "station",
      "name": "Petershagen Nord",
      "id": 9320005
    },
    {
      "coords": {
        "x": 111,
        "y": 31
      },
      "type": "station",
      "name": "Strausberg",
      "id": 9320004
    },
    {
      "coords": {
        "x": 111,
        "y": 29
      },
      "type": "station",
      "name": "Hegermühle",
      "id": 9320003
    },
    {
      "coords": {
        "x": 111,
        "y": 27
      },
      "type": "station",
      "name": "Strausberg Stadt",
      "id": 9320002
    },
    {
      "coords": {
        "x": 111,
        "y": 25
      },
      "type": "station",
      "name": "Strausberg Nord",
      "id": 9320001
    }
  ],
  "s7": [
    {
      "coords": {
        "x": 0,
        "y": 76
      },
      "type": "station",
      "name": "Potsdam Hbf",
      "id": 9230999
    },
    {
      "coords": {
        "x": 2,
        "y": 74
      },
      "type": "station",
      "name": "Babelsberg",
      "id": 9230181
    },
    {
      "coords": {
        "x": 5,
        "y": 71
      },
      "type": "station",
      "name": "Griebnitzsee",
      "id": 9230003
    },
    {
      "coords": {
        "x": 8,
        "y": 68
      },
      "type": "station",
      "name": "Wannsee",
      "id": 9053301
    },
    {
      "coords": {
        "x": 9,
        "y": 67
      },
      "type": "station",
      "name": "Nikolassee",
      "id": 9052201
    },
    {
      "coords": {
        "x": 10,
        "y": 66
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 10,
        "y": 48
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 13,
        "y": 45
      },
      "type": "station",
      "name": "Grunewald",
      "id": 9054192
    },
    {
      "coords": {
        "x": 18,
        "y": 40
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 22,
        "y": 40
      },
      "type": "station",
      "name": "Westkreuz",
      "id": 9024102
    },
    {
      "coords": {
        "x": 27,
        "y": 40
      },
      "type": "station",
      "name": "Charlottenburg",
      "id": 9024101
    },
    {
      "coords": {
        "x": 30,
        "y": 40
      },
      "type": "station",
      "name": "Savignyplatz",
      "id": 9024204
    },
    {
      "coords": {
        "x": 34,
        "y": 40
      },
      "type": "station",
      "name": "Zoologischer Garten",
      "id": 9023201
    },
    {
      "coords": {
        "x": 37,
        "y": 37
      },
      "type": "station",
      "name": "Tiergarten",
      "id": 9003155
    },
    {
      "coords": {
        "x": 40,
        "y": 34
      },
      "type": "station",
      "name": "Bellevue",
      "id": 9003252
    },
    {
      "coords": {
        "x": 42,
        "y": 32
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 44,
        "y": 32
      },
      "type": "station",
      "name": "Hauptbahnhof",
      "id": 9003201
    },
    {
      "coords": {
        "x": 51,
        "y": 32
      },
      "type": "station",
      "name": "Friedrichstraße",
      "id": 9024108
    },
    {
      "coords": {
        "x": 55,
        "y": 32
      },
      "type": "station",
      "name": "Hackescher Markt",
      "id": 9100002
    },
    {
      "coords": {
        "x": 60,
        "y": 32
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 62,
        "y": 34
      },
      "type": "station",
      "name": "Alexanderplatz",
      "id": 9100005
    },
    {
      "coords": {
        "x": 64,
        "y": 36
      },
      "type": "station",
      "name": "Jannowitzbrücke",
      "id": 9100004
    },
    {
      "coords": {
        "x": 66,
        "y": 38
      },
      "type": "station",
      "name": "Ostbahnhof",
      "id": 9120005
    },
    {
      "coords": {
        "x": 69,
        "y": 41
      },
      "type": "station",
      "name": "Warschauer Straße",
      "id": 9120014
    },
    {
      "coords": {
        "x": 76,
        "y": 41
      },
      "type": "station",
      "name": "Ostkreuz",
      "id": 9120003
    },
    {
      "coords": {
        "x": 79,
        "y": 41
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 80,
        "y": 40
      },
      "type": "station",
      "name": "Nöldnerplatz",
      "id": 9160003
    },
    {
      "coords": {
        "x": 82,
        "y": 38
      },
      "type": "station",
      "name": "Lichtenberg",
      "id": 9160522
    },
    {
      "coords": {
        "x": 84,
        "y": 36
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 85,
        "y": 36
      },
      "type": "station",
      "name": "Friedrichsfelde Ost",
      "id": 9171002
    },
    {
      "coords": {
        "x": 87,
        "y": 36
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 87,
        "y": 32
      },
      "type": "station",
      "name": "Springpfuhl",
      "id": 9171003
    },
    {
      "coords": {
        "x": 87,
        "y": 30
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 89,
        "y": 28
      },
      "type": "station",
      "name": "Poelchaustraße",
      "id": 9170019
    },
    {
      "coords": {
        "x": 91,
        "y": 26
      },
      "type": "station",
      "name": "Marzahn",
      "id": 9170010
    },
    {
      "coords": {
        "x": 93,
        "y": 24
      },
      "type": "station",
      "name": "Raoul-Wallenberg-Straße",
      "id": 9170002
    },
    {
      "coords": {
        "x": 95,
        "y": 22
      },
      "type": "station",
      "name": "Mehrower Allee",
      "id": 9170003
    },
    {
      "coords": {
        "x": 97,
        "y": 20
      },
      "type": "station",
      "name": "Ahrensfelde",
      "id": 9170006
    }
  ],
  "s75": [
    {
      "coords": {
        "x": 22,
        "y": 40
      },
      "type": "station",
      "name": "Westkreuz",
      "id": 9024102
    },
    {
      "coords": {
        "x": 27,
        "y": 40
      },
      "type": "station",
      "name": "Charlottenburg",
      "id": 9024101
    },
    {
      "coords": {
        "x": 30,
        "y": 40
      },
      "type": "station",
      "name": "Savignyplatz",
      "id": 9024204
    },
    {
      "coords": {
        "x": 34,
        "y": 40
      },
      "type": "station",
      "name": "Zoologischer Garten",
      "id": 9023201
    },
    {
      "coords": {
        "x": 37,
        "y": 37
      },
      "type": "station",
      "name": "Tiergarten",
      "id": 9003155
    },
    {
      "coords": {
        "x": 40,
        "y": 34
      },
      "type": "station",
      "name": "Bellevue",
      "id": 9003252
    },
    {
      "coords": {
        "x": 42,
        "y": 32
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 44,
        "y": 32
      },
      "type": "station",
      "name": "Hauptbahnhof",
      "id": 9003201
    },
    {
      "coords": {
        "x": 51,
        "y": 32
      },
      "type": "station",
      "name": "Friedrichstraße",
      "id": 9024108
    },
    {
      "coords": {
        "x": 55,
        "y": 32
      },
      "type": "station",
      "name": "Hackescher Markt",
      "id": 9100002
    },
    {
      "coords": {
        "x": 60,
        "y": 32
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 62,
        "y": 34
      },
      "type": "station",
      "name": "Alexanderplatz",
      "id": 9100005
    },
    {
      "coords": {
        "x": 64,
        "y": 36
      },
      "type": "station",
      "name": "Jannowitzbrücke",
      "id": 9100004
    },
    {
      "coords": {
        "x": 66,
        "y": 38
      },
      "type": "station",
      "name": "Ostbahnhof",
      "id": 9120005
    },
    {
      "coords": {
        "x": 69,
        "y": 41
      },
      "type": "station",
      "name": "Warschauer Straße",
      "id": 9120014
    },
    {
      "coords": {
        "x": 76,
        "y": 41
      },
      "type": "station",
      "name": "Ostkreuz",
      "id": 9120003
    },
    {
      "coords": {
        "x": 79,
        "y": 41
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 80,
        "y": 40
      },
      "type": "station",
      "name": "Nöldnerplatz",
      "id": 9160003
    },
    {
      "coords": {
        "x": 82,
        "y": 38
      },
      "type": "station",
      "name": "Lichtenberg",
      "id": 9160522
    },
    {
      "coords": {
        "x": 84,
        "y": 36
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 85,
        "y": 36
      },
      "type": "station",
      "name": "Friedrichsfelde Ost",
      "id": 9171002
    },
    {
      "coords": {
        "x": 87,
        "y": 36
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 87,
        "y": 32
      },
      "type": "station",
      "name": "Springpfuhl",
      "id": 9171003
    },
    {
      "coords": {
        "x": 87,
        "y": 30
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 83,
        "y": 26
      },
      "type": "station",
      "name": "Gehrenseestraße",
      "id": 9150504
    },
    {
      "coords": {
        "x": 79,
        "y": 22
      },
      "type": "station",
      "name": "Hohenschönhausen",
      "id": 9152001
    },
    {
      "coords": {
        "x": 76,
        "y": 19
      },
      "type": "station",
      "name": "Wartenberg",
      "id": 9151001
    }
  ],
  "s8": [
    {
      "coords": {
        "x": 38,
        "y": 3
      },
      "type": "station",
      "name": "Birkenwerder",
      "id": 9200008
    },
    {
      "coords": {
        "x": 39,
        "y": 4
      },
      "type": "station",
      "name": "Hohen Neuendorf",
      "id": 9200009
    },
    {
      "coords": {
        "x": 45,
        "y": 4
      },
      "type": "station",
      "name": "Bergfelde",
      "id": 9200011
    },
    {
      "coords": {
        "x": 50,
        "y": 4
      },
      "type": "station",
      "name": "Schönfließ",
      "id": 9200012
    },
    {
      "coords": {
        "x": 57,
        "y": 4
      },
      "type": "station",
      "name": "Mühlenbeck-Mönchmühle",
      "id": 9200013
    },
    {
      "coords": {
        "x": 61,
        "y": 4
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 66,
        "y": 9
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 64,
        "y": 11
      },
      "type": "station",
      "name": "Blankenburg",
      "id": 9142001
    },
    {
      "coords": {
        "x": 62,
        "y": 13
      },
      "type": "station",
      "name": "Pankow-Heinersdorf",
      "id": 9130001
    },
    {
      "coords": {
        "x": 60,
        "y": 15
      },
      "type": "station",
      "name": "Pankow",
      "id": 9130002
    },
    {
      "coords": {
        "x": 55,
        "y": 20
      },
      "type": "station",
      "name": "Bornholmer Straße",
      "id": 9110011
    },
    {
      "coords": {
        "x": 53,
        "y": 22
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 55,
        "y": 24
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 60,
        "y": 24
      },
      "type": "station",
      "name": "Schönhauser Allee",
      "id": 9110001
    },
    {
      "coords": {
        "x": 68,
        "y": 24
      },
      "type": "station",
      "name": "Prenzlauer Allee",
      "id": 9110002
    },
    {
      "coords": {
        "x": 70,
        "y": 24
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 72,
        "y": 26
      },
      "type": "station",
      "name": "Greifswalder Straße",
      "id": 9110020
    },
    {
      "coords": {
        "x": 76,
        "y": 30
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 76,
        "y": 32
      },
      "type": "station",
      "name": "Landsberger Allee",
      "id": 9110004
    },
    {
      "coords": {
        "x": 76,
        "y": 35
      },
      "type": "station",
      "name": "Storkower Straße",
      "id": 9160014
    },
    {
      "coords": {
        "x": 76,
        "y": 38
      },
      "type": "station",
      "name": "Frankfurter Allee",
      "id": 9120001
    },
    {
      "coords": {
        "x": 76,
        "y": 41
      },
      "type": "station",
      "name": "Ostkreuz",
      "id": 9120003
    },
    {
      "coords": {
        "x": 76,
        "y": 47
      },
      "type": "station",
      "name": "Treptower Park",
      "id": 9190001
    },
    {
      "coords": {
        "x": 79,
        "y": 50
      },
      "type": "station",
      "name": "Plänterwald",
      "id": 9191002
    },
    {
      "coords": {
        "x": 82,
        "y": 53
      },
      "type": "station",
      "name": "Baumschulenweg",
      "id": 9191001
    },
    {
      "coords": {
        "x": 84,
        "y": 55
      },
      "type": "station",
      "name": "Schöneweide",
      "id": 9194006
    },
    {
      "coords": {
        "x": 86,
        "y": 57
      },
      "type": "station",
      "name": "Betriebsbahnhof Schöneweide",
      "id": 9193001
    },
    {
      "coords": {
        "x": 88,
        "y": 59
      },
      "type": "station",
      "name": "Adlershof",
      "id": 9193002
    },
    {
      "coords": {
        "x": 91,
        "y": 62
      },
      "type": "station",
      "name": "Grünau",
      "id": 9186001
    },
    {
      "coords": {
        "x": 93,
        "y": 64
      },
      "type": "station",
      "name": "Eichwalde",
      "id": 9260004
    },
    {
      "coords": {
        "x": 95,
        "y": 66
      },
      "type": "station",
      "name": "Zeuthen",
      "id": 9260003
    }
  ],
  "s85": [
    {
      "coords": {
        "x": 42,
        "y": 7
      },
      "type": "station",
      "name": "Waidmannslust",
      "id": 9094101
    },
    {
      "coords": {
        "x": 43,
        "y": 8
      },
      "type": "station",
      "name": "Wittenau",
      "id": 9096407
    },
    {
      "coords": {
        "x": 44,
        "y": 9
      },
      "type": "station",
      "name": "Wilhelmsruh",
      "id": 9084101
    },
    {
      "coords": {
        "x": 46,
        "y": 11
      },
      "type": "station",
      "name": "Schönholz",
      "id": 9085201
    },
    {
      "coords": {
        "x": 52,
        "y": 17
      },
      "type": "station",
      "name": "Wollankstraße",
      "id": 9130003
    },
    {
      "coords": {
        "x": 55,
        "y": 20
      },
      "type": "station",
      "name": "Bornholmer Straße",
      "id": 9110011
    },
    {
      "coords": {
        "x": 53,
        "y": 22
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 55,
        "y": 24
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 60,
        "y": 24
      },
      "type": "station",
      "name": "Schönhauser Allee",
      "id": 9110001
    },
    {
      "coords": {
        "x": 68,
        "y": 24
      },
      "type": "station",
      "name": "Prenzlauer Allee",
      "id": 9110002
    },
    {
      "coords": {
        "x": 70,
        "y": 24
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 72,
        "y": 26
      },
      "type": "station",
      "name": "Greifswalder Straße",
      "id": 9110020
    },
    {
      "coords": {
        "x": 76,
        "y": 30
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 76,
        "y": 32
      },
      "type": "station",
      "name": "Landsberger Allee",
      "id": 9110004
    },
    {
      "coords": {
        "x": 76,
        "y": 35
      },
      "type": "station",
      "name": "Storkower Straße",
      "id": 9160014
    },
    {
      "coords": {
        "x": 76,
        "y": 38
      },
      "type": "station",
      "name": "Frankfurter Allee",
      "id": 9120001
    },
    {
      "coords": {
        "x": 76,
        "y": 41
      },
      "type": "station",
      "name": "Ostkreuz",
      "id": 9120003
    },
    {
      "coords": {
        "x": 76,
        "y": 47
      },
      "type": "station",
      "name": "Treptower Park",
      "id": 9190001
    },
    {
      "coords": {
        "x": 79,
        "y": 50
      },
      "type": "station",
      "name": "Plänterwald",
      "id": 9191002
    },
    {
      "coords": {
        "x": 82,
        "y": 53
      },
      "type": "station",
      "name": "Baumschulenweg",
      "id": 9191001
    },
    {
      "coords": {
        "x": 84,
        "y": 55
      },
      "type": "station",
      "name": "Schöneweide",
      "id": 9194006
    },
    {
      "coords": {
        "x": 86,
        "y": 57
      },
      "type": "station",
      "name": "Betriebsbahnhof Schöneweide",
      "id": 9193001
    },
    {
      "coords": {
        "x": 88,
        "y": 59
      },
      "type": "station",
      "name": "Adlershof",
      "id": 9193002
    },
    {
      "coords": {
        "x": 91,
        "y": 62
      },
      "type": "station",
      "name": "Grünau",
      "id": 9186001
    }
  ],
  "s9": [
    {
      "coords": {
        "x": 60,
        "y": 15
      },
      "type": "station",
      "name": "Pankow",
      "id": 9130002
    },
    {
      "coords": {
        "x": 55,
        "y": 20
      },
      "type": "station",
      "name": "Bornholmer Straße",
      "id": 9110011
    },
    {
      "coords": {
        "x": 53,
        "y": 22
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 55,
        "y": 24
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 60,
        "y": 24
      },
      "type": "station",
      "name": "Schönhauser Allee",
      "id": 9110001
    },
    {
      "coords": {
        "x": 68,
        "y": 24
      },
      "type": "station",
      "name": "Prenzlauer Allee",
      "id": 9110002
    },
    {
      "coords": {
        "x": 70,
        "y": 24
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 72,
        "y": 26
      },
      "type": "station",
      "name": "Greifswalder Straße",
      "id": 9110020
    },
    {
      "coords": {
        "x": 76,
        "y": 30
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 76,
        "y": 32
      },
      "type": "station",
      "name": "Landsberger Allee",
      "id": 9110004
    },
    {
      "coords": {
        "x": 76,
        "y": 35
      },
      "type": "station",
      "name": "Storkower Straße",
      "id": 9160014
    },
    {
      "coords": {
        "x": 76,
        "y": 38
      },
      "type": "station",
      "name": "Frankfurter Allee",
      "id": 9120001
    },
    {
      "coords": {
        "x": 76,
        "y": 41
      },
      "type": "station",
      "name": "Ostkreuz",
      "id": 9120003
    },
    {
      "coords": {
        "x": 76,
        "y": 47
      },
      "type": "station",
      "name": "Treptower Park",
      "id": 9190001
    },
    {
      "coords": {
        "x": 79,
        "y": 50
      },
      "type": "station",
      "name": "Plänterwald",
      "id": 9191002
    },
    {
      "coords": {
        "x": 82,
        "y": 53
      },
      "type": "station",
      "name": "Baumschulenweg",
      "id": 9191001
    },
    {
      "coords": {
        "x": 84,
        "y": 55
      },
      "type": "station",
      "name": "Schöneweide",
      "id": 9194006
    },
    {
      "coords": {
        "x": 86,
        "y": 57
      },
      "type": "station",
      "name": "Betriebsbahnhof Schöneweide",
      "id": 9193001
    },
    {
      "coords": {
        "x": 88,
        "y": 59
      },
      "type": "station",
      "name": "Adlershof",
      "id": 9193002
    },
    {
      "coords": {
        "x": 88,
        "y": 64
      },
      "type": "station",
      "name": "Altglienicke",
      "id": 9195006
    },
    {
      "coords": {
        "x": 85,
        "y": 67
      },
      "type": "station",
      "name": "Grünbergallee",
      "id": 9196001
    },
    {
      "coords": {
        "x": 78,
        "y": 74
      },
      "type": "station",
      "name": "Flughafen Berlin-Schönefeld",
      "id": 9260005
    }
  ],
  "u1": [
    {
      "coords": {
        "x": 31,
        "y": 43
      },
      "type": "station",
      "name": "Uhlandstraße",
      "id": 9023105
    },
    {
      "coords": {
        "x": 33,
        "y": 43
      },
      "type": "station",
      "name": "Kurfürstendamm",
      "id": 9023203
    },
    {
      "coords": {
        "x": 38,
        "y": 43
      },
      "type": "station",
      "name": "Wittenbergplatz",
      "id": 9056101
    },
    {
      "coords": {
        "x": 41,
        "y": 43
      },
      "type": "station",
      "name": "Nollendorfplatz",
      "id": 9056102
    },
    {
      "coords": {
        "x": 43,
        "y": 43
      },
      "type": "station",
      "name": "Kurfürstenstraße",
      "id": 9068351
    },
    {
      "coords": {
        "x": 45,
        "y": 43
      },
      "type": "station",
      "name": "Gleisdreieck",
      "id": 9017103
    },
    {
      "coords": {
        "x": 50,
        "y": 43
      },
      "type": "station",
      "name": "Möckernbrücke",
      "id": 9017104
    },
    {
      "coords": {
        "x": 53,
        "y": 43
      },
      "type": "station",
      "name": "Hallesches Tor",
      "id": 9012103
    },
    {
      "coords": {
        "x": 58,
        "y": 43
      },
      "type": "station",
      "name": "Prinzenstraße",
      "id": 9013103
    },
    {
      "coords": {
        "x": 63,
        "y": 43
      },
      "type": "station",
      "name": "Kottbusser Tor",
      "id": 9013102
    },
    {
      "coords": {
        "x": 65,
        "y": 43
      },
      "type": "station",
      "name": "Görlitzer Bahnhof",
      "id": 9014101
    },
    {
      "coords": {
        "x": 67,
        "y": 43
      },
      "type": "station",
      "name": "Schlesisches Tor",
      "id": 9014102
    },
    {
      "coords": {
        "x": 69,
        "y": 41
      },
      "type": "station",
      "name": "Warschauer Straße",
      "id": 9120014
    }
  ],
  "u2": [
    {
      "coords": {
        "x": 11,
        "y": 31
      },
      "type": "station",
      "name": "Ruhleben",
      "id": 9025202
    },
    {
      "coords": {
        "x": 13,
        "y": 33
      },
      "type": "station",
      "name": "Olympia-Stadion",
      "id": 9025203
    },
    {
      "coords": {
        "x": 15,
        "y": 35
      },
      "type": "station",
      "name": "Neu-Westend",
      "id": 9026101
    },
    {
      "coords": {
        "x": 17,
        "y": 37
      },
      "type": "station",
      "name": "Theodor-Heuss-Platz",
      "id": 9026201
    },
    {
      "coords": {
        "x": 22,
        "y": 37
      },
      "type": "station",
      "name": "Kaiserdamm",
      "id": 9026202
    },
    {
      "coords": {
        "x": 25,
        "y": 37
      },
      "type": "station",
      "name": "Sophie-Charlotte-Platz",
      "id": 9022101
    },
    {
      "coords": {
        "x": 27,
        "y": 37
      },
      "type": "station",
      "name": "Bismarckstraße",
      "id": 9063104
    },
    {
      "coords": {
        "x": 29,
        "y": 37
      },
      "type": "station",
      "name": "Deutsche Oper",
      "id": 9022201
    },
    {
      "coords": {
        "x": 31,
        "y": 37
      },
      "type": "station",
      "name": "Ernst-Reuter-Platz",
      "id": 9023101
    },
    {
      "coords": {
        "x": 34,
        "y": 40
      },
      "type": "station",
      "name": "Zoologischer Garten",
      "id": 9023201
    },
    {
      "coords": {
        "x": 37,
        "y": 43
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 38,
        "y": 43
      },
      "type": "station",
      "name": "Wittenbergplatz",
      "id": 9056101
    },
    {
      "coords": {
        "x": 41,
        "y": 43
      },
      "type": "station",
      "name": "Nollendorfplatz",
      "id": 9056102
    },
    {
      "coords": {
        "x": 42,
        "y": 44
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 43,
        "y": 44
      },
      "type": "station",
      "name": "Bülowstraße",
      "id": 9056104
    },
    {
      "coords": {
        "x": 44,
        "y": 44
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 45,
        "y": 43
      },
      "type": "station",
      "name": "Gleisdreieck",
      "id": 9017103
    },
    {
      "coords": {
        "x": 46,
        "y": 42
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 46,
        "y": 40
      },
      "type": "station",
      "name": "Mendelssohn-Bartholdy-Park",
      "id": 9005252
    },
    {
      "coords": {
        "x": 46,
        "y": 39
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 48,
        "y": 39
      },
      "type": "station",
      "name": "Potsdamer Platz",
      "id": 9100020
    },
    {
      "coords": {
        "x": 50,
        "y": 39
      },
      "type": "station",
      "name": "Mohrenstraße",
      "id": 9100010
    },
    {
      "coords": {
        "x": 53,
        "y": 39
      },
      "type": "station",
      "name": "Stadtmitte",
      "id": 9100011
    },
    {
      "coords": {
        "x": 55,
        "y": 39
      },
      "type": "station",
      "name": "Hausvogteiplatz",
      "id": 9100012
    },
    {
      "coords": {
        "x": 58,
        "y": 39
      },
      "type": "station",
      "name": "Spittelmarkt",
      "id": 9100013
    },
    {
      "coords": {
        "x": 60,
        "y": 39
      },
      "type": "station",
      "name": "Märkisches Museum",
      "id": 9100014
    },
    {
      "coords": {
        "x": 62,
        "y": 37
      },
      "type": "station",
      "name": "Klosterstraße",
      "id": 9100015
    },
    {
      "coords": {
        "x": 62,
        "y": 34
      },
      "type": "station",
      "name": "Alexanderplatz",
      "id": 9100005
    },
    {
      "coords": {
        "x": 60,
        "y": 32
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 60,
        "y": 30
      },
      "type": "station",
      "name": "Rosa-Luxemburg-Platz",
      "id": 9100016
    },
    {
      "coords": {
        "x": 60,
        "y": 28
      },
      "type": "station",
      "name": "Senefelderplatz",
      "id": 9110005
    },
    {
      "coords": {
        "x": 60,
        "y": 26
      },
      "type": "station",
      "name": "Eberswalder Straße",
      "id": 9110006
    },
    {
      "coords": {
        "x": 60,
        "y": 24
      },
      "type": "station",
      "name": "Schönhauser Allee",
      "id": 9110001
    },
    {
      "coords": {
        "x": 60,
        "y": 19
      },
      "type": "station",
      "name": "Vinetastraße",
      "id": 9130011
    },
    {
      "coords": {
        "x": 60,
        "y": 15
      },
      "type": "station",
      "name": "Pankow",
      "id": 9130002
    }
  ],
  "u3": [
    {
      "coords": {
        "x": 17,
        "y": 63
      },
      "type": "station",
      "name": "Krumme Lanke",
      "id": 9050201
    },
    {
      "coords": {
        "x": 18,
        "y": 62
      },
      "type": "station",
      "name": "Onkel Toms Hütte",
      "id": 9050282
    },
    {
      "coords": {
        "x": 19,
        "y": 61
      },
      "type": "station",
      "name": "Oskar-Helene-Heim",
      "id": 9051371
    },
    {
      "coords": {
        "x": 21,
        "y": 59
      },
      "type": "station",
      "name": "Thielplatz",
      "id": 9051201
    },
    {
      "coords": {
        "x": 22,
        "y": 58
      },
      "type": "station",
      "name": "Dahlem-Dorf",
      "id": 9051303
    },
    {
      "coords": {
        "x": 23,
        "y": 57
      },
      "type": "station",
      "name": "Podbielskiallee",
      "id": 9051302
    },
    {
      "coords": {
        "x": 24,
        "y": 56
      },
      "type": "station",
      "name": "Breitenbachplatz",
      "id": 9051202
    },
    {
      "coords": {
        "x": 25,
        "y": 55
      },
      "type": "station",
      "name": "Rüdesheimer Platz",
      "id": 9045101
    },
    {
      "coords": {
        "x": 27,
        "y": 53
      },
      "type": "station",
      "name": "Heidelberger Platz",
      "id": 9045102
    },
    {
      "coords": {
        "x": 30,
        "y": 50
      },
      "type": "station",
      "name": "Fehrbelliner Platz",
      "id": 9041101
    },
    {
      "coords": {
        "x": 32,
        "y": 48
      },
      "type": "station",
      "name": "Hohenzollernplatz",
      "id": 9043101
    },
    {
      "coords": {
        "x": 33,
        "y": 47
      },
      "type": "station",
      "name": "Spichernstraße",
      "id": 9042101
    },
    {
      "coords": {
        "x": 35,
        "y": 45
      },
      "type": "station",
      "name": "Augsburger Straße",
      "id": 9074264
    },
    {
      "coords": {
        "x": 37,
        "y": 43
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 38,
        "y": 43
      },
      "type": "station",
      "name": "Wittenbergplatz",
      "id": 9056101
    },
    {
      "coords": {
        "x": 41,
        "y": 43
      },
      "type": "station",
      "name": "Nollendorfplatz",
      "id": 9056102
    }
  ],
  "u4": [
    {
      "coords": {
        "x": 39,
        "y": 53
      },
      "type": "station",
      "name": "Innsbrucker Platz",
      "id": 9054105
    },
    {
      "coords": {
        "x": 39,
        "y": 52
      },
      "type": "station",
      "name": "Rathaus Schöneberg",
      "id": 9054106
    },
    {
      "coords": {
        "x": 39,
        "y": 50
      },
      "type": "station",
      "name": "Bayerischer Platz",
      "id": 9055102
    },
    {
      "coords": {
        "x": 39,
        "y": 47
      },
      "type": "station",
      "name": "Viktoria-Luise-Platz",
      "id": 9055101
    },
    {
      "coords": {
        "x": 39,
        "y": 43
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 41,
        "y": 43
      },
      "type": "station",
      "name": "Nollendorfplatz",
      "id": 9056102
    }
  ],
  "u5": [
    {
      "coords": {
        "x": 62,
        "y": 34
      },
      "type": "station",
      "name": "Alexanderplatz",
      "id": 9100005
    },
    {
      "coords": {
        "x": 67,
        "y": 34
      },
      "type": "station",
      "name": "Schillingstraße",
      "id": 9100017
    },
    {
      "coords": {
        "x": 68,
        "y": 35
      },
      "type": "station",
      "name": "Strausberger Platz",
      "id": 9120006
    },
    {
      "coords": {
        "x": 69,
        "y": 36
      },
      "type": "station",
      "name": "Weberwiese",
      "id": 9120025
    },
    {
      "coords": {
        "x": 70,
        "y": 37
      },
      "type": "station",
      "name": "Frankfurter Tor",
      "id": 9120008
    },
    {
      "coords": {
        "x": 71,
        "y": 38
      },
      "type": "station",
      "name": "Samariterstraße",
      "id": 9120009
    },
    {
      "coords": {
        "x": 76,
        "y": 38
      },
      "type": "station",
      "name": "Frankfurter Allee",
      "id": 9120001
    },
    {
      "coords": {
        "x": 79,
        "y": 38
      },
      "type": "station",
      "name": "Magdalenenstraße",
      "id": 9160530
    },
    {
      "coords": {
        "x": 82,
        "y": 38
      },
      "type": "station",
      "name": "Lichtenberg",
      "id": 9160522
    },
    {
      "coords": {
        "x": 84,
        "y": 38
      },
      "type": "station",
      "name": "Friedrichsfelde",
      "id": 9161512
    },
    {
      "coords": {
        "x": 87,
        "y": 38
      },
      "type": "station",
      "name": "Tierpark",
      "id": 9161002
    },
    {
      "coords": {
        "x": 89,
        "y": 38
      },
      "type": "station",
      "name": "Biesdorf-Süd",
      "id": 9171005
    },
    {
      "coords": {
        "x": 91,
        "y": 38
      },
      "type": "station",
      "name": "Elsterwerdaer Platz",
      "id": 9171006
    },
    {
      "coords": {
        "x": 93,
        "y": 36
      },
      "type": "station",
      "name": "Wuhletal",
      "id": 9175001
    },
    {
      "coords": {
        "x": 95,
        "y": 34
      },
      "type": "station",
      "name": "Kaulsdorf-Nord",
      "id": 9175004
    },
    {
      "coords": {
        "x": 96,
        "y": 33
      },
      "type": "station",
      "name": "Neue Grottkauer Straße",
      "id": 9175005
    },
    {
      "coords": {
        "x": 97,
        "y": 32
      },
      "type": "station",
      "name": "Cottbusser Platz",
      "id": 9175006
    },
    {
      "coords": {
        "x": 98,
        "y": 31
      },
      "type": "station",
      "name": "Hellersdorf",
      "id": 9175007
    },
    {
      "coords": {
        "x": 99,
        "y": 30
      },
      "type": "station",
      "name": "Louis-Lewin-Straße",
      "id": 9175014
    },
    {
      "coords": {
        "x": 100,
        "y": 29
      },
      "type": "station",
      "name": "Hönow",
      "id": 9175010
    }
  ],
  "u55": [
    {
      "coords": {
        "x": 44,
        "y": 32
      },
      "type": "station",
      "name": "Hauptbahnhof",
      "id": 9003201
    },
    {
      "coords": {
        "x": 46,
        "y": 34
      },
      "type": "station",
      "name": "Bundestag",
      "id": 9004104
    },
    {
      "coords": {
        "x": 48,
        "y": 36
      },
      "type": "station",
      "name": "Brandenburger Tor",
      "id": 9100025
    }
  ],
  "u6": [
    {
      "coords": {
        "x": 30,
        "y": 10
      },
      "type": "station",
      "name": "Alt-Tegel",
      "id": 9089372
    },
    {
      "coords": {
        "x": 30,
        "y": 11
      },
      "type": "station",
      "name": "Borsigwerke",
      "id": 9088202
    },
    {
      "coords": {
        "x": 31,
        "y": 12
      },
      "type": "station",
      "name": "Holzhauser Straße",
      "id": 9097101
    },
    {
      "coords": {
        "x": 32,
        "y": 13
      },
      "type": "station",
      "name": "Otisstraße",
      "id": 9088203
    },
    {
      "coords": {
        "x": 33,
        "y": 14
      },
      "type": "station",
      "name": "Scharnweberstraße",
      "id": 9120540
    },
    {
      "coords": {
        "x": 34,
        "y": 15
      },
      "type": "station",
      "name": "Kurt-Schumacher-Platz",
      "id": 9086102
    },
    {
      "coords": {
        "x": 35,
        "y": 16
      },
      "type": "station",
      "name": "Afrikanische Straße",
      "id": 9011102
    },
    {
      "coords": {
        "x": 37,
        "y": 18
      },
      "type": "station",
      "name": "Rehberge",
      "id": 9011101
    },
    {
      "coords": {
        "x": 38,
        "y": 19
      },
      "type": "station",
      "name": "Seestraße",
      "id": 9009105
    },
    {
      "coords": {
        "x": 40,
        "y": 21
      },
      "type": "station",
      "name": "Leopoldplatz",
      "id": 9009102
    },
    {
      "coords": {
        "x": 43,
        "y": 24
      },
      "type": "station",
      "name": "Wedding",
      "id": 9009104
    },
    {
      "coords": {
        "x": 44,
        "y": 25
      },
      "type": "station",
      "name": "Reinickendorfer Straße",
      "id": 9008104
    },
    {
      "coords": {
        "x": 46,
        "y": 27
      },
      "type": "station",
      "name": "Schwartzkopffstraße",
      "id": 9100501
    },
    {
      "coords": {
        "x": 47,
        "y": 28
      },
      "type": "station",
      "name": "Naturkundemuseum",
      "id": 9100009
    },
    {
      "coords": {
        "x": 49,
        "y": 30
      },
      "type": "station",
      "name": "Oranienburger Tor",
      "id": 9100506
    },
    {
      "coords": {
        "x": 51,
        "y": 32
      },
      "type": "station",
      "name": "Friedrichstraße",
      "id": 9024108
    },
    {
      "coords": {
        "x": 53,
        "y": 34
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 53,
        "y": 37
      },
      "type": "station",
      "name": "Französische Straße",
      "id": 9100027
    },
    {
      "coords": {
        "x": 53,
        "y": 39
      },
      "type": "station",
      "name": "Stadtmitte",
      "id": 9100011
    },
    {
      "coords": {
        "x": 53,
        "y": 41
      },
      "type": "station",
      "name": "Kochstraße",
      "id": 9012153
    },
    {
      "coords": {
        "x": 53,
        "y": 43
      },
      "type": "station",
      "name": "Hallesches Tor",
      "id": 9012103
    },
    {
      "coords": {
        "x": 53,
        "y": 46
      },
      "type": "station",
      "name": "Mehringdamm",
      "id": 9017101
    },
    {
      "coords": {
        "x": 53,
        "y": 49
      },
      "type": "station",
      "name": "Platz der Luftbrücke",
      "id": 9017102
    },
    {
      "coords": {
        "x": 53,
        "y": 51
      },
      "type": "station",
      "name": "Paradestraße",
      "id": 9068101
    },
    {
      "coords": {
        "x": 53,
        "y": 53
      },
      "type": "station",
      "name": "Tempelhof",
      "id": 9068201
    },
    {
      "coords": {
        "x": 53,
        "y": 54
      },
      "type": "station",
      "name": "Alt-Tempelhof",
      "id": 9068202
    },
    {
      "coords": {
        "x": 53,
        "y": 55
      },
      "type": "station",
      "name": "Kaiserin-Augusta-Straße",
      "id": 9068302
    },
    {
      "coords": {
        "x": 53,
        "y": 56
      },
      "type": "station",
      "name": "Ullsteinstraße",
      "id": 9069258
    },
    {
      "coords": {
        "x": 53,
        "y": 57
      },
      "type": "station",
      "name": "Westphalweg",
      "id": 9070101
    },
    {
      "coords": {
        "x": 53,
        "y": 58
      },
      "type": "station",
      "name": "Alt-Mariendorf",
      "id": 9070701
    }
  ],
  "u7": [
    {
      "coords": {
        "x": 3,
        "y": 28
      },
      "type": "station",
      "name": "Rathaus Spandau",
      "id": 9029302
    },
    {
      "coords": {
        "x": 5,
        "y": 26
      },
      "type": "station",
      "name": "Altstadt Spandau",
      "id": 9029301
    },
    {
      "coords": {
        "x": 7,
        "y": 24
      },
      "type": "station",
      "name": "Zitadelle",
      "id": 9033101
    },
    {
      "coords": {
        "x": 11,
        "y": 24
      },
      "type": "station",
      "name": "Haselhorst",
      "id": 9034102
    },
    {
      "coords": {
        "x": 14,
        "y": 24
      },
      "type": "station",
      "name": "Paulsternstraße",
      "id": 9034103
    },
    {
      "coords": {
        "x": 18,
        "y": 24
      },
      "type": "station",
      "name": "Rohrdamm",
      "id": 9036101
    },
    {
      "coords": {
        "x": 21,
        "y": 24
      },
      "type": "station",
      "name": "Siemensdamm",
      "id": 9035101
    },
    {
      "coords": {
        "x": 23,
        "y": 24
      },
      "type": "station",
      "name": "Halemweg",
      "id": 9018102
    },
    {
      "coords": {
        "x": 25,
        "y": 24
      },
      "type": "station",
      "name": "Jakob-Kaiser-Platz",
      "id": 9018101
    },
    {
      "coords": {
        "x": 26,
        "y": 25
      },
      "type": "station",
      "name": "Jungfernheide",
      "id": 9020201
    },
    {
      "coords": {
        "x": 27,
        "y": 26
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 27,
        "y": 30
      },
      "type": "station",
      "name": "Mierendorffplatz",
      "id": 9019204
    },
    {
      "coords": {
        "x": 27,
        "y": 34
      },
      "type": "station",
      "name": "Richard-Wagner-Platz",
      "id": 9022202
    },
    {
      "coords": {
        "x": 27,
        "y": 37
      },
      "type": "station",
      "name": "Bismarckstraße",
      "id": 9063104
    },
    {
      "coords": {
        "x": 27,
        "y": 40
      },
      "type": "station",
      "name": "Wilmersdorfer Straße",
      "id": 9024200
    },
    {
      "coords": {
        "x": 27,
        "y": 44
      },
      "type": "station",
      "name": "Adenauerplatz",
      "id": 9023302
    },
    {
      "coords": {
        "x": 27,
        "y": 47
      },
      "type": "station",
      "name": "Konstanzer Straße",
      "id": 9041201
    },
    {
      "coords": {
        "x": 30,
        "y": 50
      },
      "type": "station",
      "name": "Fehrbelliner Platz",
      "id": 9041101
    },
    {
      "coords": {
        "x": 31,
        "y": 50
      },
      "type": "station",
      "name": "Blissestraße",
      "id": 9041102
    },
    {
      "coords": {
        "x": 33,
        "y": 50
      },
      "type": "station",
      "name": "Berliner Straße",
      "id": 9044201
    },
    {
      "coords": {
        "x": 39,
        "y": 50
      },
      "type": "station",
      "name": "Bayerischer Platz",
      "id": 9055102
    },
    {
      "coords": {
        "x": 41,
        "y": 50
      },
      "type": "station",
      "name": "Eisenacher Straße",
      "id": 9175536
    },
    {
      "coords": {
        "x": 43,
        "y": 50
      },
      "type": "station",
      "name": "Kleistpark",
      "id": 9054102
    },
    {
      "coords": {
        "x": 46,
        "y": 50
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 48,
        "y": 48
      },
      "type": "station",
      "name": "Yorckstraße",
      "id": 9017105
    },
    {
      "coords": {
        "x": 49,
        "y": 47
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 49,
        "y": 43
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 50,
        "y": 43
      },
      "type": "station",
      "name": "Möckernbrücke",
      "id": 9017104
    },
    {
      "coords": {
        "x": 51,
        "y": 43
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 53,
        "y": 45
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 53,
        "y": 46
      },
      "type": "station",
      "name": "Mehringdamm",
      "id": 9017101
    },
    {
      "coords": {
        "x": 53,
        "y": 47
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 56,
        "y": 47
      },
      "type": "station",
      "name": "Gneisenaustraße",
      "id": 9016101
    },
    {
      "coords": {
        "x": 60,
        "y": 47
      },
      "type": "station",
      "name": "Südstern",
      "id": 9016202
    },
    {
      "coords": {
        "x": 63,
        "y": 47
      },
      "type": "station",
      "name": "Hermannplatz",
      "id": 9078101
    },
    {
      "coords": {
        "x": 65,
        "y": 47
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 67,
        "y": 49
      },
      "type": "station",
      "name": "Rathaus Neukölln",
      "id": 9078102
    },
    {
      "coords": {
        "x": 68,
        "y": 50
      },
      "type": "station",
      "name": "Karl-Marx-Straße",
      "id": 9078103
    },
    {
      "coords": {
        "x": 68,
        "y": 53
      },
      "type": "station",
      "name": "Neukölln",
      "id": 9078102
    },
    {
      "coords": {
        "x": 68,
        "y": 55
      },
      "type": "station",
      "name": "Grenzallee",
      "id": 9080202
    },
    {
      "coords": {
        "x": 68,
        "y": 57
      },
      "type": "station",
      "name": "Blaschkoallee",
      "id": 9080201
    },
    {
      "coords": {
        "x": 68,
        "y": 59
      },
      "type": "station",
      "name": "Parchimer Allee",
      "id": 9080401
    },
    {
      "coords": {
        "x": 68,
        "y": 61
      },
      "type": "station",
      "name": "Britz-Süd",
      "id": 9080402
    },
    {
      "coords": {
        "x": 68,
        "y": 63
      },
      "type": "station",
      "name": "Johannisthaler Chaussee",
      "id": 9082202
    },
    {
      "coords": {
        "x": 70,
        "y": 65
      },
      "type": "station",
      "name": "Lipschitzallee",
      "id": 9082201
    },
    {
      "coords": {
        "x": 71,
        "y": 66
      },
      "type": "station",
      "name": "Wutzkyallee",
      "id": 9082257
    },
    {
      "coords": {
        "x": 73,
        "y": 68
      },
      "type": "station",
      "name": "Zwickauer Damm",
      "id": 9083101
    },
    {
      "coords": {
        "x": 74,
        "y": 69
      },
      "type": "station",
      "name": "Rudow",
      "id": 9083201
    }
  ],
  "u8": [
    {
      "coords": {
        "x": 43,
        "y": 8
      },
      "type": "station",
      "name": "Wittenau",
      "id": 9096407
    },
    {
      "coords": {
        "x": 39,
        "y": 8
      },
      "type": "station",
      "name": "Rathaus Reinickendorf",
      "id": 9096710
    },
    {
      "coords": {
        "x": 39,
        "y": 11
      },
      "type": "station",
      "name": "Karl-Bonhoeffer-Nervenklinik",
      "id": 9096458
    },
    {
      "coords": {
        "x": 40,
        "y": 12
      },
      "type": "station",
      "name": "Lindauer Allee",
      "id": 9086160
    },
    {
      "coords": {
        "x": 41,
        "y": 13
      },
      "type": "station",
      "name": "Paracelsus-Bad",
      "id": 9085104
    },
    {
      "coords": {
        "x": 42,
        "y": 14
      },
      "type": "station",
      "name": "Residenzstraße",
      "id": 9006103
    },
    {
      "coords": {
        "x": 43,
        "y": 15
      },
      "type": "station",
      "name": "Franz-Neumann-Platz",
      "id": 9085202
    },
    {
      "coords": {
        "x": 46,
        "y": 18
      },
      "type": "station",
      "name": "Osloer Straße",
      "id": 9009202
    },
    {
      "coords": {
        "x": 48,
        "y": 20
      },
      "type": "station",
      "name": "Pankstraße",
      "id": 9009203
    },
    {
      "coords": {
        "x": 52,
        "y": 24
      },
      "type": "station",
      "name": "Gesundbrunnen",
      "id": 9007102
    },
    {
      "coords": {
        "x": 53,
        "y": 25
      },
      "type": "station",
      "name": "Voltastraße",
      "id": 9007103
    },
    {
      "coords": {
        "x": 55,
        "y": 27
      },
      "type": "station",
      "name": "Bernauer Straße",
      "id": 9007110
    },
    {
      "coords": {
        "x": 56,
        "y": 28
      },
      "type": "station",
      "name": "Rosenthaler Platz",
      "id": 9100023
    },
    {
      "coords": {
        "x": 58,
        "y": 30
      },
      "type": "station",
      "name": "Weinmeisterstraße",
      "id": 9100080
    },
    {
      "coords": {
        "x": 62,
        "y": 34
      },
      "type": "station",
      "name": "Alexanderplatz",
      "id": 9100005
    },
    {
      "coords": {
        "x": 64,
        "y": 36
      },
      "type": "station",
      "name": "Jannowitzbrücke",
      "id": 9100004
    },
    {
      "coords": {
        "x": 63,
        "y": 37
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 63,
        "y": 39
      },
      "type": "station",
      "name": "Heinrich-Heine-Straße",
      "id": 9100008
    },
    {
      "coords": {
        "x": 63,
        "y": 41
      },
      "type": "station",
      "name": "Moritzplatz",
      "id": 9013101
    },
    {
      "coords": {
        "x": 63,
        "y": 43
      },
      "type": "station",
      "name": "Kottbusser Tor",
      "id": 9013102
    },
    {
      "coords": {
        "x": 63,
        "y": 45
      },
      "type": "station",
      "name": "Schönleinstraße",
      "id": 9016201
    },
    {
      "coords": {
        "x": 63,
        "y": 47
      },
      "type": "station",
      "name": "Hermannplatz",
      "id": 9078101
    },
    {
      "coords": {
        "x": 63,
        "y": 49
      },
      "type": "station",
      "name": "Boddinstraße",
      "id": 9079202
    },
    {
      "coords": {
        "x": 63,
        "y": 51
      },
      "type": "station",
      "name": "Leinestraße",
      "id": 9079201
    },
    {
      "coords": {
        "x": 63,
        "y": 53
      },
      "type": "station",
      "name": "Hermannstraße",
      "id": 9131527
    }
  ],
  "u9": [
    {
      "coords": {
        "x": 46,
        "y": 18
      },
      "type": "station",
      "name": "Osloer Straße",
      "id": 9009202
    },
    {
      "coords": {
        "x": 43,
        "y": 18
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 42,
        "y": 19
      },
      "type": "station",
      "name": "Nauener Platz",
      "id": 9009201
    },
    {
      "coords": {
        "x": 40,
        "y": 21
      },
      "type": "station",
      "name": "Leopoldplatz",
      "id": 9009102
    },
    {
      "coords": {
        "x": 39,
        "y": 22
      },
      "type": "station",
      "name": "Amrumer Straße",
      "id": 9009105
    },
    {
      "coords": {
        "x": 38,
        "y": 23
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 38,
        "y": 24
      },
      "type": "station",
      "name": "Westhafen",
      "id": 9001201
    },
    {
      "coords": {
        "x": 38,
        "y": 27
      },
      "type": "station",
      "name": "Birkenstraße",
      "id": 9002254
    },
    {
      "coords": {
        "x": 38,
        "y": 30
      },
      "type": "station",
      "name": "Turmstraße",
      "id": 9003174
    },
    {
      "coords": {
        "x": 38,
        "y": 36
      },
      "type": "station",
      "name": "Hansaplatz",
      "id": 9003101
    },
    {
      "coords": {
        "x": 34,
        "y": 40
      },
      "type": "station",
      "name": "Zoologischer Garten",
      "id": 9023201
    },
    {
      "coords": {
        "x": 33,
        "y": 41
      },
      "type": "wp"
    },
    {
      "coords": {
        "x": 33,
        "y": 43
      },
      "type": "station",
      "name": "Kurfürstendamm",
      "id": 9023203
    },
    {
      "coords": {
        "x": 33,
        "y": 47
      },
      "type": "station",
      "name": "Spichernstraße",
      "id": 9042101
    },
    {
      "coords": {
        "x": 33,
        "y": 48
      },
      "type": "station",
      "name": "Güntzelstraße",
      "id": 9043103
    },
    {
      "coords": {
        "x": 33,
        "y": 50
      },
      "type": "station",
      "name": "Berliner Straße",
      "id": 9044201
    },
    {
      "coords": {
        "x": 33,
        "y": 53
      },
      "type": "station",
      "name": "Bundesplatz",
      "id": 9044202
    },
    {
      "coords": {
        "x": 33,
        "y": 56
      },
      "type": "station",
      "name": "Friedrich-Wilhelm-Platz",
      "id": 9061102
    },
    {
      "coords": {
        "x": 33,
        "y": 58
      },
      "type": "station",
      "name": "Walther-Schreiber-Platz",
      "id": 9061101
    },
    {
      "coords": {
        "x": 33,
        "y": 60
      },
      "type": "station",
      "name": "Schloßstraße",
      "id": 9062203
    },
    {
      "coords": {
        "x": 33,
        "y": 63
      },
      "type": "station",
      "name": "Rathaus Steglitz",
      "id": 9062782
    }
  ]
}
},{}],3:[function(require,module,exports){
'use strict';

var raf = require('raf');

var request = function (cb) {
	var loop = function () {
		cb();
		requestAnimationFrame(loop);
	};
	setTimeout(loop, 0);
	return loop;
};

module.exports = request;
},{"raf":32}],4:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}

},{}],5:[function(require,module,exports){
var document = require('global/document')
var hyperx = require('hyperx')
var onload = require('on-load')

var SVGNS = 'http://www.w3.org/2000/svg'
var XLINKNS = 'http://www.w3.org/1999/xlink'

var BOOL_PROPS = {
  autofocus: 1,
  checked: 1,
  defaultchecked: 1,
  disabled: 1,
  formnovalidate: 1,
  indeterminate: 1,
  readonly: 1,
  required: 1,
  selected: 1,
  willvalidate: 1
}
var SVG_TAGS = [
  'svg',
  'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor',
  'animateMotion', 'animateTransform', 'circle', 'clipPath', 'color-profile',
  'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix',
  'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting',
  'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB',
  'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode',
  'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting',
  'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'font', 'font-face',
  'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri',
  'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image', 'line',
  'linearGradient', 'marker', 'mask', 'metadata', 'missing-glyph', 'mpath',
  'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect',
  'set', 'stop', 'switch', 'symbol', 'text', 'textPath', 'title', 'tref',
  'tspan', 'use', 'view', 'vkern'
]

function belCreateElement (tag, props, children) {
  var el

  // If an svg tag, it needs a namespace
  if (SVG_TAGS.indexOf(tag) !== -1) {
    props.namespace = SVGNS
  }

  // If we are using a namespace
  var ns = false
  if (props.namespace) {
    ns = props.namespace
    delete props.namespace
  }

  // Create the element
  if (ns) {
    el = document.createElementNS(ns, tag)
  } else {
    el = document.createElement(tag)
  }

  // If adding onload events
  if (props.onload || props.onunload) {
    var load = props.onload || function () {}
    var unload = props.onunload || function () {}
    onload(el, function belOnload () {
      load(el)
    }, function belOnunload () {
      unload(el)
    },
    // We have to use non-standard `caller` to find who invokes `belCreateElement`
    belCreateElement.caller.caller.caller)
    delete props.onload
    delete props.onunload
  }

  // Create the properties
  for (var p in props) {
    if (props.hasOwnProperty(p)) {
      var key = p.toLowerCase()
      var val = props[p]
      // Normalize className
      if (key === 'classname') {
        key = 'class'
        p = 'class'
      }
      // The for attribute gets transformed to htmlFor, but we just set as for
      if (p === 'htmlFor') {
        p = 'for'
      }
      // If a property is boolean, set itself to the key
      if (BOOL_PROPS[key]) {
        if (val === 'true') val = key
        else if (val === 'false') continue
      }
      // If a property prefers being set directly vs setAttribute
      if (key.slice(0, 2) === 'on') {
        el[p] = val
      } else {
        if (ns) {
          if (p === 'xlink:href') {
            el.setAttributeNS(XLINKNS, p, val)
          } else {
            el.setAttributeNS(null, p, val)
          }
        } else {
          el.setAttribute(p, val)
        }
      }
    }
  }

  function appendChild (childs) {
    if (!Array.isArray(childs)) return
    for (var i = 0; i < childs.length; i++) {
      var node = childs[i]
      if (Array.isArray(node)) {
        appendChild(node)
        continue
      }

      if (typeof node === 'number' ||
        typeof node === 'boolean' ||
        node instanceof Date ||
        node instanceof RegExp) {
        node = node.toString()
      }

      if (typeof node === 'string') {
        if (el.lastChild && el.lastChild.nodeName === '#text') {
          el.lastChild.nodeValue += node
          continue
        }
        node = document.createTextNode(node)
      }

      if (node && node.nodeType) {
        el.appendChild(node)
      }
    }
  }
  appendChild(children)

  return el
}

module.exports = hyperx(belCreateElement)
module.exports.createElement = belCreateElement

},{"global/document":12,"hyperx":15,"on-load":25}],6:[function(require,module,exports){

},{}],7:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],8:[function(require,module,exports){
(function (global){
'use strict';

var buffer = require('buffer');
var Buffer = buffer.Buffer;
var SlowBuffer = buffer.SlowBuffer;
var MAX_LEN = buffer.kMaxLength || 2147483647;
exports.alloc = function alloc(size, fill, encoding) {
  if (typeof Buffer.alloc === 'function') {
    return Buffer.alloc(size, fill, encoding);
  }
  if (typeof encoding === 'number') {
    throw new TypeError('encoding must not be number');
  }
  if (typeof size !== 'number') {
    throw new TypeError('size must be a number');
  }
  if (size > MAX_LEN) {
    throw new RangeError('size is too large');
  }
  var enc = encoding;
  var _fill = fill;
  if (_fill === undefined) {
    enc = undefined;
    _fill = 0;
  }
  var buf = new Buffer(size);
  if (typeof _fill === 'string') {
    var fillBuf = new Buffer(_fill, enc);
    var flen = fillBuf.length;
    var i = -1;
    while (++i < size) {
      buf[i] = fillBuf[i % flen];
    }
  } else {
    buf.fill(_fill);
  }
  return buf;
}
exports.allocUnsafe = function allocUnsafe(size) {
  if (typeof Buffer.allocUnsafe === 'function') {
    return Buffer.allocUnsafe(size);
  }
  if (typeof size !== 'number') {
    throw new TypeError('size must be a number');
  }
  if (size > MAX_LEN) {
    throw new RangeError('size is too large');
  }
  return new Buffer(size);
}
exports.from = function from(value, encodingOrOffset, length) {
  if (typeof Buffer.from === 'function' && (!global.Uint8Array || Uint8Array.from !== Buffer.from)) {
    return Buffer.from(value, encodingOrOffset, length);
  }
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }
  if (typeof value === 'string') {
    return new Buffer(value, encodingOrOffset);
  }
  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    var offset = encodingOrOffset;
    if (arguments.length === 1) {
      return new Buffer(value);
    }
    if (typeof offset === 'undefined') {
      offset = 0;
    }
    var len = length;
    if (typeof len === 'undefined') {
      len = value.byteLength - offset;
    }
    if (offset >= value.byteLength) {
      throw new RangeError('\'offset\' is out of bounds');
    }
    if (len > value.byteLength - offset) {
      throw new RangeError('\'length\' is out of bounds');
    }
    return new Buffer(value.slice(offset, offset + len));
  }
  if (Buffer.isBuffer(value)) {
    var out = new Buffer(value.length);
    value.copy(out, 0, 0, value.length);
    return out;
  }
  if (value) {
    if (Array.isArray(value) || (typeof ArrayBuffer !== 'undefined' && value.buffer instanceof ArrayBuffer) || 'length' in value) {
      return new Buffer(value);
    }
    if (value.type === 'Buffer' && Array.isArray(value.data)) {
      return new Buffer(value.data);
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ' + 'ArrayBuffer, Array, or array-like object.');
}
exports.allocUnsafeSlow = function allocUnsafeSlow(size) {
  if (typeof Buffer.allocUnsafeSlow === 'function') {
    return Buffer.allocUnsafeSlow(size);
  }
  if (typeof size !== 'number') {
    throw new TypeError('size must be a number');
  }
  if (size >= MAX_LEN) {
    throw new RangeError('size is too large');
  }
  return new SlowBuffer(size);
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"buffer":9}],9:[function(require,module,exports){
(function (global){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('isarray')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"base64-js":4,"ieee754":16,"isarray":19}],10:[function(require,module,exports){
(function (Buffer){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

}).call(this,{"isBuffer":require("../../is-buffer/index.js")})
},{"../../is-buffer/index.js":18}],11:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],12:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

if (typeof document !== 'undefined') {
    module.exports = document;
} else {
    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }

    module.exports = doccy;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"min-document":6}],13:[function(require,module,exports){
(function (global){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],14:[function(require,module,exports){
module.exports = attributeToProperty

var transform = {
  'class': 'className',
  'for': 'htmlFor',
  'http-equiv': 'httpEquiv'
}

function attributeToProperty (h) {
  return function (tagName, attrs, children) {
    for (var attr in attrs) {
      if (attr in transform) {
        attrs[transform[attr]] = attrs[attr]
        delete attrs[attr]
      }
    }
    return h(tagName, attrs, children)
  }
}

},{}],15:[function(require,module,exports){
var attrToProp = require('hyperscript-attribute-to-property')

var VAR = 0, TEXT = 1, OPEN = 2, CLOSE = 3, ATTR = 4
var ATTR_KEY = 5, ATTR_KEY_W = 6
var ATTR_VALUE_W = 7, ATTR_VALUE = 8
var ATTR_VALUE_SQ = 9, ATTR_VALUE_DQ = 10
var ATTR_EQ = 11, ATTR_BREAK = 12

module.exports = function (h, opts) {
  h = attrToProp(h)
  if (!opts) opts = {}
  var concat = opts.concat || function (a, b) {
    return String(a) + String(b)
  }

  return function (strings) {
    var state = TEXT, reg = ''
    var arglen = arguments.length
    var parts = []

    for (var i = 0; i < strings.length; i++) {
      if (i < arglen - 1) {
        var arg = arguments[i+1]
        var p = parse(strings[i])
        var xstate = state
        if (xstate === ATTR_VALUE_DQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_SQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_W) xstate = ATTR_VALUE
        if (xstate === ATTR) xstate = ATTR_KEY
        p.push([ VAR, xstate, arg ])
        parts.push.apply(parts, p)
      } else parts.push.apply(parts, parse(strings[i]))
    }

    var tree = [null,{},[]]
    var stack = [[tree,-1]]
    for (var i = 0; i < parts.length; i++) {
      var cur = stack[stack.length-1][0]
      var p = parts[i], s = p[0]
      if (s === OPEN && /^\//.test(p[1])) {
        var ix = stack[stack.length-1][1]
        if (stack.length > 1) {
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === OPEN) {
        var c = [p[1],{},[]]
        cur[2].push(c)
        stack.push([c,cur[2].length-1])
      } else if (s === ATTR_KEY || (s === VAR && p[1] === ATTR_KEY)) {
        var key = ''
        var copyKey
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_KEY) {
            key = concat(key, parts[i][1])
          } else if (parts[i][0] === VAR && parts[i][1] === ATTR_KEY) {
            if (typeof parts[i][2] === 'object' && !key) {
              for (copyKey in parts[i][2]) {
                if (parts[i][2].hasOwnProperty(copyKey) && !cur[1][copyKey]) {
                  cur[1][copyKey] = parts[i][2][copyKey]
                }
              }
            } else {
              key = concat(key, parts[i][2])
            }
          } else break
        }
        if (parts[i][0] === ATTR_EQ) i++
        var j = i
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_VALUE || parts[i][0] === ATTR_KEY) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][1])
            else cur[1][key] = concat(cur[1][key], parts[i][1])
          } else if (parts[i][0] === VAR
          && (parts[i][1] === ATTR_VALUE || parts[i][1] === ATTR_KEY)) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][2])
            else cur[1][key] = concat(cur[1][key], parts[i][2])
          } else {
            if (key.length && !cur[1][key] && i === j
            && (parts[i][0] === CLOSE || parts[i][0] === ATTR_BREAK)) {
              // https://html.spec.whatwg.org/multipage/infrastructure.html#boolean-attributes
              // empty string is falsy, not well behaved value in browser
              cur[1][key] = key.toLowerCase()
            }
            break
          }
        }
      } else if (s === ATTR_KEY) {
        cur[1][p[1]] = true
      } else if (s === VAR && p[1] === ATTR_KEY) {
        cur[1][p[2]] = true
      } else if (s === CLOSE) {
        if (selfClosing(cur[0]) && stack.length) {
          var ix = stack[stack.length-1][1]
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === VAR && p[1] === TEXT) {
        if (p[2] === undefined || p[2] === null) p[2] = ''
        else if (!p[2]) p[2] = concat('', p[2])
        if (Array.isArray(p[2][0])) {
          cur[2].push.apply(cur[2], p[2])
        } else {
          cur[2].push(p[2])
        }
      } else if (s === TEXT) {
        cur[2].push(p[1])
      } else if (s === ATTR_EQ || s === ATTR_BREAK) {
        // no-op
      } else {
        throw new Error('unhandled: ' + s)
      }
    }

    if (tree[2].length > 1 && /^\s*$/.test(tree[2][0])) {
      tree[2].shift()
    }

    if (tree[2].length > 2
    || (tree[2].length === 2 && /\S/.test(tree[2][1]))) {
      throw new Error(
        'multiple root elements must be wrapped in an enclosing tag'
      )
    }
    if (Array.isArray(tree[2][0]) && typeof tree[2][0][0] === 'string'
    && Array.isArray(tree[2][0][2])) {
      tree[2][0] = h(tree[2][0][0], tree[2][0][1], tree[2][0][2])
    }
    return tree[2][0]

    function parse (str) {
      var res = []
      if (state === ATTR_VALUE_W) state = ATTR
      for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i)
        if (state === TEXT && c === '<') {
          if (reg.length) res.push([TEXT, reg])
          reg = ''
          state = OPEN
        } else if (c === '>' && !quot(state)) {
          if (state === OPEN) {
            res.push([OPEN,reg])
          } else if (state === ATTR_KEY) {
            res.push([ATTR_KEY,reg])
          } else if (state === ATTR_VALUE && reg.length) {
            res.push([ATTR_VALUE,reg])
          }
          res.push([CLOSE])
          reg = ''
          state = TEXT
        } else if (state === TEXT) {
          reg += c
        } else if (state === OPEN && /\s/.test(c)) {
          res.push([OPEN, reg])
          reg = ''
          state = ATTR
        } else if (state === OPEN) {
          reg += c
        } else if (state === ATTR && /[\w-]/.test(c)) {
          state = ATTR_KEY
          reg = c
        } else if (state === ATTR && /\s/.test(c)) {
          if (reg.length) res.push([ATTR_KEY,reg])
          res.push([ATTR_BREAK])
        } else if (state === ATTR_KEY && /\s/.test(c)) {
          res.push([ATTR_KEY,reg])
          reg = ''
          state = ATTR_KEY_W
        } else if (state === ATTR_KEY && c === '=') {
          res.push([ATTR_KEY,reg],[ATTR_EQ])
          reg = ''
          state = ATTR_VALUE_W
        } else if (state === ATTR_KEY) {
          reg += c
        } else if ((state === ATTR_KEY_W || state === ATTR) && c === '=') {
          res.push([ATTR_EQ])
          state = ATTR_VALUE_W
        } else if ((state === ATTR_KEY_W || state === ATTR) && !/\s/.test(c)) {
          res.push([ATTR_BREAK])
          if (/[\w-]/.test(c)) {
            reg += c
            state = ATTR_KEY
          } else state = ATTR
        } else if (state === ATTR_VALUE_W && c === '"') {
          state = ATTR_VALUE_DQ
        } else if (state === ATTR_VALUE_W && c === "'") {
          state = ATTR_VALUE_SQ
        } else if (state === ATTR_VALUE_DQ && c === '"') {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_SQ && c === "'") {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_W && !/\s/.test(c)) {
          state = ATTR_VALUE
          i--
        } else if (state === ATTR_VALUE && /\s/.test(c)) {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE || state === ATTR_VALUE_SQ
        || state === ATTR_VALUE_DQ) {
          reg += c
        }
      }
      if (state === TEXT && reg.length) {
        res.push([TEXT,reg])
        reg = ''
      } else if (state === ATTR_VALUE && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_DQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_SQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_KEY) {
        res.push([ATTR_KEY,reg])
        reg = ''
      }
      return res
    }
  }

  function strfn (x) {
    if (typeof x === 'function') return x
    else if (typeof x === 'string') return x
    else if (x && typeof x === 'object') return x
    else return concat('', x)
  }
}

function quot (state) {
  return state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ
}

var hasOwn = Object.prototype.hasOwnProperty
function has (obj, key) { return hasOwn.call(obj, key) }

var closeRE = RegExp('^(' + [
  'area', 'base', 'basefont', 'bgsound', 'br', 'col', 'command', 'embed',
  'frame', 'hr', 'img', 'input', 'isindex', 'keygen', 'link', 'meta', 'param',
  'source', 'track', 'wbr',
  // SVG TAGS
  'animate', 'animateTransform', 'circle', 'cursor', 'desc', 'ellipse',
  'feBlend', 'feColorMatrix', 'feComposite',
  'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap',
  'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR',
  'feGaussianBlur', 'feImage', 'feMergeNode', 'feMorphology',
  'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile',
  'feTurbulence', 'font-face-format', 'font-face-name', 'font-face-uri',
  'glyph', 'glyphRef', 'hkern', 'image', 'line', 'missing-glyph', 'mpath',
  'path', 'polygon', 'polyline', 'rect', 'set', 'stop', 'tref', 'use', 'view',
  'vkern'
].join('|') + ')(?:[\.#][a-zA-Z0-9\u007F-\uFFFF_:-]+)*$')
function selfClosing (tag) { return closeRE.test(tag) }

},{"hyperscript-attribute-to-property":14}],16:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],17:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],18:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],19:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],20:[function(require,module,exports){
// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
require('whatwg-fetch');
module.exports = self.fetch.bind(self);

},{"whatwg-fetch":53}],21:[function(require,module,exports){
exports = module.exports = stringify
exports.getSerialize = serializer

function stringify(obj, replacer, spaces, cycleReplacer) {
  return JSON.stringify(obj, serializer(replacer, cycleReplacer), spaces)
}

function serializer(replacer, cycleReplacer) {
  var stack = [], keys = []

  if (cycleReplacer == null) cycleReplacer = function(key, value) {
    if (stack[0] === value) return "[Circular ~]"
    return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]"
  }

  return function(key, value) {
    if (stack.length > 0) {
      var thisPos = stack.indexOf(this)
      ~thisPos ? stack.splice(thisPos + 1) : stack.push(this)
      ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key)
      if (~stack.indexOf(value)) value = cycleReplacer.call(this, key, value)
    }
    else stack.push(value)

    return replacer == null ? value : replacer.call(this, key, value)
  }
}

},{}],22:[function(require,module,exports){
'use strict';
// Create a range object for efficently rendering strings to elements.
var range;

var doc = typeof document !== 'undefined' && document;

var testEl = doc ?
    doc.body || doc.createElement('div') :
    {};

var NS_XHTML = 'http://www.w3.org/1999/xhtml';

var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;

// Fixes <https://github.com/patrick-steele-idem/morphdom/issues/32>
// (IE7+ support) <=IE7 does not support el.hasAttribute(name)
var hasAttributeNS;

if (testEl.hasAttributeNS) {
    hasAttributeNS = function(el, namespaceURI, name) {
        return el.hasAttributeNS(namespaceURI, name);
    };
} else if (testEl.hasAttribute) {
    hasAttributeNS = function(el, namespaceURI, name) {
        return el.hasAttribute(name);
    };
} else {
    hasAttributeNS = function(el, namespaceURI, name) {
        return !!el.getAttributeNode(name);
    };
}

function toElement(str) {
    if (!range && doc.createRange) {
        range = doc.createRange();
        range.selectNode(doc.body);
    }

    var fragment;
    if (range && range.createContextualFragment) {
        fragment = range.createContextualFragment(str);
    } else {
        fragment = doc.createElement('body');
        fragment.innerHTML = str;
    }
    return fragment.childNodes[0];
}

function syncBooleanAttrProp(fromEl, toEl, name) {
    if (fromEl[name] !== toEl[name]) {
        fromEl[name] = toEl[name];
        if (fromEl[name]) {
            fromEl.setAttribute(name, '');
        } else {
            fromEl.removeAttribute(name, '');
        }
    }
}

var specialElHandlers = {
    /**
     * Needed for IE. Apparently IE doesn't think that "selected" is an
     * attribute when reading over the attributes using selectEl.attributes
     */
    OPTION: function(fromEl, toEl) {
        syncBooleanAttrProp(fromEl, toEl, 'selected');
    },
    /**
     * The "value" attribute is special for the <input> element since it sets
     * the initial value. Changing the "value" attribute without changing the
     * "value" property will have no effect since it is only used to the set the
     * initial value.  Similar for the "checked" attribute, and "disabled".
     */
    INPUT: function(fromEl, toEl) {
        syncBooleanAttrProp(fromEl, toEl, 'checked');
        syncBooleanAttrProp(fromEl, toEl, 'disabled');

        if (fromEl.value !== toEl.value) {
            fromEl.value = toEl.value;
        }

        if (!hasAttributeNS(toEl, null, 'value')) {
            fromEl.removeAttribute('value');
        }
    },

    TEXTAREA: function(fromEl, toEl) {
        var newValue = toEl.value;
        if (fromEl.value !== newValue) {
            fromEl.value = newValue;
        }

        if (fromEl.firstChild) {
            // Needed for IE. Apparently IE sets the placeholder as the
            // node value and vise versa. This ignores an empty update.
            if (newValue === '' && fromEl.firstChild.nodeValue === fromEl.placeholder) {
                return;
            }

            fromEl.firstChild.nodeValue = newValue;
        }
    }
};

function noop() {}

/**
 * Returns true if two node's names are the same.
 *
 * NOTE: We don't bother checking `namespaceURI` because you will never find two HTML elements with the same
 *       nodeName and different namespace URIs.
 *
 * @param {Element} a
 * @param {Element} b The target element
 * @return {boolean}
 */
function compareNodeNames(fromEl, toEl) {
    var fromNodeName = fromEl.nodeName;
    var toNodeName = toEl.nodeName;

    if (fromNodeName === toNodeName) {
        return true;
    }

    if (toEl.actualize &&
        fromNodeName.charCodeAt(0) < 91 && /* from tag name is upper case */
        toNodeName.charCodeAt(0) > 90 /* target tag name is lower case */) {
        // If the target element is a virtual DOM node then we may need to normalize the tag name
        // before comparing. Normal HTML elements that are in the "http://www.w3.org/1999/xhtml"
        // are converted to upper case
        return fromNodeName === toNodeName.toUpperCase();
    } else {
        return false;
    }
}

/**
 * Create an element, optionally with a known namespace URI.
 *
 * @param {string} name the element name, e.g. 'div' or 'svg'
 * @param {string} [namespaceURI] the element's namespace URI, i.e. the value of
 * its `xmlns` attribute or its inferred namespace.
 *
 * @return {Element}
 */
function createElementNS(name, namespaceURI) {
    return !namespaceURI || namespaceURI === NS_XHTML ?
        doc.createElement(name) :
        doc.createElementNS(namespaceURI, name);
}

/**
 * Loop over all of the attributes on the target node and make sure the original
 * DOM node has the same attributes. If an attribute found on the original node
 * is not on the new node then remove it from the original node.
 *
 * @param  {Element} fromNode
 * @param  {Element} toNode
 */
function morphAttrs(fromNode, toNode) {
    if (toNode.assignAttributes) {
        toNode.assignAttributes(fromNode);
    } else {
        var attrs = toNode.attributes;
        var i;
        var attr;
        var attrName;
        var attrNamespaceURI;
        var attrValue;
        var fromValue;

        for (i = attrs.length - 1; i >= 0; --i) {
            attr = attrs[i];
            attrName = attr.name;
            attrNamespaceURI = attr.namespaceURI;
            attrValue = attr.value;

            if (attrNamespaceURI) {
                attrName = attr.localName || attrName;
                fromValue = fromNode.getAttributeNS(attrNamespaceURI, attrName);

                if (fromValue !== attrValue) {
                    fromNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
                }
            } else {
                fromValue = fromNode.getAttribute(attrName);

                if (fromValue !== attrValue) {
                    fromNode.setAttribute(attrName, attrValue);
                }
            }
        }

        // Remove any extra attributes found on the original DOM element that
        // weren't found on the target element.
        attrs = fromNode.attributes;

        for (i = attrs.length - 1; i >= 0; --i) {
            attr = attrs[i];
            if (attr.specified !== false) {
                attrName = attr.name;
                attrNamespaceURI = attr.namespaceURI;

                if (attrNamespaceURI) {
                    attrName = attr.localName || attrName;

                    if (!hasAttributeNS(toNode, attrNamespaceURI, attrName)) {
                        fromNode.removeAttributeNS(attrNamespaceURI, attrName);
                    }
                } else {
                    if (!hasAttributeNS(toNode, null, attrName)) {
                        fromNode.removeAttribute(attrName);
                    }
                }
            }
        }
    }
}

/**
 * Copies the children of one DOM element to another DOM element
 */
function moveChildren(fromEl, toEl) {
    var curChild = fromEl.firstChild;
    while (curChild) {
        var nextChild = curChild.nextSibling;
        toEl.appendChild(curChild);
        curChild = nextChild;
    }
    return toEl;
}

function defaultGetNodeKey(node) {
    return node.id;
}

function morphdom(fromNode, toNode, options) {
    if (!options) {
        options = {};
    }

    if (typeof toNode === 'string') {
        if (fromNode.nodeName === '#document' || fromNode.nodeName === 'HTML') {
            var toNodeHtml = toNode;
            toNode = doc.createElement('html');
            toNode.innerHTML = toNodeHtml;
        } else {
            toNode = toElement(toNode);
        }
    }

    var getNodeKey = options.getNodeKey || defaultGetNodeKey;
    var onBeforeNodeAdded = options.onBeforeNodeAdded || noop;
    var onNodeAdded = options.onNodeAdded || noop;
    var onBeforeElUpdated = options.onBeforeElUpdated || noop;
    var onElUpdated = options.onElUpdated || noop;
    var onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || noop;
    var onNodeDiscarded = options.onNodeDiscarded || noop;
    var onBeforeElChildrenUpdated = options.onBeforeElChildrenUpdated || noop;
    var childrenOnly = options.childrenOnly === true;

    // This object is used as a lookup to quickly find all keyed elements in the original DOM tree.
    var fromNodesLookup = {};
    var keyedRemovalList;

    function addKeyedRemoval(key) {
        if (keyedRemovalList) {
            keyedRemovalList.push(key);
        } else {
            keyedRemovalList = [key];
        }
    }

    function walkDiscardedChildNodes(node, skipKeyedNodes) {
        if (node.nodeType === ELEMENT_NODE) {
            var curChild = node.firstChild;
            while (curChild) {

                var key = undefined;

                if (skipKeyedNodes && (key = getNodeKey(curChild))) {
                    // If we are skipping keyed nodes then we add the key
                    // to a list so that it can be handled at the very end.
                    addKeyedRemoval(key);
                } else {
                    // Only report the node as discarded if it is not keyed. We do this because
                    // at the end we loop through all keyed elements that were unmatched
                    // and then discard them in one final pass.
                    onNodeDiscarded(curChild);
                    if (curChild.firstChild) {
                        walkDiscardedChildNodes(curChild, skipKeyedNodes);
                    }
                }

                curChild = curChild.nextSibling;
            }
        }
    }

    /**
     * Removes a DOM node out of the original DOM
     *
     * @param  {Node} node The node to remove
     * @param  {Node} parentNode The nodes parent
     * @param  {Boolean} skipKeyedNodes If true then elements with keys will be skipped and not discarded.
     * @return {undefined}
     */
    function removeNode(node, parentNode, skipKeyedNodes) {
        if (onBeforeNodeDiscarded(node) === false) {
            return;
        }

        if (parentNode) {
            parentNode.removeChild(node);
        }

        onNodeDiscarded(node);
        walkDiscardedChildNodes(node, skipKeyedNodes);
    }

    // // TreeWalker implementation is no faster, but keeping this around in case this changes in the future
    // function indexTree(root) {
    //     var treeWalker = document.createTreeWalker(
    //         root,
    //         NodeFilter.SHOW_ELEMENT);
    //
    //     var el;
    //     while((el = treeWalker.nextNode())) {
    //         var key = getNodeKey(el);
    //         if (key) {
    //             fromNodesLookup[key] = el;
    //         }
    //     }
    // }

    // // NodeIterator implementation is no faster, but keeping this around in case this changes in the future
    //
    // function indexTree(node) {
    //     var nodeIterator = document.createNodeIterator(node, NodeFilter.SHOW_ELEMENT);
    //     var el;
    //     while((el = nodeIterator.nextNode())) {
    //         var key = getNodeKey(el);
    //         if (key) {
    //             fromNodesLookup[key] = el;
    //         }
    //     }
    // }

    function indexTree(node) {
        if (node.nodeType === ELEMENT_NODE) {
            var curChild = node.firstChild;
            while (curChild) {
                var key = getNodeKey(curChild);
                if (key) {
                    fromNodesLookup[key] = curChild;
                }

                // Walk recursively
                indexTree(curChild);

                curChild = curChild.nextSibling;
            }
        }
    }

    indexTree(fromNode);

    function handleNodeAdded(el) {
        onNodeAdded(el);

        var curChild = el.firstChild;
        while (curChild) {
            var nextSibling = curChild.nextSibling;

            var key = getNodeKey(curChild);
            if (key) {
                var unmatchedFromEl = fromNodesLookup[key];
                if (unmatchedFromEl && compareNodeNames(curChild, unmatchedFromEl)) {
                    curChild.parentNode.replaceChild(unmatchedFromEl, curChild);
                    morphEl(unmatchedFromEl, curChild);
                }
            }

            handleNodeAdded(curChild);
            curChild = nextSibling;
        }
    }

    function morphEl(fromEl, toEl, childrenOnly) {
        var toElKey = getNodeKey(toEl);
        var curFromNodeKey;

        if (toElKey) {
            // If an element with an ID is being morphed then it is will be in the final
            // DOM so clear it out of the saved elements collection
            delete fromNodesLookup[toElKey];
        }

        if (toNode.isSameNode && toNode.isSameNode(fromNode)) {
            return;
        }

        if (!childrenOnly) {
            if (onBeforeElUpdated(fromEl, toEl) === false) {
                return;
            }

            morphAttrs(fromEl, toEl);
            onElUpdated(fromEl);

            if (onBeforeElChildrenUpdated(fromEl, toEl) === false) {
                return;
            }
        }

        if (fromEl.nodeName !== 'TEXTAREA') {
            var curToNodeChild = toEl.firstChild;
            var curFromNodeChild = fromEl.firstChild;
            var curToNodeKey;

            var fromNextSibling;
            var toNextSibling;
            var matchingFromEl;

            outer: while (curToNodeChild) {
                toNextSibling = curToNodeChild.nextSibling;
                curToNodeKey = getNodeKey(curToNodeChild);

                while (curFromNodeChild) {
                    fromNextSibling = curFromNodeChild.nextSibling;

                    if (curToNodeChild.isSameNode && curToNodeChild.isSameNode(curFromNodeChild)) {
                        curToNodeChild = toNextSibling;
                        curFromNodeChild = fromNextSibling;
                        continue outer;
                    }

                    curFromNodeKey = getNodeKey(curFromNodeChild);

                    var curFromNodeType = curFromNodeChild.nodeType;

                    var isCompatible = undefined;

                    if (curFromNodeType === curToNodeChild.nodeType) {
                        if (curFromNodeType === ELEMENT_NODE) {
                            // Both nodes being compared are Element nodes

                            if (curToNodeKey) {
                                // The target node has a key so we want to match it up with the correct element
                                // in the original DOM tree
                                if (curToNodeKey !== curFromNodeKey) {
                                    // The current element in the original DOM tree does not have a matching key so
                                    // let's check our lookup to see if there is a matching element in the original
                                    // DOM tree
                                    if ((matchingFromEl = fromNodesLookup[curToNodeKey])) {
                                        if (curFromNodeChild.nextSibling === matchingFromEl) {
                                            // Special case for single element removals. To avoid removing the original
                                            // DOM node out of the tree (since that can break CSS transitions, etc.),
                                            // we will instead discard the current node and wait until the next
                                            // iteration to properly match up the keyed target element with its matching
                                            // element in the original tree
                                            isCompatible = false;
                                        } else {
                                            // We found a matching keyed element somewhere in the original DOM tree.
                                            // Let's moving the original DOM node into the current position and morph
                                            // it.

                                            // NOTE: We use insertBefore instead of replaceChild because we want to go through
                                            // the `removeNode()` function for the node that is being discarded so that
                                            // all lifecycle hooks are correctly invoked
                                            fromEl.insertBefore(matchingFromEl, curFromNodeChild);

                                            fromNextSibling = curFromNodeChild.nextSibling;

                                            if (curFromNodeKey) {
                                                // Since the node is keyed it might be matched up later so we defer
                                                // the actual removal to later
                                                addKeyedRemoval(curFromNodeKey);
                                            } else {
                                                // NOTE: we skip nested keyed nodes from being removed since there is
                                                //       still a chance they will be matched up later
                                                removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                                            }

                                            curFromNodeChild = matchingFromEl;
                                        }
                                    } else {
                                        // The nodes are not compatible since the "to" node has a key and there
                                        // is no matching keyed node in the source tree
                                        isCompatible = false;
                                    }
                                }
                            } else if (curFromNodeKey) {
                                // The original has a key
                                isCompatible = false;
                            }

                            isCompatible = isCompatible !== false && compareNodeNames(curFromNodeChild, curToNodeChild);
                            if (isCompatible) {
                                // We found compatible DOM elements so transform
                                // the current "from" node to match the current
                                // target DOM node.
                                morphEl(curFromNodeChild, curToNodeChild);
                            }

                        } else if (curFromNodeType === TEXT_NODE || curFromNodeType == COMMENT_NODE) {
                            // Both nodes being compared are Text or Comment nodes
                            isCompatible = true;
                            // Simply update nodeValue on the original node to
                            // change the text value
                            curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
                        }
                    }

                    if (isCompatible) {
                        // Advance both the "to" child and the "from" child since we found a match
                        curToNodeChild = toNextSibling;
                        curFromNodeChild = fromNextSibling;
                        continue outer;
                    }

                    // No compatible match so remove the old node from the DOM and continue trying to find a
                    // match in the original DOM. However, we only do this if the from node is not keyed
                    // since it is possible that a keyed node might match up with a node somewhere else in the
                    // target tree and we don't want to discard it just yet since it still might find a
                    // home in the final DOM tree. After everything is done we will remove any keyed nodes
                    // that didn't find a home
                    if (curFromNodeKey) {
                        // Since the node is keyed it might be matched up later so we defer
                        // the actual removal to later
                        addKeyedRemoval(curFromNodeKey);
                    } else {
                        // NOTE: we skip nested keyed nodes from being removed since there is
                        //       still a chance they will be matched up later
                        removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                    }

                    curFromNodeChild = fromNextSibling;
                }

                // If we got this far then we did not find a candidate match for
                // our "to node" and we exhausted all of the children "from"
                // nodes. Therefore, we will just append the current "to" node
                // to the end
                if (curToNodeKey && (matchingFromEl = fromNodesLookup[curToNodeKey]) && compareNodeNames(matchingFromEl, curToNodeChild)) {
                    fromEl.appendChild(matchingFromEl);
                    morphEl(matchingFromEl, curToNodeChild);
                } else {
                    var onBeforeNodeAddedResult = onBeforeNodeAdded(curToNodeChild);
                    if (onBeforeNodeAddedResult !== false) {
                        if (onBeforeNodeAddedResult) {
                            curToNodeChild = onBeforeNodeAddedResult;
                        }

                        if (curToNodeChild.actualize) {
                            curToNodeChild = curToNodeChild.actualize(fromEl.ownerDocument || doc);
                        }
                        fromEl.appendChild(curToNodeChild);
                        handleNodeAdded(curToNodeChild);
                    }
                }

                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
            }

            // We have processed all of the "to nodes". If curFromNodeChild is
            // non-null then we still have some from nodes left over that need
            // to be removed
            while (curFromNodeChild) {
                fromNextSibling = curFromNodeChild.nextSibling;
                if ((curFromNodeKey = getNodeKey(curFromNodeChild))) {
                    // Since the node is keyed it might be matched up later so we defer
                    // the actual removal to later
                    addKeyedRemoval(curFromNodeKey);
                } else {
                    // NOTE: we skip nested keyed nodes from being removed since there is
                    //       still a chance they will be matched up later
                    removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                }
                curFromNodeChild = fromNextSibling;
            }
        }

        var specialElHandler = specialElHandlers[fromEl.nodeName];
        if (specialElHandler) {
            specialElHandler(fromEl, toEl);
        }
    } // END: morphEl(...)

    var morphedNode = fromNode;
    var morphedNodeType = morphedNode.nodeType;
    var toNodeType = toNode.nodeType;

    if (!childrenOnly) {
        // Handle the case where we are given two DOM nodes that are not
        // compatible (e.g. <div> --> <span> or <div> --> TEXT)
        if (morphedNodeType === ELEMENT_NODE) {
            if (toNodeType === ELEMENT_NODE) {
                if (!compareNodeNames(fromNode, toNode)) {
                    onNodeDiscarded(fromNode);
                    morphedNode = moveChildren(fromNode, createElementNS(toNode.nodeName, toNode.namespaceURI));
                }
            } else {
                // Going from an element node to a text node
                morphedNode = toNode;
            }
        } else if (morphedNodeType === TEXT_NODE || morphedNodeType === COMMENT_NODE) { // Text or comment node
            if (toNodeType === morphedNodeType) {
                morphedNode.nodeValue = toNode.nodeValue;
                return morphedNode;
            } else {
                // Text node to something else
                morphedNode = toNode;
            }
        }
    }

    if (morphedNode === toNode) {
        // The "to node" was not compatible with the "from node" so we had to
        // toss out the "from node" and use the "to node"
        onNodeDiscarded(fromNode);
    } else {
        morphEl(morphedNode, toNode, childrenOnly);

        // We now need to loop over any keyed nodes that might need to be
        // removed. We only do the removal if we know that the keyed node
        // never found a match. When a keyed node is matched up we remove
        // it out of fromNodesLookup and we use fromNodesLookup to determine
        // if a keyed node has been matched up or not
        if (keyedRemovalList) {
            for (var i=0, len=keyedRemovalList.length; i<len; i++) {
                var elToRemove = fromNodesLookup[keyedRemovalList[i]];
                if (elToRemove) {
                    removeNode(elToRemove, elToRemove.parentNode, false);
                }
            }
        }
    }

    if (!childrenOnly && morphedNode !== fromNode && fromNode.parentNode) {
        if (morphedNode.actualize) {
            morphedNode = morphedNode.actualize(fromNode.ownerDocument || doc);
        }
        // If we had to swap out the from node with a new node because the old
        // node was not compatible with the target node then we need to
        // replace the old DOM node in the original DOM tree. This is only
        // possible if the original DOM node was part of a DOM tree which
        // we know is the case if it has a parent node.
        fromNode.parentNode.replaceChild(morphedNode, fromNode);
    }

    return morphedNode;
}

module.exports = morphdom;

},{}],23:[function(require,module,exports){
/**
 * Helpers.
 */

var s = 1000
var m = s * 60
var h = m * 60
var d = h * 24
var y = d * 365.25

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {}
  var type = typeof val
  if (type === 'string' && val.length > 0) {
    return parse(val)
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ?
			fmtLong(val) :
			fmtShort(val)
  }
  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val))
}

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str)
  if (str.length > 10000) {
    return
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str)
  if (!match) {
    return
  }
  var n = parseFloat(match[1])
  var type = (match[2] || 'ms').toLowerCase()
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y
    case 'days':
    case 'day':
    case 'd':
      return n * d
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n
    default:
      return undefined
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd'
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h'
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm'
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's'
  }
  return ms + 'ms'
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms'
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name
  }
  return Math.ceil(ms / n) + ' ' + name + 's'
}

},{}],24:[function(require,module,exports){
var through = require('through2')
var split = require('split2')
var EOL = require('os').EOL
var stringify = require('json-stringify-safe')

module.exports = parse
module.exports.serialize = module.exports.stringify = serialize
module.exports.parse = parse

function parse (opts) {
  opts = opts || {}
  opts.strict = opts.strict !== false

  function parseRow (row) {
    try {
      if (row) return JSON.parse(row)
    } catch (e) {
      if (opts.strict) {
        this.emit('error', new Error('Could not parse row ' + row.slice(0, 50) + '...'))
      }
    }
  }

  return split(parseRow, opts)
}

function serialize (opts) {
  return through.obj(opts, function(obj, enc, cb) {
    cb(null, stringify(obj) + EOL)
  })
}

},{"json-stringify-safe":21,"os":26,"split2":44,"through2":47}],25:[function(require,module,exports){
/* global MutationObserver */
var document = require('global/document')
var window = require('global/window')
var watch = Object.create(null)
var KEY_ID = 'onloadid' + (new Date() % 9e6).toString(36)
var KEY_ATTR = 'data-' + KEY_ID
var INDEX = 0

if (window && window.MutationObserver) {
  var observer = new MutationObserver(function (mutations) {
    if (Object.keys(watch).length < 1) return
    for (var i = 0; i < mutations.length; i++) {
      if (mutations[i].attributeName === KEY_ATTR) {
        eachAttr(mutations[i], turnon, turnoff)
        continue
      }
      eachMutation(mutations[i].removedNodes, turnoff)
      eachMutation(mutations[i].addedNodes, turnon)
    }
  })
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: [KEY_ATTR]
  })
}

module.exports = function onload (el, on, off, caller) {
  on = on || function () {}
  off = off || function () {}
  el.setAttribute(KEY_ATTR, 'o' + INDEX)
  watch['o' + INDEX] = [on, off, 0, caller || onload.caller]
  INDEX += 1
  return el
}

function turnon (index, el) {
  if (watch[index][0] && watch[index][2] === 0) {
    watch[index][0](el)
    watch[index][2] = 1
  }
}

function turnoff (index, el) {
  if (watch[index][1] && watch[index][2] === 1) {
    watch[index][1](el)
    watch[index][2] = 0
  }
}

function eachAttr (mutation, on, off) {
  var newValue = mutation.target.getAttribute(KEY_ATTR)
  if (sameOrigin(mutation.oldValue, newValue)) {
    watch[newValue] = watch[mutation.oldValue]
    return
  }
  if (watch[mutation.oldValue]) {
    off(mutation.oldValue, mutation.target)
  }
  if (watch[newValue]) {
    on(newValue, mutation.target)
  }
}

function sameOrigin (oldValue, newValue) {
  if (!oldValue || !newValue) return false
  return watch[oldValue][3] === watch[newValue][3]
}

function eachMutation (nodes, fn) {
  var keys = Object.keys(watch)
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] && nodes[i].getAttribute && nodes[i].getAttribute(KEY_ATTR)) {
      var onloadid = nodes[i].getAttribute(KEY_ATTR)
      keys.forEach(function (k) {
        if (onloadid === k) {
          fn(k, nodes[i])
        }
      })
    }
    if (nodes[i].childNodes.length > 0) {
      eachMutation(nodes[i].childNodes, fn)
    }
  }
}

},{"global/document":12,"global/window":13}],26:[function(require,module,exports){
exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';

},{}],27:[function(require,module,exports){
(function (process){
// Generated by CoffeeScript 1.7.1
(function() {
  var getNanoSeconds, hrtime, loadTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - loadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    loadTime = getNanoSeconds();
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);

}).call(this,require('_process'))
},{"_process":7}],28:[function(require,module,exports){
(function (process){
'use strict';

if (!process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = nextTick;
} else {
  module.exports = process.nextTick;
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}

}).call(this,require('_process'))
},{"_process":7}],29:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],30:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],31:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":29,"./encode":30}],32:[function(require,module,exports){
(function (global){
var now = require('performance-now')
  , root = typeof window === 'undefined' ? global : window
  , vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = root['request' + suffix]
  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

for(var i = 0; !raf && i < vendors.length; i++) {
  raf = root[vendors[i] + 'Request' + suffix]
  caf = root[vendors[i] + 'Cancel' + suffix]
      || root[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if(!raf || !caf) {
  var last = 0
    , id = 0
    , queue = []
    , frameDuration = 1000 / 60

  raf = function(callback) {
    if(queue.length === 0) {
      var _now = now()
        , next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function() {
        var cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last)
            } catch(e) {
              setTimeout(function() { throw e }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function(handle) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

module.exports = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(root, fn)
}
module.exports.cancel = function() {
  caf.apply(root, arguments)
}
module.exports.polyfill = function() {
  root.requestAnimationFrame = raf
  root.cancelAnimationFrame = caf
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"performance-now":27}],33:[function(require,module,exports){
module.exports = require("./lib/_stream_duplex.js")

},{"./lib/_stream_duplex.js":34}],34:[function(require,module,exports){
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.

'use strict';

/*<replacement>*/

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var processNextTick = require('process-nextick-args');
/*</replacement>*/

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

var Readable = require('./_stream_readable');
var Writable = require('./_stream_writable');

util.inherits(Duplex, Readable);

var keys = objectKeys(Writable.prototype);
for (var v = 0; v < keys.length; v++) {
  var method = keys[v];
  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  processNextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}
},{"./_stream_readable":36,"./_stream_writable":38,"core-util-is":10,"inherits":17,"process-nextick-args":28}],35:[function(require,module,exports){
// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.

'use strict';

module.exports = PassThrough;

var Transform = require('./_stream_transform');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};
},{"./_stream_transform":37,"core-util-is":10,"inherits":17}],36:[function(require,module,exports){
(function (process){
'use strict';

module.exports = Readable;

/*<replacement>*/
var processNextTick = require('process-nextick-args');
/*</replacement>*/

/*<replacement>*/
var isArray = require('isarray');
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = require('events').EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream;
(function () {
  try {
    Stream = require('st' + 'ream');
  } catch (_) {} finally {
    if (!Stream) Stream = require('events').EventEmitter;
  }
})();
/*</replacement>*/

var Buffer = require('buffer').Buffer;
/*<replacement>*/
var bufferShim = require('buffer-shims');
/*</replacement>*/

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/
var debugUtil = require('util');
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = require('./internal/streams/BufferList');
var StringDecoder;

util.inherits(Readable, Stream);

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') {
    return emitter.prependListener(event, fn);
  } else {
    // This is a hack to make sure that our error handler is attached before any
    // userland ones.  NEVER DO THIS. This is here only because this code needs
    // to continue to work with older versions of Node.js that do not include
    // the prependListener() method. The goal is to eventually remove this hack.
    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
  }
}

function ReadableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~ ~this.highWaterMark;

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // when piping, we only care about 'readable' events that happen
  // after read()ing all the bytes and not getting any pushback.
  this.ranOut = false;

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options && typeof options.read === 'function') this._read = options.read;

  Stream.call(this);
}

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;

  if (!state.objectMode && typeof chunk === 'string') {
    encoding = encoding || state.defaultEncoding;
    if (encoding !== state.encoding) {
      chunk = bufferShim.from(chunk, encoding);
      encoding = '';
    }
  }

  return readableAddChunk(this, state, chunk, encoding, false);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  var state = this._readableState;
  return readableAddChunk(this, state, chunk, '', true);
};

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

function readableAddChunk(stream, state, chunk, encoding, addToFront) {
  var er = chunkInvalid(state, chunk);
  if (er) {
    stream.emit('error', er);
  } else if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else if (state.objectMode || chunk && chunk.length > 0) {
    if (state.ended && !addToFront) {
      var e = new Error('stream.push() after EOF');
      stream.emit('error', e);
    } else if (state.endEmitted && addToFront) {
      var _e = new Error('stream.unshift() after end event');
      stream.emit('error', _e);
    } else {
      var skipAdd;
      if (state.decoder && !addToFront && !encoding) {
        chunk = state.decoder.write(chunk);
        skipAdd = !state.objectMode && chunk.length === 0;
      }

      if (!addToFront) state.reading = false;

      // Don't add to the buffer if we've decoded to an empty string chunk and
      // we're not in object mode
      if (!skipAdd) {
        // if we want the data now, just emit it.
        if (state.flowing && state.length === 0 && !state.sync) {
          stream.emit('data', chunk);
          stream.read(0);
        } else {
          // update the buffer info.
          state.length += state.objectMode ? 1 : chunk.length;
          if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

          if (state.needReadable) emitReadable(stream);
        }
      }

      maybeReadMore(stream, state);
    }
  } else if (!addToFront) {
    state.reading = false;
  }

  return needMoreData(state);
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function chunkInvalid(state, chunk) {
  var er = null;
  if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== null && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) processNextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    processNextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : cleanup;
  if (state.endEmitted) processNextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable) {
    debug('onunpipe');
    if (readable === src) {
      cleanup();
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', cleanup);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        processNextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this, state);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    processNextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
  forEach(events, function (ev) {
    stream.on(ev, self.emit.bind(self, ev));
  });

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = bufferShim.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    processNextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
}).call(this,require('_process'))
},{"./_stream_duplex":34,"./internal/streams/BufferList":39,"_process":7,"buffer":9,"buffer-shims":8,"core-util-is":10,"events":11,"inherits":17,"isarray":19,"process-nextick-args":28,"string_decoder/":46,"util":6}],37:[function(require,module,exports){
// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.

'use strict';

module.exports = Transform;

var Duplex = require('./_stream_duplex');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(Transform, Duplex);

function TransformState(stream) {
  this.afterTransform = function (er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
  this.writeencoding = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) return stream.emit('error', new Error('no writecb in Transform class'));

  ts.writechunk = null;
  ts.writecb = null;

  if (data !== null && data !== undefined) stream.push(data);

  cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = new TransformState(this);

  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.once('prefinish', function () {
    if (typeof this._flush === 'function') this._flush(function (er, data) {
      done(stream, er, data);
    });else done(stream);
  });
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data !== null && data !== undefined) stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var ts = stream._transformState;

  if (ws.length) throw new Error('Calling transform done when ws.length != 0');

  if (ts.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}
},{"./_stream_duplex":34,"core-util-is":10,"inherits":17}],38:[function(require,module,exports){
(function (process){
// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.

'use strict';

module.exports = Writable;

/*<replacement>*/
var processNextTick = require('process-nextick-args');
/*</replacement>*/

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: require('util-deprecate')
};
/*</replacement>*/

/*<replacement>*/
var Stream;
(function () {
  try {
    Stream = require('st' + 'ream');
  } catch (_) {} finally {
    if (!Stream) Stream = require('events').EventEmitter;
  }
})();
/*</replacement>*/

var Buffer = require('buffer').Buffer;
/*<replacement>*/
var bufferShim = require('buffer-shims');
/*</replacement>*/

util.inherits(Writable, Stream);

function nop() {}

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

function WritableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~ ~this.highWaterMark;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  processNextTick(cb, er);
}

// If we get something that is not a buffer, string, null, or undefined,
// and we're not in objectMode, then that's an error.
// Otherwise stream chunks are all considered to be of length=1, and the
// watermarks determine how many objects to keep in the buffer, rather than
// how many bytes or characters.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;
  // Always throw error if a null is written
  // if we are not in object mode then throw
  // if it is not a buffer, string, or undefined.
  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    processNextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (Buffer.isBuffer(chunk)) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = bufferShim.from(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, chunk, encoding, cb) {
  chunk = decodeChunk(state, chunk, encoding);

  if (Buffer.isBuffer(chunk)) encoding = 'buffer';
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;
  if (sync) processNextTick(cb, er);else cb(er);

  stream._writableState.errorEmitted = true;
  stream.emit('error', er);
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
        afterWrite(stream, state, finished, cb);
      }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    while (entry) {
      buffer[count] = entry;
      entry = entry.next;
      count += 1;
    }

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequestCount = 0;
  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}

function prefinish(stream, state) {
  if (!state.prefinished) {
    state.prefinished = true;
    stream.emit('prefinish');
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    if (state.pendingcb === 0) {
      prefinish(stream, state);
      state.finished = true;
      stream.emit('finish');
    } else {
      prefinish(stream, state);
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) processNextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;

  this.finish = function (err) {
    var entry = _this.entry;
    _this.entry = null;
    while (entry) {
      var cb = entry.callback;
      state.pendingcb--;
      cb(err);
      entry = entry.next;
    }
    if (state.corkedRequestsFree) {
      state.corkedRequestsFree.next = _this;
    } else {
      state.corkedRequestsFree = _this;
    }
  };
}
}).call(this,require('_process'))
},{"./_stream_duplex":34,"_process":7,"buffer":9,"buffer-shims":8,"core-util-is":10,"events":11,"inherits":17,"process-nextick-args":28,"util-deprecate":48}],39:[function(require,module,exports){
'use strict';

var Buffer = require('buffer').Buffer;
/*<replacement>*/
var bufferShim = require('buffer-shims');
/*</replacement>*/

module.exports = BufferList;

function BufferList() {
  this.head = null;
  this.tail = null;
  this.length = 0;
}

BufferList.prototype.push = function (v) {
  var entry = { data: v, next: null };
  if (this.length > 0) this.tail.next = entry;else this.head = entry;
  this.tail = entry;
  ++this.length;
};

BufferList.prototype.unshift = function (v) {
  var entry = { data: v, next: this.head };
  if (this.length === 0) this.tail = entry;
  this.head = entry;
  ++this.length;
};

BufferList.prototype.shift = function () {
  if (this.length === 0) return;
  var ret = this.head.data;
  if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
  --this.length;
  return ret;
};

BufferList.prototype.clear = function () {
  this.head = this.tail = null;
  this.length = 0;
};

BufferList.prototype.join = function (s) {
  if (this.length === 0) return '';
  var p = this.head;
  var ret = '' + p.data;
  while (p = p.next) {
    ret += s + p.data;
  }return ret;
};

BufferList.prototype.concat = function (n) {
  if (this.length === 0) return bufferShim.alloc(0);
  if (this.length === 1) return this.head.data;
  var ret = bufferShim.allocUnsafe(n >>> 0);
  var p = this.head;
  var i = 0;
  while (p) {
    p.data.copy(ret, i);
    i += p.data.length;
    p = p.next;
  }
  return ret;
};
},{"buffer":9,"buffer-shims":8}],40:[function(require,module,exports){
module.exports = require("./lib/_stream_passthrough.js")

},{"./lib/_stream_passthrough.js":35}],41:[function(require,module,exports){
(function (process){
var Stream = (function (){
  try {
    return require('st' + 'ream'); // hack to fix a circular dependency issue when used with browserify
  } catch(_){}
}());
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = Stream || exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

if (!process.browser && process.env.READABLE_STREAM === 'disable' && Stream) {
  module.exports = Stream;
}

}).call(this,require('_process'))
},{"./lib/_stream_duplex.js":34,"./lib/_stream_passthrough.js":35,"./lib/_stream_readable.js":36,"./lib/_stream_transform.js":37,"./lib/_stream_writable.js":38,"_process":7}],42:[function(require,module,exports){
module.exports = require("./lib/_stream_transform.js")

},{"./lib/_stream_transform.js":37}],43:[function(require,module,exports){
module.exports = require("./lib/_stream_writable.js")

},{"./lib/_stream_writable.js":38}],44:[function(require,module,exports){
/*
Copyright (c) 2014-2016, Matteo Collina <hello@matteocollina.com>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR
IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/

'use strict'

var through = require('through2')
var StringDecoder = require('string_decoder').StringDecoder

function transform (chunk, enc, cb) {
  this._last += this._decoder.write(chunk)
  if (this._last.length > this.maxLength) {
    return cb(new Error('maximum buffer reached'))
  }

  var list = this._last.split(this.matcher)

  this._last = list.pop()

  for (var i = 0; i < list.length; i++) {
    push(this, this.mapper(list[i]))
  }

  cb()
}

function flush (cb) {
  // forward any gibberish left in there
  this._last += this._decoder.end()

  if (this._last) {
    push(this, this.mapper(this._last))
  }

  cb()
}

function push (self, val) {
  if (val !== undefined) {
    self.push(val)
  }
}

function noop (incoming) {
  return incoming
}

function split (matcher, mapper, options) {
  // Set defaults for any arguments not supplied.
  matcher = matcher || /\r?\n/
  mapper = mapper || noop
  options = options || {}

  // Test arguments explicitly.
  switch (arguments.length) {
    case 1:
      // If mapper is only argument.
      if (typeof matcher === 'function') {
        mapper = matcher
        matcher = /\r?\n/
      // If options is only argument.
      } else if (typeof matcher === 'object' && !(matcher instanceof RegExp)) {
        options = matcher
        matcher = /\r?\n/
      }
      break

    case 2:
      // If mapper and options are arguments.
      if (typeof matcher === 'function') {
        options = mapper
        mapper = matcher
        matcher = /\r?\n/
      // If matcher and options are arguments.
      } else if (typeof mapper === 'object') {
        options = mapper
        mapper = noop
      }
  }

  var stream = through(options, transform, flush)

  // this stream is in objectMode only in the readable part
  stream._readableState.objectMode = true

  stream._last = ''
  stream._decoder = new StringDecoder('utf8')
  stream.matcher = matcher
  stream.mapper = mapper
  stream.maxLength = options.maxLength

  return stream
}

module.exports = split

},{"string_decoder":46,"through2":47}],45:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = require('events').EventEmitter;
var inherits = require('inherits');

inherits(Stream, EE);
Stream.Readable = require('readable-stream/readable.js');
Stream.Writable = require('readable-stream/writable.js');
Stream.Duplex = require('readable-stream/duplex.js');
Stream.Transform = require('readable-stream/transform.js');
Stream.PassThrough = require('readable-stream/passthrough.js');

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};

},{"events":11,"inherits":17,"readable-stream/duplex.js":33,"readable-stream/passthrough.js":40,"readable-stream/readable.js":41,"readable-stream/transform.js":42,"readable-stream/writable.js":43}],46:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var Buffer = require('buffer').Buffer;

var isBufferEncoding = Buffer.isEncoding
  || function(encoding) {
       switch (encoding && encoding.toLowerCase()) {
         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
         default: return false;
       }
     }


function assertEncoding(encoding) {
  if (encoding && !isBufferEncoding(encoding)) {
    throw new Error('Unknown encoding: ' + encoding);
  }
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters. CESU-8 is handled as part of the UTF-8 encoding.
//
// @TODO Handling all encodings inside a single object makes it very difficult
// to reason about this code, so it should be split up in the future.
// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
// points as used by CESU-8.
var StringDecoder = exports.StringDecoder = function(encoding) {
  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
  assertEncoding(encoding);
  switch (this.encoding) {
    case 'utf8':
      // CESU-8 represents each of Surrogate Pair by 3-bytes
      this.surrogateSize = 3;
      break;
    case 'ucs2':
    case 'utf16le':
      // UTF-16 represents each of Surrogate Pair by 2-bytes
      this.surrogateSize = 2;
      this.detectIncompleteChar = utf16DetectIncompleteChar;
      break;
    case 'base64':
      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
      this.surrogateSize = 3;
      this.detectIncompleteChar = base64DetectIncompleteChar;
      break;
    default:
      this.write = passThroughWrite;
      return;
  }

  // Enough space to store all bytes of a single character. UTF-8 needs 4
  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
  this.charBuffer = new Buffer(6);
  // Number of bytes received for the current incomplete multi-byte character.
  this.charReceived = 0;
  // Number of bytes expected for the current incomplete multi-byte character.
  this.charLength = 0;
};


// write decodes the given buffer and returns it as JS string that is
// guaranteed to not contain any partial multi-byte characters. Any partial
// character found at the end of the buffer is buffered up, and will be
// returned when calling write again with the remaining bytes.
//
// Note: Converting a Buffer containing an orphan surrogate to a String
// currently works, but converting a String to a Buffer (via `new Buffer`, or
// Buffer#write) will replace incomplete surrogates with the unicode
// replacement character. See https://codereview.chromium.org/121173009/ .
StringDecoder.prototype.write = function(buffer) {
  var charStr = '';
  // if our last write ended with an incomplete multibyte character
  while (this.charLength) {
    // determine how many remaining bytes this buffer has to offer for this char
    var available = (buffer.length >= this.charLength - this.charReceived) ?
        this.charLength - this.charReceived :
        buffer.length;

    // add the new bytes to the char buffer
    buffer.copy(this.charBuffer, this.charReceived, 0, available);
    this.charReceived += available;

    if (this.charReceived < this.charLength) {
      // still not enough chars in this buffer? wait for more ...
      return '';
    }

    // remove bytes belonging to the current character from the buffer
    buffer = buffer.slice(available, buffer.length);

    // get the character that was split
    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
    var charCode = charStr.charCodeAt(charStr.length - 1);
    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      this.charLength += this.surrogateSize;
      charStr = '';
      continue;
    }
    this.charReceived = this.charLength = 0;

    // if there are no more bytes in this buffer, just emit our char
    if (buffer.length === 0) {
      return charStr;
    }
    break;
  }

  // determine and set charLength / charReceived
  this.detectIncompleteChar(buffer);

  var end = buffer.length;
  if (this.charLength) {
    // buffer the incomplete character bytes we got
    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
    end -= this.charReceived;
  }

  charStr += buffer.toString(this.encoding, 0, end);

  var end = charStr.length - 1;
  var charCode = charStr.charCodeAt(end);
  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
    var size = this.surrogateSize;
    this.charLength += size;
    this.charReceived += size;
    this.charBuffer.copy(this.charBuffer, size, 0, size);
    buffer.copy(this.charBuffer, 0, 0, size);
    return charStr.substring(0, end);
  }

  // or just emit the charStr
  return charStr;
};

// detectIncompleteChar determines if there is an incomplete UTF-8 character at
// the end of the given buffer. If so, it sets this.charLength to the byte
// length that character, and sets this.charReceived to the number of bytes
// that are available for this character.
StringDecoder.prototype.detectIncompleteChar = function(buffer) {
  // determine how many bytes we have to check at the end of this buffer
  var i = (buffer.length >= 3) ? 3 : buffer.length;

  // Figure out if one of the last i bytes of our buffer announces an
  // incomplete char.
  for (; i > 0; i--) {
    var c = buffer[buffer.length - i];

    // See http://en.wikipedia.org/wiki/UTF-8#Description

    // 110XXXXX
    if (i == 1 && c >> 5 == 0x06) {
      this.charLength = 2;
      break;
    }

    // 1110XXXX
    if (i <= 2 && c >> 4 == 0x0E) {
      this.charLength = 3;
      break;
    }

    // 11110XXX
    if (i <= 3 && c >> 3 == 0x1E) {
      this.charLength = 4;
      break;
    }
  }
  this.charReceived = i;
};

StringDecoder.prototype.end = function(buffer) {
  var res = '';
  if (buffer && buffer.length)
    res = this.write(buffer);

  if (this.charReceived) {
    var cr = this.charReceived;
    var buf = this.charBuffer;
    var enc = this.encoding;
    res += buf.slice(0, cr).toString(enc);
  }

  return res;
};

function passThroughWrite(buffer) {
  return buffer.toString(this.encoding);
}

function utf16DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 2;
  this.charLength = this.charReceived ? 2 : 0;
}

function base64DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 3;
  this.charLength = this.charReceived ? 3 : 0;
}

},{"buffer":9}],47:[function(require,module,exports){
(function (process){
var Transform = require('readable-stream/transform')
  , inherits  = require('util').inherits
  , xtend     = require('xtend')

function DestroyableTransform(opts) {
  Transform.call(this, opts)
  this._destroyed = false
}

inherits(DestroyableTransform, Transform)

DestroyableTransform.prototype.destroy = function(err) {
  if (this._destroyed) return
  this._destroyed = true
  
  var self = this
  process.nextTick(function() {
    if (err)
      self.emit('error', err)
    self.emit('close')
  })
}

// a noop _transform function
function noop (chunk, enc, callback) {
  callback(null, chunk)
}


// create a new export function, used by both the main export and
// the .ctor export, contains common logic for dealing with arguments
function through2 (construct) {
  return function (options, transform, flush) {
    if (typeof options == 'function') {
      flush     = transform
      transform = options
      options   = {}
    }

    if (typeof transform != 'function')
      transform = noop

    if (typeof flush != 'function')
      flush = null

    return construct(options, transform, flush)
  }
}


// main export, just make me a transform stream!
module.exports = through2(function (options, transform, flush) {
  var t2 = new DestroyableTransform(options)

  t2._transform = transform

  if (flush)
    t2._flush = flush

  return t2
})


// make me a reusable prototype that I can `new`, or implicitly `new`
// with a constructor call
module.exports.ctor = through2(function (options, transform, flush) {
  function Through2 (override) {
    if (!(this instanceof Through2))
      return new Through2(override)

    this.options = xtend(options, override)

    DestroyableTransform.call(this, this.options)
  }

  inherits(Through2, DestroyableTransform)

  Through2.prototype._transform = transform

  if (flush)
    Through2.prototype._flush = flush

  return Through2
})


module.exports.obj = through2(function (options, transform, flush) {
  var t2 = new DestroyableTransform(xtend({ objectMode: true, highWaterMark: 16 }, options))

  t2._transform = transform

  if (flush)
    t2._flush = flush

  return t2
})

}).call(this,require('_process'))
},{"_process":7,"readable-stream/transform":42,"util":51,"xtend":54}],48:[function(require,module,exports){
(function (global){

/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],49:[function(require,module,exports){
arguments[4][17][0].apply(exports,arguments)
},{"dup":17}],50:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],51:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":50,"_process":7,"inherits":49}],52:[function(require,module,exports){
'use strict'

const PassThrough = require('stream').PassThrough
const qs = require('querystring')
const fetch = require('isomorphic-fetch')
const ndjson = require('ndjson').parse



const err = (res) => {
	if (res instanceof Error) return res
	const e = new Error(res.statusText)
	e.statusCode = res.status
	return e
}

const streaming = (req) => {
	const out = new PassThrough()
	req.then(
		  (res) => res.body.pipe(out)
		, (e) => out.emit('error', e))
	return out
}

const promised = (req) => req.then(
	  (res) => res.json()
	, (e) => {throw e})



const endpoint = 'https://transport.rest'

const request = (route, query, stream) => {
	if ('string' !== typeof route) throw new Error('route must be a string')
	if ('object' !== typeof query) throw new Error('query must be an object')

	const headers = {'User-Agent': 'vbb-client'}
	if ('identifier' in query) {
		headers['X-Identifier'] = query.identifier
		delete query.identifier
	}
	const url = endpoint + route + '?' + qs.stringify(query)

	const req = fetch(url, {mode: 'cors', redirect: 'follow', headers})
	.then(
		(res) => {
			if (!res.ok) throw err(res)
			return res
		},
		(res) => {throw err(res)})

	if (stream === true) return streaming(req)
	else return promised(req)
}



const stations = (q) => {
	q = q || {}
	if (q.completion === true)
		return request('/stations', q, false)
	return request('/stations', q, true).pipe(ndjson())
}

const nearby = (q) =>
	request('/stations/nearby', q || {})



const station = (id, q) => {
	if ('number' !== typeof id) throw new Error('id must be a number')
	return request('/stations/' + id, q || {})
}

const departures = (id, q) => {
	if ('number' !== typeof id) throw new Error('id must be a number')
	q = q || {}
	if ('when' in q && ('number' === typeof q.when || q.when instanceof Date))
		q.when = Math.round(q.when / 1000)
	return request(`/stations/${id}/departures`, q)
	.then((deps) => {
		for (let dep of deps) dep.when = new Date(dep.when * 1000)
		return deps
	}, (err) => err)
}



const lines = (q) =>
	request('/lines', q || {}, true).pipe(ndjson())

const line = (id, q) => {
	if ('number' !== typeof id) throw new Error('id must be a number')
	return request('/lines/' + id, q || {})
}


const location = (l, t, q) => {
	q = q || {}
	if ('number' === typeof l) {q[t] = l; return q}
	if (l.type === 'station') {q[t] = l.id; return q}
	if (l.type === 'poi' || l.type === 'address') {
		q[t + '.name'] = l.name
		q[t + '.longitude'] = l.longitude
		q[t + '.latitude'] = l.latitude
		if (l.type === 'poi') q[t + '.id'] = l.id
		return q
	}
	throw new Error('valid station, address or poi required.')
}

const routes = (from, to, q) => {
	q = q || {}
	Object.assign(q, location(from, 'from'), location(to, 'to'))
	if ('when' in q && ('number' === typeof q.when || q.when instanceof Date))
		q.when = Math.round(q.when / 1000)
	return request('/routes', q)
	.then((routes) => {
		for (let route of routes) {
			route.start = new Date(route.start * 1000)
			route.end = new Date(route.end * 1000)
			for (let part of route.parts) {
				part.start = new Date(part.start * 1000)
				part.end = new Date(part.end * 1000)
			}
		}
		return routes
	}, (err) => err)
}



const locations = (query, q) => {
	if ('string' !== typeof query) throw new Error('query must be a string')
	q = q || {}
	q.query = query
	return request('/locations', q)
}



const map = (type, q) => {
	if ('string' !== typeof type) throw new Error('type must be a string')
	return request('/maps/' + type, q || {}, true)
}



const radar = (north, west, south, east, q) => {
	if ('number' !== typeof north) throw new Error('north must be a number')
	if ('number' !== typeof west) throw new Error('west must be a number')
	if ('number' !== typeof south) throw new Error('south must be a number')
	if ('number' !== typeof east) throw new Error('east must be a number')
	q = Object.assign(q || {}, {north, west, south, east})
	return request('/radar', q || {})
}



module.exports = {
	stations, nearby,
	station, departures,
	lines, line,
	routes,
	locations,
	map,
	radar
}

},{"isomorphic-fetch":20,"ndjson":24,"querystring":31,"stream":45}],53:[function(require,module,exports){
(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)

    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (typeof input === 'string') {
      this.url = input
    } else {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split('\r\n').forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);

},{}],54:[function(require,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],55:[function(require,module,exports){
var bel = require('bel') // turns template tag into DOM elements
var morphdom = require('morphdom') // efficiently diffs + morphs two DOM elements
var defaultEvents = require('./update-events.js') // default events to be copied when dom elements update

module.exports = bel

// TODO move this + defaultEvents to a new module once we receive more feedback
module.exports.update = function (fromNode, toNode, opts) {
  if (!opts) opts = {}
  if (opts.events !== false) {
    if (!opts.onBeforeElUpdated) opts.onBeforeElUpdated = copier
  }

  return morphdom(fromNode, toNode, opts)

  // morphdom only copies attributes. we decided we also wanted to copy events
  // that can be set via attributes
  function copier (f, t) {
    // copy events:
    var events = opts.events || defaultEvents
    for (var i = 0; i < events.length; i++) {
      var ev = events[i]
      if (t[ev]) { // if new element has a whitelisted attribute
        f[ev] = t[ev] // update existing element
      } else if (f[ev]) { // if existing element has it and new one doesnt
        f[ev] = undefined // remove it from existing element
      }
    }
    // copy values for form elements
    if ((f.nodeName === 'INPUT' && f.type !== 'file') || f.nodeName === 'SELECT') {
      if (t.getAttribute('value') === null) t.value = f.value
    } else if (f.nodeName === 'TEXTAREA') {
      if (t.getAttribute('value') === null) f.value = t.value
    }
  }
}

},{"./update-events.js":56,"bel":5,"morphdom":22}],56:[function(require,module,exports){
module.exports = [
  // attribute events (can be set with attributes)
  'onclick',
  'ondblclick',
  'onmousedown',
  'onmouseup',
  'onmouseover',
  'onmousemove',
  'onmouseout',
  'ondragstart',
  'ondrag',
  'ondragenter',
  'ondragleave',
  'ondragover',
  'ondrop',
  'ondragend',
  'onkeydown',
  'onkeypress',
  'onkeyup',
  'onunload',
  'onabort',
  'onerror',
  'onresize',
  'onscroll',
  'onselect',
  'onchange',
  'onsubmit',
  'onreset',
  'onfocus',
  'onblur',
  'oninput',
  // other common events
  'oncontextmenu',
  'onfocusin',
  'onfocusout'
]

},{}]},{},[1]);
