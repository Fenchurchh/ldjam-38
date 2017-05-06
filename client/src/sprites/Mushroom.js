import Phaser from 'phaser'


class Behaviour {
   constructor(sprite) {
      this.sprite = sprite
      let tween   = game.add.tween(sprite).to({y: 500}, 520, Phaser.Easing.Elastic.Out, true);
   }

   moveUp() {
      let {sprite} = this
      game.add.tween(sprite).to({y: sprite.y - 16}, 520, Phaser.Easing.Elastic.Out, true)
   }

   moveRight() {
      let {sprite} = this
      game.add.tween(sprite).to({x: sprite.x + 16}, 520, Phaser.Easing.Elastic.Out, true)
   }

   moveDown() {
      let {sprite} = this
      game.add.tween(sprite).to({y: sprite.y + 16}, 520, Phaser.Easing.Elastic.Out, true)
   }

   moveLeft() {
      let {sprite} = this
      game.add.tween(sprite).to({x: sprite.x - 16}, 520, Phaser.Easing.Elastic.Out, true)
   }
}


export default class extends Phaser.Sprite {
   constructor({game, x, y, asset}) {
      super(game, x, y, asset)
      this.anchor.setTo(0.5)
      this.scale.setTo(0.5)
      this.behaviour = new Behaviour(this)
   }

   update() {
      // this.angle += 1
   }
}
