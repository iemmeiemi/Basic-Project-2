const { Server } = require('socket.io');

const startServer = (httpServer) => {
    const io = new Server(httpServer, { cors: process.env.CLIENT_URL });
    global.__io = io;
    const usersConnections = {};
    global.__usersConnections = usersConnections;

    io.on('connection', (socket) => {
        console.log('a user connected', socket.id);

        socket.on('login', function (data) {
            console.log('a user ' + data.userId + ' connected');
            // saving userId to object with socket ID
            usersConnections[data.userId] = socket;

            // Lấy danh sách các thông báo theo thời gian thêm vào
            __redis.zrange(`notify:${data.userId}`, 0, -1, (error, reply) => {
                if (error) {
                    console.error(error);
                } else {
                    const notifications = reply.map((notification) => JSON.parse(notification));
                    socket.emit('notificationsStorage', notifications);
                }
            });
        });

        socket.on('seenNotification', (notification) => {
            __redis.zrem(`notify:${notification.toUser}`, JSON.stringify(notification), (error, reply) => {
                if (error) {
                    console.error(error);
                } else if (reply === 1) {
                    console.log(
                        `Giá trị '${notification.toUser}' đã được xóa khỏi Sorted Set '${notification.toUser}' thành công.`,
                    );
                } else {
                    console.log(
                        `Không tìm thấy giá trị '${notification.toUser}' trong Sorted Set '${notification.toUser}'.`,
                    );
                }
            });
            __redis.zrange(`notify:${notification.toUser}`, 0, -1, (error, reply) => {
                if (error) {
                    console.error(error);
                } else {
                    const notifications = reply.map((notification) => JSON.parse(notification));
                    usersConnections[notification.toUser].emit('notificationsStorage', notifications);
                }
            });
        });

        socket.on('sendMessage', ({ senderId, receiverId, mess }) => {
            console.log(senderId, receiverId, mess);
            socket.to(usersConnections[receiverId].id).emit('getMessage', { senderId, receiverId, mess });
        });

        socket.on('disconnect', function () {
            console.log('user ' + socket.id + ' disconnected');

            const disconnectedUserId = Object.keys(usersConnections).find((key) => usersConnections[key] === socket);

            delete usersConnections[disconnectedUserId];

            const keys = Object.keys(__usersConnections);
            console.log(keys);
            // delete usersConnections[userId];
        });
    });
};

module.exports = { startServer };
