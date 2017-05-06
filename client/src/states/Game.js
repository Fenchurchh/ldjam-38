/* globals  __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'

const world = {}

function setupTilemap() {
   let tilemap
   let tileset = "outer"
   tilemap     = game.add.tilemap('demo-level')
   tilemap.addTilesetImage("outer", 'tiles-outer')
   tilemap.addTilesetImage("tiles-items", 'tiles-items')
   tilemap.addTilesetImage("Terrain", 'tiles-terrain')
   let layer_0 = tilemap.createLayer('T0')
   let layer_1 = tilemap.createLayer('T1')
   let layer_2 = tilemap.createLayer('T2')
   let layer_3 = tilemap.createLayer('T3')
   let layer_4 = tilemap.createLayer('T4')
   //  This resizes the game world to match the layer dimensions
   layer_0.resizeWorld()

}

let player
let cursors

export default class extends Phaser.State {
   init() {}

   preload() {}

   create() {
      setupTilemap(this.game)

      // const bannerText = 'Phaser + ES6 + Webpack'
      // let banner       = this.add.text(this.world.centerX, this.game.height - 80, bannerText)
      //
      // banner.font      = 'Bangers'
      // banner.padding.set(10, 16)
      // banner.fontSize = 40
      // banner.fill     = '#77BFA3'
      // banner.smoothed = false
      // banner.anchor.setTo(0.5)

      cursors = game.input.keyboard.createCursorKeys();

      window.player = player = new Mushroom({
         game:  this,
         x:     this.world.centerX,
         y:     this.world.centerY,
         asset: 'mushroom'
      })
      game.camera.follow(player)

      this.game.add.existing(player)
   }

   update() {

      if (cursors.up.isDown) {
         player.behaviour.moveUp(300)
      }
      else if (cursors.down.isDown) {
         player.behaviour.moveDown(300);
      }

      if (cursors.left.isDown) {
         player.behaviour.moveLeft(300)
      }
      else if (cursors.right.isDown) {
         player.behaviour.moveRight(300);
      }
   }

   render() {
      if (__DEV__) {
         this.game.debug.spriteInfo(player, 32, 32)
      }
   }
}
