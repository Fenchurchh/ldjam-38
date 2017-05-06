import anime from "animejs"
import ndarray from "ndarray"

window.anime = anime

function Entity(image, state = { xpos: 0, ypos: 0 }, id) {
	console.log("state", state)
	this.image = image
	this.state = state
	this.x = Math.floor(this.state.xpos * 10)
	this.y = Math.floor(this.state.ypos * 10)
	this.id = id || Math.random().toString(32).substr(2) // TODO => Server Side generator
	console.log("new entity", this)
}

Entity.prototype.setPosition = function(xpos, ypos) {
	this.state.xpos = xpos
	this.state.ypos = ypos
}

Entity.prototype.tween = function(opts = {}) {
	let { x, y } = opts
	if (x == undefined) x = this.x
	if (y == undefined) y = this.y
	anime({
		targets: this,
		x: x,
		y: y,
		// alpha: [1,0],
		duration: 120,
		update: function() {
			this.targets.x = Math.round(this.targets.x)
			this.targets.y = Math.round(this.targets.y)
		},
		easing: "easeInOutSine",
	});
}

export default class World {
	constructor(cafun) {
		this.cafun = cafun
	}

	createMaze(w, h) {
		let content = []
			//Loop over all cells
		for (var x = 1; x < w - 1; ++x) {
			for (var y = 1; y < h - 1; ++y) {
				content.push(0)
			}
		}

		return ndarray(content, [w, h])
	}

	newMaze() {
		// var maze = ndarray([
		// 	0, 1, 0, 0, 0, 0, 0,
		// 	0, 1, 0, 1, 0, 0, 0,
		// 	0, 1, 0, 1, 1, 1, 0,
		// 	0, 1, 0, 1, 0, 0, 0,
		// 	0, 1, 0, 1, 0, 0, 0,
		// 	0, 1, 0, 1, 0, 0, 0,
		// 	0, 1, 0, 1, 0, 1, 1,
		// 	0, 0, 0, 1, 0, 0, 0,
		// ], [8, 7])
		let maze = this.createMaze(32,32)
		window.maze = maze
		return maze
	}

}
