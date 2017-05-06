var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var path = require('path')
var _ = require("lodash")

let rooms = new Map()

class Room {
	constructor({ io, id }) {
		console.log("server:room:created: " + id)
		this.io = io
		this.id = id
		this._turn = 0
		setInterval(() => { this.turn() }, 500)
	}

	turn() {
		this._turn += 1
		this.emit("turn", { ok: this._turn })
	}

	emit(event, msg) {
		// console.log(`room:${this.id} -> ${event}:${msg}`)
		this.io.to(this.id).emit(event, msg)
	}
}

app.get('/', (req, res) => {
	let publicPath = path.resolve(__dirname, '../public')
	res.sendFile(publicPath + '/index.html')
})

// app.get("/game/:room", (req, res) => {
// 	let room = new Room({ id: _.uniqueId("room_"), io: io })
// 	res.json({ room: room.id })
// })

// var nsp = io.of('/my-namespace');
// nsp.on('connection', function(socket){
//   console.log('someone connected');
// });
// nsp.emit('hi', 'everyone!');
let room = new Room({ id: "master", io: io })


io.on('connection', (socket) => {
	console.log(' user connected')
	socket.join(room.id)

	socket.on('disconnect', () => {
		console.log('user disconnected')
	})

	socket.on("msg", (data) => {
		console.info("msg", data)
	})

	socket.on("hey", (data) => {
		console.info("hey", data)
	})

	socket.on("move", (data) => {
		console.info("move", data)
		socket.broadcast.emit("move", data)
	})
})



http.listen(3000, () => {
	console.log('listening on *:3000')
})
