import Graphics from "./Graphics"
import World from "./World"
import Input from "./Input"
import Grid from "./Grid"
import Camera from "./Camera"
import Font from "./Font"
import signals from "signals"
import * as _PIXI from "pixi.js"

let oldTile = {}
export default class Cafun {
	constructor() {
		this.socket = io("http://localhost:3000")
		this.stats = new Stats()
		this.stats.showPanel(0)
		document.body.appendChild(this.stats.dom)

		// signals setup
		this.updated = new signals.Signal()
		this.drawing = new signals.Signal()
		this.ticked = new signals.Signal()
		this.tileHovered = new signals.Signal()
		this.tileClicked = new signals.Signal()

		var rendererOptions = {
			antialiasing: false,
			transparent: false,
			backgroundColor: 0xefefef,
			resolution: window.devicePixelRatio,
			autoResize: false,
		}

		this.socket.on("connect", () => {
			console.log("connect", this.socket.id)
		})

		this.socket.on('turn', (data)=> {
			// console.log("turn",data);
			this.ticked.dispatch(data)
		})

		var app = new PIXI.Application(window.innerWidth / 3, window.innerHeight / 3, rendererOptions)
		this.game = app
		document.body.appendChild(app.view)
			// this.graphics = new Graphics(this.ctx)
		this.world = new World(this)
		this.grid = new Grid({ socket: this.socket, world: this.world })
		// this.camera = new Camera(this.ctx)
		this.font = new Font({ updated: this.updated, camera: this.camera })
		this.input = new Input()
			// Determine which screen dimension is most constrained
			// Update the renderer dimensions
			//

		let maze = this.world.newMaze()
		this.grid.setMaze(maze)

		this.scale()
		window.addEventListener("resize", () => { this.scale() })
		this.init()
	}

	setupSignals() {
		this.game.stage.buttonMode = true;
		this.game.stage.interactive = true;
		this.game.stage.hitArea = new PIXI.Rectangle(0, 0, 800, 600);
		this.game.stage.defaultCursor = "url(img/cursor.png) 3 2, auto";
		this.game.stage.on("pointermove", (e) => {
			let tile = this.grid.getTileAtScreenCoord(e.data.global)
			if (oldTile.hash !== tile.hash) {
				this.tileHovered.dispatch(tile)
			}

			oldTile = tile
		})

		this.game.stage.on("pointerdown", (e) => {
			let tile = this.grid.getTileAtScreenCoord(e.data.global)
			this.tileClicked.dispatch(tile)
		})

	}

	scale(scale = 3) {
		scale = scale
		let width = this.width = Math.floor(window.innerWidth / scale)
		let height = this.height = Math.floor(window.innerHeight / scale)
		this.game.renderer.resize(width, height)
			// this.game.view.width = window.innerWidth
			// this.game.view.height = window.innerHeight

		this.game.view.style.width = window.innerWidth + "px"
		this.game.view.style.height = window.innerHeight + "px"

	}

	init() {
		this.setupSignals()
		this.load()
	}

	draw() {}
	update() {}
	load() {}
}
