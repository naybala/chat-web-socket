const express = require('express');
const socket = require('socket.io');

// app set up
const app = express();

// server set up
let server = app.listen(5000, () => {
    console.log("Server is running localhost 5000");
})
app.get('/', (res, req) => {
    req.sendFile(__dirname + '/index.html');
})

// socket set up
const io = socket(server);
io.on('connection', (socket) => {
    //receive data from index script
    socket.on('chat', (data) => {
        //send data to index script
        io.sockets.emit('chat', data);
    })
    //send typing data to index script
    socket.on('typing', (name) => {
        socket.broadcast.emit('typing', name);
    });
})