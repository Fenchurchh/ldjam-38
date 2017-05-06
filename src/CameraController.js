export default class CameraController {
	constructor(cafun) {
		cafun.input.key.bind("up", () => cafun.camera.moveRelative(0, -10))
		cafun.input.key.bind("right", () => cafun.camera.moveRelative(10, 0))
		cafun.input.key.bind("down", () => cafun.camera.moveRelative(0, 10))
		cafun.input.key.bind("left", () => cafun.camera.moveRelative(-10, 0))
	}
}
