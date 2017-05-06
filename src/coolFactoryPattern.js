class Factory {
	update() {
		let n = 300
		while (n--) {
			this.legs = this.legs + 1
			this.legsNative = this.legsNative + 1
		}
	}

	static mouse() {
		return Object.assign(new Factory, {
			legs: 4,
		})
	}
}

let animal = {
	legsNative: 0,
	update() {
		let n = 300
		while (n--) {
			this.legs = this.legs + 1
			this.legsNative = this.legsNative + 1
		}
	}
};

let mouseFactory = function mouseFactory() {
	return Object.assign(Object.create(animal), {
		legs: 4
	})
}


class AnimalClass {
	constructor() {
		this.legsNative = 0
	}

	update() {
		let n = 300
		while (n--) {
			this.legs = this.legs + 1
			this.legsNative = this.legsNative + 1
		}
	}
}

class MouseClass extends AnimalClass {
	constructor() {
		super()
		this.legs = 4
	}
}


function Mouse() {
	this.legs = 4
}

// Mouse.prototype.update = function() {
// 	let n = 300
// 	while (n--) {
// 		this.legs = this.legs + 1
// 		this.legsNative = this.legsNative + 1
// 	}
// }

// Mouse.prototype.describe = function() {
// 	return `An ${this.animalType} with ${this.furColor} fur,
//         ${this.legs} legs, and a ${this.tail} tail.`;
// }

// Mouse.prototype.profession = function() {
// 		return this.secret;
// }
Mouse.prototype.update = function() {
	let n = 300
	while (n--) {
		this.legs = this.legs + 1
		this.legsNative = this.legsNative + 1
	}

}
