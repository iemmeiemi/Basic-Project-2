const asyncHandler = require('express-async-handler');
const services = require('../services');
const pagi = require('../helps/pagination');

const checkUserId = (receiver, sender) => {
    if (sender === receiver) {
        throw new Error('Same userId Error!');
    }
    if (!receiver) {
        throw new Error('Error in Finding UserId!');
    }
};

const listFriend = asyncHandler(async (req, res) => {
    const { page, size, userId } = req.query;
    const { limit, offset } = pagi.getPagination(page, size);
    const pack = { page, limit, offset, userId };
    const response = await services.listFriend(pack, 'friends');
    return res.status(200).json(response);
});

//danh sách lời mời kết bạn
const listPendingToMe = asyncHandler(async (req, res) => {
    const { page, size } = req.query;
    const { id } = req.user.id;
    const { limit, offset } = pagi.getPagination(page, size);
    const pack = { page, limit, offset, id };
    const response = await services.listFriend(pack, 'pendingToMe');
    return res.status(200).json(response);
});

//danh sách người dùng mà user đã gửi kết bạn
const listMePending = asyncHandler(async (req, res) => {
    const { page, size } = req.query;
    const { id } = req.user.id;
    const { limit, offset } = pagi.getPagination(page, size);
    const pack = { page, limit, offset, id };
    const response = await services.listFriend(pack, 'mePending');
    return res.status(200).json(response);
});

/////////////////////////friend relationship and things////////////////////////
const friendsRecommend = asyncHandler(async (req, res) => {
    const response = await services.friendsRecommend();
    return res.status(200).json(response);
});

const addFriend = asyncHandler(async (req, res) => {
    const sender = req.user.id;
    const receiver = req.query.id;
    checkUserId(receiver, sender);

    const response = await services.addFriend(sender, receiver, 'sendAddFriend');
    return res.status(200).json(response);
});

const unSenAddFriend = asyncHandler(async (req, res) => {
    const sender = req.user.id;
    const receiver = req.query.id;
    checkUserId(receiver, sender);

    const response = await services.addFriend(sender, receiver, 'unSendAddFriend');
    return res.status(200).json(response);
});

const acceptAddFriend = asyncHandler(async (req, res) => {
    const sender = req.query.id;
    const receiver = req.user.id;
    checkUserId(receiver, sender);

    const response = await services.acceptAddFriend(receiver, sender);
    return res.status(200).json(response);
});

const unFriend = asyncHandler(async (req, res) => {
    const sender = req.query.id;
    const receiver = req.user.id;
    checkUserId(receiver, sender);

    const response = await services.unFriend(receiver, sender);
    return res.status(200).json(response);
});

/////////////////////////block and unblock/////////////////////////
const blockingUser = asyncHandler(async (req, res) => {
    const sender = req.query.id;
    const receiver = req.user.id;
    checkUserId(receiver, sender);

    const response = await services.blockingUser(receiver, sender, 'block');
    return res.status(200).json(response);
});

const unblockingUser = asyncHandler(async (req, res) => {
    const sender = req.query.id;
    const receiver = req.user.id;
    checkUserId(receiver, sender);

    const response = await services.blockingUser(receiver, sender, 'unblock');
    return res.status(200).json(response);
});

/////////////////////////follow and unfollow/////////////////////////
const following = asyncHandler(async (req, res) => {
    const sender = req.query.id;
    const receiver = req.user.id;
    checkUserId(receiver, sender);

    const response = await services.followingUser(receiver, sender, 'follow');
    return res.status(200).json(response);
});

const unfollowing = asyncHandler(async (req, res) => {
    const sender = req.query.id;
    const receiver = req.user.id;
    checkUserId(receiver, sender);

    const response = await services.followingUser(receiver, sender, 'unfollow');
    return res.status(200).json(response);
});

module.exports = {
    listFriend,
    listPendingToMe,
    listMePending,
    friendsRecommend,
    acceptAddFriend,
    addFriend,
    unSenAddFriend,
    unFriend,
    blockingUser,
    unblockingUser,
    following,
    unfollowing,
};
