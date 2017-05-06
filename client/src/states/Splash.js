import Phaser from 'phaser'
import {centerGameObjects} from '../utils'




export default class extends Phaser.State {
   init() {}

   preload() {
      this.loaderBg  = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
      this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
      centerGameObjects([
         this.loaderBg,
         this.loaderBar
      ])

      this.load.setPreloadSprite(this.loaderBar)
      //
      // load your assets
      //
      this.load.image('mushroom', 'assets/images/mushroom2.png')
      this.load.image('tiles-outer', 'assets/levels/tiles-outer.png')
      this.load.image('tiles-items', 'assets/levels/tiles-items.png')
      this.load.image('tiles-terrain', 'assets/levels/tiles-terrain.png')
      this.load.tilemap('demo-level', 'assets/levels/map-lab.json', null, Phaser.Tilemap.TILED_JSON)

   }

   create() {
      this.state.start('Game')
   }
}
