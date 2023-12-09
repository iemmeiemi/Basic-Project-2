const asyncHandler = require('express-async-handler');
const services = require('../services');
const pagi = require('../helps/pagination');

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

const checkUserId = (receiver, sender) => {
    if (sender === receiver) {
        throw new Error('Same userId Error!');
    }
    if (!receiver) {
        throw new Error('Error in Finding UserId!');
    }
};

const getCheckUserRela = asyncHandler(async (req, res) => {
    let userId1 = req.user.id;
    let userId2 = req.query.id;
    let isUser = true;
    if (!userId1 || !userId2) throw new Error('Missing inputs');
    if (userId1 == userId2) throw new Error('Same userId Error!');
    if (userId1 > userId2) {
        let temp = +userId1;
        userId1 = +userId2;
        userId2 = temp;
        isUser = false;
    }
    const response = await services.getCheckUserRela({ userId1, userId2, isUser });
    return res.status(200).json(response);
});

const listFriend = asyncHandler(async (req, res) => {
    const { page, size, userId } = req.query;
    const { limit, offset } = pagi.getPagination(page, size);
    const pack = { page, limit, offset, userId };
    const response = await services.listFriend(pack, 'friends');
    return res.status(200).json(response);
});

const listFriend2 = asyncHandler(async (req, res) => {
    const { page, size, userId } = req.query;
    const {pagination, offset} = pagi.getPagination(page, size);
    const response = await services.listFriend2({ page, userId, pagination, offset });
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
    const receiver = req.body.receiver;
    checkUserId(receiver, sender);

    const response = await services.addFriend(sender, receiver, 'sendAddFriend');
    return res.status(200).json(response);
});

const addFriend2 = asyncHandler(async (req, res) => {
    let userId1 = req.user.id;
    let userId2 = req.query.id;
    if (!userId1 || !userId2) throw new Error('Missing inputs');
    if (userId1 == userId2) throw new Error('Same userId Error!');
    let isUser = true;
    //userId1 sẽ nhỏ hơn userId2
    let friend = friendEnum.pd_st_nd;
    let follow = followEnum.st_fl_nd;
    if (userId1 > userId2) {
        let tmp = userId1;
        userId1 = userId2;
        userId2 = tmp;
        friend = friendEnum.pd_nd_st;
        follow = followEnum.nd_fl_st;
        isUser = false;
    }
    const response = await services.addFriend2({ userId1, userId2, isUser, friend, follow });
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

const followUser = asyncHandler(async (req, res) => {
    let userId1 = req.user.id;
    let userId2 = req.query.id;
    if (!userId1 || !userId2) throw new Error('Missing inputs');
    if (userId1 == userId2) throw new Error('Same userId Error!');
    //userId1 sẽ nhỏ hơn userId2
    let follow = followEnum.st_fl_nd;
    if (userId1 > userId2) {
        let tmp = userId1;
        userId1 = userId2;
        userId2 = tmp;
        follow = followEnum.nd_fl_st;
    }
    const response = await services.followUser({ userId1, userId2, follow });
    return res.status(200).json(response);
});

const unfollowing = asyncHandler(async (req, res) => {
    const sender = req.query.id;
    const receiver = req.user.id;
    checkUserId(receiver, sender);

    const response = await services.followingUser(receiver, sender, 'unfollow');
    return res.status(200).json(response);
});

const unfollowUser = asyncHandler(async (req, res) => {
    let userId1 = req.user.id;
    let userId2 = req.query.id;
    let isUser = true;
    if (!userId1 || !userId2) throw new Error('Missing inputs');
    if (userId1 == userId2) throw new Error('Same userId Error!');
    if (userId1 > userId2) {
        let temp = +userId1;
        userId1 = +userId2;
        userId2 = temp;
        isUser = false;
    }
    const response = await services.unfollowUser({ userId1, userId2, isUser });
    return res.status(200).json(response);
});

module.exports = {
    listFriend,
    listFriend2,
    listPendingToMe,
    listMePending,
    friendsRecommend,
    acceptAddFriend,
    addFriend,
    addFriend2,
    unSenAddFriend,
    unFriend,
    blockingUser,
    unblockingUser,
    following,
    followUser,
    unfollowing,
    unfollowUser,
    getCheckUserRela,
};
