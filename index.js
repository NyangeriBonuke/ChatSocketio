const express = require('express')
const { createServer } = require('http')
const { join } = require('path')
const { Server } = require('socket.io')
require('dotenv').config()

const app = express()
const server = createServer(app)
const io = new Server(server)

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'))
})

app.get('/home', (req, res) => {
    res.sendFile(join(__dirname, 'app.html'))
})

io.on('connection', (socket) => {
    socket.on('chat-message', (msg) => {
        io.emit('chat-message', msg)
    })
})

server.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
})