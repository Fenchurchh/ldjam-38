
import BaseActor from "./BaseActor"

class DefaultBehaviour{
	constructor({world, actor}){}
	act(){}
}


export default class Actor extends BaseActor {
	constructor({ src, world, state }) {
		super({ src, world, state })
		this.state = Object.assign(this.state, {
			health: 10,
			morale: 10
		})
		this.world = world
		this.behaviour = new DefaultBehaviour({world,actor: this})
		// this.addUi()
		window.lastSprite = this
	}

	act(){
		this.behaviour.act()
	}

	tick() {
		if (this.xpos !== this.currentGoal[0] && this.ypos !== this.currentGoal[1]) {
			this.currentGoal = false
			this.navigateNextSection()
		}

		console.log("tick")
		this.act()

		if (this.currentGoal) {
			console.log("moving towards current goal")
		}
	}

	moveTowards([x, y]) {}

}

