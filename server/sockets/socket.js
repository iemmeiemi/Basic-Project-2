const { Server } = require('socket.io');

const startServer = (httpServer) => {
    const io = new Server(httpServer, { cors: process.env.CLIENT_URL });

    const users = {};

    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('login', function (data) {
            console.log('a user ' + data.userId + ' connected');
            // saving userId to object with socket ID
            users[data.userId] = socket.id;
            console.log(users);
        });

        socket.on('sendMessage', ({ senderId, receiverId, mess }) => {
            console.log(senderId, receiverId, mess);
            socket.to(users[receiverId]).emit('getMessage', { senderId, receiverId, mess });
        });

        socket.on('disconnect', function (userId) {
            console.log('user ' + users[socket.id] + ' disconnected');
            delete users[userId];
        });
    });
};

module.exports = { startServer };
