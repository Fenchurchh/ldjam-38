import CameraController from "./CameraController"
import playerController from "./playerController"
import Actor from "./entities/Actor"
import Gunman from "./entities/Gunman.actor"
import game, { cafun, grid } from "./game.js"
// let camera = new CameraController(cafun)

let player
var timeElapsed = 0
let marker
let entities = []

function World(cafun, game, entities) {
	return { grid: cafun.grid, game, cafun, entities, marker }
}


function Scene0(game) {

	marker = PIXI.Sprite.fromImage("img/marker.png")
	marker.alpha = 0.2
	game.stage.addChild(marker)

	let world = new World(cafun, game, entities, marker)

	let a = new Actor({ src: "img/gunman-shoot-jj.png", world })
	a.xpos = 4
	a.ypos = 10

	let b = new Actor({ src: "img/gunman-holo.png", world })
	b.xpos = 12
	b.ypos = 5


	let player = new Gunman({ src: "img/gunman-cover.png", world })
	player.ypos = 5
	player.xpos = 5
	playerController({world, player})
	window.player = player

	entities.push(a)
	entities.push(b)
	entities.push(player)
}

export default class Main {
	constructor() {
		this.lastClickedTile = false
		let container = new PIXI.Container()
		game.stage.addChild(container)
		cafun.grid.renderMazeToContainer(container)

		Scene0(game)

		cafun.tileHovered.add(tile => {
			marker.x = tile.x
			marker.y = tile.y
		})

		cafun.tileClicked.add(tile => {
			if (tile) {
				console.log("tile", tile)
				this.lastClickedTile = tile
			}
		})

		game.ticker.add((dt) => {
			this.update(dt)
		})
	}


	update(dt) {
		cafun.stats.begin()
		cafun.font.update()
		timeElapsed = timeElapsed + dt
		cafun.stats.end()
	}
}


window.game = new Main()
window.cafun = cafun
