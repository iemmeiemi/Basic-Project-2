const { getUser } = require('../services/userService');

const sendNotification = {
    addFriend: async ({ senderId, receiverId }) => {
        const senderInfo = await getUser(senderId);
        if (senderInfo) {
            const notify = {
                type: 'addFriend',
                senderId: senderInfo.data.id,
                senderName: senderInfo.data.fullName,
                senderAvatar: senderInfo.data.avatar,
                toUser: receiverId,
                isSeen: false,
                sendedAt: Date.now(),
            };
            // Lưu thông báo vào Redis
            __redis.zadd(`notify:${notify.toUser}`, -notify.sendedAt, JSON.stringify(notify), (error, reply) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log('Thông báo đã được thêm vào Sorted Set.');
                }
            });
            __usersConnections[receiverId].emit(`notification`, notify);
        }
    },
};

module.exports = sendNotification;
