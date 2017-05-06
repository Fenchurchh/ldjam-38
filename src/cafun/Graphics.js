
let _images = new Map()

export default class Graphics {
	constructor(ctx) {
		this.ctx = ctx
	}

	newImage(src) {
		let image = new Image()
		image.onload = () => {
			console.info("loaded", src)
			_images.set(src, image)
		}

		image.error = err => {
			console.warn("Failed loading image", err)
		}

		image.src = src
		return image
	}

	draw(image, x, y) {
		this.ctx.drawImage(image, x, y)
	}

	entity(entity){
		if(entity.state.alpha){
			this.ctx.globalAlpha = entity.alpha
		}
		this.ctx.drawImage(entity.image, entity.x, entity.y)
		this.ctx.globalAlpha = 1
	}
}
