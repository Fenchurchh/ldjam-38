import Cafun from "./cafun/Cafun"
const cafun = new Cafun()
const game = cafun.game
const grid = cafun.grid
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST; // scale ALL textures pixelated
export default game
export {cafun, grid}

