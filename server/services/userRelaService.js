const { Op, Sequelize } = require('sequelize');
const pagi = require('../helps/pagination');
const { UserRelationship, User } = require('../models');
const sendNotification = require('../utils/sendNotification');

const friendEnum = {
    pd_st_nd: 'pending_st_nd',
    pd_nd_st: 'pending_nd_st',
    fr: 'friends',
    bl_st_nd: 'block_st_nd',
    bl_nd_st: 'block_nd_st',
    bl_b: 'block_both',
};

const followEnum = {
    st_fl_nd: 'st_fl_nd',
    nd_fl_st: 'nd_fl_st',
    fl_b: 'fl_both',
};

const find_or_create = async (id1, id2) => {
    const userRela = await UserRelationship.findOrCreate({
        where: {
            [Op.or]: [
                { userId1: id1, userId2: id2 },
                { userId1: id2, userId2: id1 },
            ],
        },

        defaults: {
            userId1: id1,
            userId2: id2,
        },
    });

    return userRela;
};

const updateUserRela = async (receiver, sender, friend, follow) => {
    let response;
    if (friend == null && follow == null) {
        response = await UserRelationship.destroy({
            where: {
                [Op.or]: [
                    { userId1: receiver, userId2: sender },
                    { userId1: sender, userId2: receiver },
                ],
            },
        });
    } else {
        response = await UserRelationship.update(
            { friend, follow },
            {
                where: {
                    [Op.or]: [
                        { userId1: receiver, userId2: sender },
                        { userId1: sender, userId2: receiver },
                    ],
                },
            },
        );
    }

    return response;
};

/*Function to use*/

/************  *************/

const getCheckUserRela = async ({ userId1, userId2, isUser }) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await UserRelationship.findOne({
                where: {
                    userId1,
                    userId2,
                },
            });
            let friend, follow;
            if (response) {
                switch (response.dataValues.friend) {
                    case friendEnum.pd_st_nd:
                        friend = isUser ? 'pending' : 'waiting';
                        break;
                    case friendEnum.pd_nd_st:
                        friend = isUser ? 'waiting' : 'pending';
                        break;
                    case friendEnum.fr:
                        friend = 'friend';
                        break;
                    case friendEnum.bl_st_nd:
                        if (isUser) friend = 'blocking';
                        break;
                    case friendEnum.bl_nd_st:
                        if (!isUser) friend = 'blocking';
                        break;
                    case friendEnum.bl_b:
                        friend = 'blocking';
                        break;
                    default:
                        break;
                }
                switch (response.dataValues.follow) {
                    case followEnum.st_fl_nd:
                        if (isUser) follow = 'follow';
                        break;
                    case followEnum.nd_fl_st:
                        if (!isUser) follow = 'follow';
                        break;
                    case followEnum.fl_b:
                        follow = 'follow';
                        break;
                    default:
                        break;
                }
            }
            resolve({
                success: !!response,
                mes: response ? 'Successfully' : 'Cannot send',
                data: { friend, follow },
            });
        } catch (error) {
            reject(error);
        }
    });

//pagination, filter, sort, limit
//list friend, list pending
const listFriend = async (pack, job) =>
    new Promise(async (resolve, reject) => {
        try {
            let whereClause;
            switch (job) {
                case 'friends':
                    whereClause = {
                        where: {
                            [Op.and]: [
                                { [Op.or]: [{ userId1: pack.userId }, { userId2: pack.userId }] },
                                {
                                    friend: friendEnum.fr,
                                },
                            ],
                        },
                    };
                    break;

                case 'pendingToMe':
                    whereClause = {
                        where: {
                            [Op.or]: [
                                {
                                    [Op.and]: [{ userId1: pack.userId }, { friend: friendEnum.pd_nd_st }],
                                },
                                {
                                    [Op.and]: [{ userId2: pack.userId }, { friend: friendEnum.pd_st_nd }],
                                },
                            ],
                        },
                    };
                    break;

                case 'mePending':
                    whereClause = {
                        where: {
                            [Op.and]: [
                                {
                                    [Op.and]: [{ userId1: pack.userId }, { friend: friendEnum.pd_st_nd }],
                                },
                                {
                                    [Op.and]: [{ userId2: pack.userId }, { friend: friendEnum.pd_nd_st }],
                                },
                            ],
                        },
                    };
                    break;

                default:
                    break;
            }
            const response = await UserRelationship.findAndCountAll({
                ...whereClause,
                limit: pack.limit,
                offset: pack.offset,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    })
        .then(async (data) => {
            try {
                const res = await pagi.getPagingData(data, pack.page, pack.limit);
                return {
                    success: !!res,
                    mes: res ? '' : 'Cannot get the data!',
                    data: res,
                };
            } catch (error) {
                throw new Error('Cannot get Data!');
            }
        })
        .catch((error) => {
            return new Error('Cannot get Data!');
        });

const listFriend2 = ({ userId, pagination }) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await UserRelationship.findAll({
                include: [
                    {
                        model: User,
                        as: 'user1',
                        attributes: {
                            exclude: [
                                'password',
                                'passwordChangedAt',
                                'passwordResetExprides',
                                'passwordResetToken',
                                'refreshToken',
                                'interestedUsers',
                            ],
                        },
                    },
                    {
                        model: User,
                        as: 'user2',
                        attributes: {
                            exclude: [
                                'password',
                                'passwordChangedAt',
                                'passwordResetExprides',
                                'passwordResetToken',
                                'refreshToken',
                                'interestedUsers',
                            ],
                        },
                    },
                ],
                where: {
                    [Op.or]: [{ userId1: userId }, { userId2: userId }],
                    friend: 'friends',
                },
                attributes: {
                    exclude: ['userId1', 'userId2', 'friend', 'follow', 'createdAt', 'updatedAt'],
                },
                ...pagination,
            });
            const data = response.map((el) => {
                if (el.dataValues.user1.id == userId) return el.dataValues.user2;
                else return el.dataValues.user1;
            });
            resolve({
                success: !!response,
                mes: response ? 'succesfully!' : 'unsuccessfully!',
                data: data,
            });
        } catch (error) {
            reject(error);
        }
    });

// const getUserIdFollowAndRela = ({ userId, pagination }) =>
//     new Promise(async (resolve, reject) => {
//         try {
//             const response = await UserRelationship.findAll({
//                 where: {
//                     [Op.or]: [
//                         {
//                             userId1: userId,
//                             follow: {
//                                 [Op.or]: [followEnum.fl_b, followEnum.st_fl_nd],
//                             },
//                         },
//                         {
//                             userId2: userId,
//                             follow: {
//                                 [Op.or]: [followEnum.fl_b, followEnum.nd_fl_st],
//                             },
//                         },
//                     ],
//                 },
//                 attributes: {
//                     exclude: ['createdAt', 'updatedAt'],
//                 },
//                 ...pagination,
//             });
//             const data = response.map((el) => {
//                 if (el.dataValues.user1.id == userId) {
//                     const { userId1, ...data } = el.dataValues;
//                     return data;
//                 } else {
//                     const { userId2, ...data } = el.dataValues;
//                     return data;
//                 }
//             });
//             resolve({
//                 success: !!response,
//                 mes: response ? 'succesfully!' : 'unsuccessfully!',
//                 data: data,
//             });
//         } catch (error) {
//             reject(error);
//         }
//     });

const findingUser = (name) =>
    new Promise(async (resolve, reject) => {
        try {
        } catch (error) {
            reject(error);
        }
    });

/************  *************/
const friendsRecommend = (userID) =>
    new Promise(async (resolve, reject) => {
        try {
        } catch (error) {
            reject(error);
        }
    });

//send add friend invitation and unsend add friend invitation
const addFriend = (receiver, sender, job) =>
    new Promise(async (resolve, reject) => {
        try {
            const userRela = await find_or_create(receiver, sender);
            let follow = userRela.follow,
                friend = userRela.friend;
            const id1 = userRela.userId1;
            let mess;

            switch (job) {
                case 'sendAddFriend':
                    {
                        mess = 'Send Add Friend Invitation ';
                        if (id1 === sender) {
                            friend = friendEnum.pd_st_nd;
                            if (follow === followEnum.fl_b || follow === followEnum.nd_fl_st) {
                                follow = followEnum.fl_b;
                            } else {
                                follow = followEnum.st_fl_nd;
                            }
                        } else {
                            friend = friendEnum.pd_nd_st;
                            if (follow === followEnum.fl_b || follow === followEnum.st_fl_nd) {
                                follow = followEnum.fl_b;
                            } else {
                                follow = followEnum.nd_fl_st;
                            }
                        }
                    }
                    break;

                case 'unSendAddFriend':
                    {
                        mess = 'Unsend Add Friend Invitation ';
                        friend = null;
                        if (id1 === sender) {
                            if (follow === followEnum.fl_b || follow === followEnum.nd_fl_st) {
                                follow = followEnum.nd_fl_st;
                            } else {
                                follow = null;
                            }
                        } else {
                            if (follow === followEnum.fl_b || follow === followEnum.st_fl_nd) {
                                follow = followEnum.st_fl_nd;
                            } else {
                                follow = null;
                            }
                        }
                    }
                    break;

                default:
                    break;
            }

            const response = await updateUserRela(receiver, sender, friend, follow);
            resolve({
                success: !!(response > 0),
                mes: response > 0 ? mess + 'succesfully!' : 'unsuccessfully!',
            });
        } catch (error) {
            reject(error);
        }
    });

const addFriend2 = ({ userId1, userId2, isUser, ...data }) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await UserRelationship.findOrCreate({
                where: { userId1, userId2 },
                defaults: {
                    userId1,
                    userId2,
                    ...data,
                },
            });
            if (!response[1]) {
                const response2 = await UserRelationship.update(
                    {
                        userId1,
                        userId2,
                        ...data,
                    },
                    {
                        where: { userId1, userId2 },
                    },
                );
                resolve({
                    success: !!response2,
                    mes: response2 ? 'Successfully' : 'Cannot send',
                });
            }
            const senderId = isUser ? userId1 : userId2;
            const receiverId = isUser ? userId2 : userId1;
            sendNotification.addFriend({ senderId, receiverId });
            resolve({
                success: response[1],
                mes: response[1] ? 'Successfully' : 'Cannot send',
            });
        } catch (error) {
            reject(error);
        }
    });

/************  *************/
const acceptAddFriend = (receiver, sender) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await UserRelationship.update(
                { friend: 'friends', follow: 'fl_both' },
                {
                    where: {
                        [Op.or]: [
                            {
                                userId1: receiver,
                                userId2: sender,
                            },
                            {
                                userId1: sender,
                                userId2: receiver,
                            },
                        ],
                    },
                },
            );

            resolve({
                success: !!(response > 0),
                mes: response > 0 ? 'Accepted AddFriend Invitation!' : 'Cannot accept due to some error!',
            });
        } catch (error) {
            reject(error);
        }
    });

//unfriend
const unFriend = (receiver, sender) =>
    new Promise(async (resolve, reject) => {
        try {
            const userRela = await find_or_create(sender, receiver); //chỉnh lại sau
            if (!userRela) {
                throw new Error('You guys are not Friend!');
            }

            let follow = userRela.follow;
            const friend = null;
            const id1 = userRela.userId1;

            //taoj ham
            if (id1 === sender && (follow === followEnum.fl_b || follow === followEnum.nd_fl_st)) {
                follow = followEnum.nd_fl_st;
            } else if (id1 === receiver && (follow === followEnum.fl_b || follow === followEnum.st_fl_nd)) {
                follow = followEnum.st_fl_nd;
            } else {
                follow = null;
            }

            const response = await updateUserRela(receiver, sender, friend, follow);

            resolve({
                success: !!(response > 0),
                mes: response > 0 ? 'Unfriend successfully!' : 'Unfriend unsuccessfully!',
            });
        } catch (error) {
            reject(error);
        }
    });

//blocking and unblocking user
const blockingUser = (receiver, sender, job) =>
    new Promise(async (resolve, reject) => {
        try {
            const userRela = await find_or_create(receiver, sender);
            const id1 = userRela.userId1;
            let follow = null,
                friend,
                mess;
            switch (job) {
                case 'block':
                    mess = 'Block ';
                    if (id1 === sender) {
                        friend = friendEnum.bl_st_nd;
                    } else {
                        friend = friendEnum.bl_nd_st;
                    }
                    break;

                case 'unblock':
                    mess = 'Unblock ';
                    friend = null;
                    break;
            }

            const response = await updateUserRela(receiver, sender, friend, follow);

            resolve({
                success: !!(response > 0),
                mes: response > 0 ? mess + 'successfully!' : mess + 'unsuccessfully!',
            });
        } catch (error) {
            reject(error);
        }
    });

//follow and unfollow
const followingUser = (receiver, sender, job) =>
    new Promise(async (resolve, reject) => {
        try {
            const userRela = await find_or_create(receiver, sender);
            let follow = userRela.follow,
                friend = userRela.friend;
            const id1 = userRela.userId1;
            switch (job) {
                case 'follow':
                    {
                        mess = 'Follow';
                        follow =
                            id1 === sender
                                ? follow === followEnum.fl_b || follow === followEnum.nd_fl_st
                                    ? followEnum.fl_b
                                    : followEnum.st_fl_nd
                                : follow === followEnum.fl_b || follow === followEnum.st_fl_nd
                                ? followEnum.fl_b
                                : followEnum.nd_fl_st;
                    }
                    break;

                case 'unfollow':
                    {
                        mess = 'Unfollow ';
                        follow =
                            id1 === sender
                                ? follow == null || follow === followEnum.st_fl_nd
                                    ? null
                                    : followEnum.nd_fl_st
                                : follow == null || follow === followEnum.nd_fl_st
                                ? null
                                : followEnum.st_fl_nd;
                    }
                    break;

                default:
                    break;
            }

            const response = await updateUserRela(receiver, sender, friend, follow);

            resolve({
                success: !!(response > 0),
                mes: response > 0 ? mess + 'successfully!' : 'unsuccessfully!',
            });
        } catch (error) {
            reject(error);
        }
    });

const followUser = ({ userId1, userId2, isUser, follow }) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await UserRelationship.findOrCreate({
                where: { userId1, userId2 },
                defaults: {
                    userId1,
                    userId2,
                    follow,
                },
            });
            if (!response[1]) {
                if (response[0].dataValues.follow === followEnum.nd_fl_st) follow = followEnum.fl_b;
                const response2 = await UserRelationship.update(
                    {
                        userId1,
                        userId2,
                        follow,
                    },
                    {
                        where: { userId1, userId2 },
                    },
                );
                resolve({
                    success: !!response2,
                    mes: response2 ? 'Successfully' : 'Cannot send',
                });
            }

            resolve({
                success: response[1],
                mes: response[1] ? 'Successfully' : 'Cannot send',
            });
        } catch (error) {
            reject(error);
        }
    });

const unfollowUser = async ({ userId1, userId2, isUser }) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await UserRelationship.findOne({
                where: {
                    userId1,
                    userId2,
                },
            });
            let friend, follow;
            if (response) {
                friend = response.dataValues.friend;
                switch (response.dataValues.follow) {
                    case followEnum.st_fl_nd:
                        if (isUser) follow = null;
                        break;
                    case followEnum.nd_fl_st:
                        if (!isUser) follow = null;
                        break;
                    case followEnum.fl_b:
                        follow = followEnum.nd_fl_st;
                        if (!isUser) follow = followEnum.st_fl_nd;
                        break;
                    default:
                        break;
                }
                if (!friend && !follow) {
                    const response2 = await UserRelationship.destroy({
                        where: {
                            userId1,
                            userId2,
                        },
                    });
                    resolve({
                        success: !!response2,
                        mes: response2 ? 'Successfully' : 'Cannot unfollow',
                    });
                }
                const response2 = await UserRelationship.update(
                    {
                        follow,
                    },
                    {
                        where: {
                            userId1,
                            userId2,
                        },
                    },
                );
                resolve({
                    success: !!response2,
                    mes: response2 ? 'Successfully' : 'Cannot unfollow',
                });
            }
            resolve({
                success: !!response,
                mes: response ? 'Successfully' : 'Cannot unfollow',
            });
        } catch (error) {
            reject(error);
        }
    });

module.exports = {
    listFriend,
    listFriend2,
    friendsRecommend,
    findingUser,
    addFriend,
    addFriend2,
    acceptAddFriend,
    unFriend,
    blockingUser,
    followingUser,
    followUser,
    unfollowUser,
    getCheckUserRela,
};
