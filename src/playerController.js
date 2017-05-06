import { TOP, RIGHT, BOTTOM, LEFT } from "./cafun/directions"

const playerController = function({world, player}) {
	let {cafun} = world

	// not yet implemented
	cafun.input.key.bind("a", () => {
		// console.log("a")
		player.move(LEFT)
	})

	cafun.input.key.bind("d", () => {
		// console.log("d")
		player.move(RIGHT)
	})

	cafun.input.key.bind("w", () => {
		// console.log("w")
		player.move(TOP)
	})

	cafun.input.key.bind("s", () => {
		// console.log("s")
		player.move(BOTTOM)
	})

	cafun.input.key.bind("space", () => {
		player.attack()
	})

	cafun.tileClicked.add(tile => {
		// console.log("pc -> moving")
		if (tile && tile.unit) {
			player.setTarget(tile.unit)
		}

		if( tile && !tile.unit){
			player.setMoveTarget(tile)
		}
	})
}

export default playerController
