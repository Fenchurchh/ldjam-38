import { FontElement } from "../cafun/Font"
import { hashPosition } from "../cafun/Grid"
import game, { cafun, grid } from "../game"



export default class BaseActor extends PIXI.Sprite {
	constructor({ src, world, state = {} }) {
		let texture = PIXI.Texture.fromImage(src)
		super(texture)
		this.shadow = PIXI.Sprite.fromImage("img/shadow.png")
		this.addChild(this.shadow)
		this.shadow.y = -7
		this.anchor.set(0, 0.5)
		this.grid = world.grid
		this.state = state
		this.xpos = this.state.xpos || 0
		this.ypos = this.state.ypos || 0

		game.stage.addChild(this)
	}

	setState(state) {
		this.state = Object.assign(this.state, state)
	}

	setMoveTarget(tile) {
		this.pathIndex = 0
		this.path = []
		this.distance = this.grid.searchPath(this.state.xpos, this.state.ypos, tile.xpos, tile.ypos, this.path)
			// TODO Handle invalid paths
		this.navigateNextSection()
	}

	navigateNextSection() {
		if (this.path.length > 2) {
			this.currentGoal = [this.path.unshift(), this.path.unshift()]
		} else {
			console.warn("arrived at goal")
		}
	}


	addUi() {
		let uiElement = new FontElement({
			text: "",
			target: this
		})
		this.ui = uiElement
	}

	move(direction) {
		if (direction[0] !== 0) this.xpos += direction[0]
		if (direction[1] !== 0) this.ypos += direction[1]
	}

	deletePosition() {
		let hash = hashPosition(this.state.xpos, this.state.ypos)
		this.grid.byPosition.delete(hash)
	}

	savePosition() {
		let hash = hashPosition(this.state.xpos, this.state.ypos)
		this.grid.byPosition.set(hash, this)
	}

	set xpos(value) {
		this.deletePosition()
		this.state.xpos = value
		this.x = value * this.grid.tilesizeX
		this.savePosition()
	}

	set ypos(value) {
		this.deletePosition()
		this.state.ypos = value
		this.y = value * this.grid.tilesizeY
		this.savePosition()
	}

	get ypos() {
		return this.state.ypos
	}

	get xpos() {
		return this.state.xpos
	}
}
