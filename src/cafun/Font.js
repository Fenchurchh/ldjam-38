let hudElements = []
let $hud

class FontElement {
	constructor({ text, style, target, camera }) {
		console.info("new font", this)
		this.target = target
		this.camera = camera
		this.$el = document.createElement("div")
		this.$el.innerText = text
		if (style) Object.assign(this.$el.style, style)
		$hud.$element.appendChild(this.$el)
		if (target) this.syncPosition(target)
		hudElements.push(this)
	}

	syncPosition(scale) {
		// this.camera.worldToScreen(this.target.state.x, this.target.state.y, this)
		this.$el.style.transform = `translate(${this.target.x*scale}px, ${this.target.y*scale}px)`
	}
}

let defaultStyle = {
	color: "#232323",
	fontSize: "14px",
	pointerEvents: "none",
	fontFamily: "Open Sans, sans-serif",
	textTransform: "uppercase"
}

export default class Font {
	constructor({ scale = 3, style, camera, updated }) {
		console.log("new $hud")
		this.camera = camera
		this.scale = scale
		this.updated = updated
		this.setStyle(style)
		this.$element = document.createElement("div")
		this.$element.style.position = "absolute"
		this.$element.style.zIndex = 9999
		this.$element.classList.add("hud")
		Object.assign(this.$element.style, defaultStyle)
		let $body = document.querySelector("body")
		$body.appendChild(this.$element)
		$hud = this
	}

	update(){
		hudElements.forEach( element => element.syncPosition(this.scale) )
	}

	setStyle(style) {
		this.style = style
	}
}


export {FontElement}