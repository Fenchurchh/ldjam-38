import Actor from "./Actor"

let marker


// PIXI.loader
// 	.add('required/assets/basics/fighter.json')
// 	.load(onAssetsLoaded);

// function onAssetsLoaded() {
// 	// create an array of textures from an image path
// 	var frames = [];

// 	for (var i = 0; i < 30; i++) {
// 		var val = i < 10 ? '0' + i : i;

// 		// magically works since the spritesheet was loaded with the pixi loader
// 		frames.push(PIXI.Texture.fromFrame('rollSequence00' + val + '.png'));
// 	}

// 	// create an AnimatedSprite (brings back memories from the days of Flash, right ?)
// 	var anim = new PIXI.extras.AnimatedSprite(frames);

// 	/*
// 	 * An AnimatedSprite inherits all the properties of a PIXI sprite
// 	 * so you can change its position, its anchor, mask it, etc
// 	 */
// 	anim.x = app.renderer.width / 2
// 	anim.y = app.renderer.height / 2
// 	anim.anchor.set(0.5)
// 	anim.animationSpeed = 0.5
// 	anim.play()
// }

export default class Gunman extends Actor {
	constructor({ world, src, state }) {
		super({ world, src, state })
		this.setState({
			target: null
		})

		marker = PIXI.Sprite.fromImage("img/marker.png")
		marker.alpha = 0.5
		world.game.stage.addChild(marker)
		console.log("Gunman::", this.state)
	}

	setTarget(target) {
		console.log("setting target", target)
		this.setState({ target })
	}

	attack() {
		console.log("e", this.world.entities)
		if (this.state.target) {
			console.log("attacking-target", this.state.target)
		}
		console.log("attacking")
	}
}
