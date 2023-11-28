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

const listFriend = asyncHandler(async (req, res) => {
    const { page, size, userId } = req.query;
    const { limit, offset } = pagi.getPagination(page, size);
    const pack = { page, limit, offset, userId };
    const response = await services.listFriend(pack);
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
    const sender = req.user.id;
    const receiver = req.body.receiver;
    checkUserId(receiver, sender);
    //userId1 sẽ nhỏ hơn userId2
    let userId1 = +sender;
    let userId2 = +receiver;
    let friend = friendEnum.pd_st_nd;
    let follow = followEnum.st_fl_nd;
    if (+sender > +receiver) {
        userId1 = +receiver;
        userId2 = +sender;
        friend = friendEnum.pd_nd_st;
        follow = followEnum.nd_fl_st;
    }
    const response = await services.addFriend2({ userId1, userId2, friend, follow });
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
    friendsRecommend,
    acceptAddFriend,
    addFriend,
    addFriend2,
    unSenAddFriend,
    unFriend,
    blockingUser,
    unblockingUser,
    following,
    unfollowing,
};
