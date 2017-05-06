import createPlanner from "l1-path-finder"
function hashPosition(xpos, ypos) {
	return xpos + "," + ypos
}

export { hashPosition }
export default class Grid {
	constructor({ width, height, socket, world, scale = 3 } = {}) {
		this.setSize({ width, height })
		this.tilesize = 16
		this.tilesizeX = 16
		this.tilesizeY = 12
		this.world = world
		this.socket = socket
		this.byPosition = new Map()
		this.socket.on("move", (data) => {
			if (!e) {
				console.warn("entity not found", data)
				e = world.newEntity(false, data.state, data.id)
				let posHash = hashPosition(e.state.xpos, e.state.ypos)
				this.byPosition.set(posHash, e)
			} else {
				let posHash = hashPosition(e.state.xpos, e.state.ypos)
				this.byPosition.delete(posHash, e)
				this.moveUnit(e, data.direction)
				this.byPosition.set(posHash, e)
			}
		})
	}

	getTileAtScreenCoord({ x, y }) {
		// console.log(x, y)
		let xpos = Math.floor(x / this.tilesizeX)
		let ypos = Math.floor(y / this.tilesizeY)
		x = Math.floor(xpos * this.tilesizeX)
		y = Math.floor(ypos * this.tilesizeY)

		let hash = hashPosition(xpos, ypos)
		let tile = this.maze.get(xpos, ypos)
		let unit = this.byPosition.get(hash)
		return { unit, xpos, ypos, hash, x, y, tile }
	}

	setMaze(maze) {
		this.path = createPlanner(maze)
		this.maze = maze
	}

	renderMazeToContainer(container) {
		let textureSand = PIXI.Texture.fromImage("img/tile-sand.png")
		let textureWater = PIXI.Texture.fromImage("img/tile-water.png")
			//Get array shape
		var nx = this.maze.shape[0],
			ny = this.maze.shape[1]

		//Loop over all cells
		for (var i = 1; i < nx - 1; ++i) {
			for (var j = 1; j < ny - 1; ++j) {
				let type = this.maze.get(i, j)
				let tile
				if (type === 0) {
					tile = new PIXI.Sprite(textureWater)
				} else {
					tile = new PIXI.Sprite(textureSand)
				}

				tile.x = i * this.tilesizeX
				tile.y = j * this.tilesizeY
				container.addChild(tile)
			}
		}

	}

	searchPath(x0, y0, x1, y1, path) {
		let length = this.path.search(x0, y0, x1, y1, path)
		return length
	}


	setSize({ width, height }) {
		this.width = width
		this.height = height
	}

	move(unit, direction) {
		if (!unit || !unit.id) throw ("Invalid Unit")
		let posHash = hashPosition(unit.state.xpos, unit.state.ypos)
		this.byPosition.delete(posHash, unit)
		this.moveUnit(unit, direction)
		this.sendMove(unit, direction)
		this.byPosition.set(posHash, unit)
	}

	moveUnit(unit, direction) {
		unit.tween({
			x: (unit.state.xpos + direction[0]) * this.tilesize,
			y: (unit.state.ypos + direction[1]) * this.tilesize
		})
		unit.setPosition(unit.state.xpos + direction[0], unit.state.ypos + direction[1])
	}

	sendMove(unit, direction) {
		this.socket.emit("move", { id: unit.id, direction, state: unit.state })
	}
}
