const asyncHandler = require('express-async-handler');
const services = require('../services');
//const joi_schema = require('../helps/joi_schema');
const pagi = require('../helps/pagination');

//all post & pagination, sort, limit
const getAllPostOfUser = asyncHandler(async (req, res) => {
    const { page, size, userId } = req.query;
    const otherId = req.user.id;
    if (!userId) throw new Error('Missing inputs');
    const { pagination } = pagi.getPagination(page, size);
    let response;
    if (userId == otherId) response = await services.getAllPostOfUser2({ userId, pagination, page });
    else response = await services.getAllPostOfUserByOther({ userId, otherId, pagination, page });
    return res.status(200).json(response);
});

const getAllPostOfUserByPublish = asyncHandler(async (req, res) => {
    const { page, size, userId } = req.query;
    if (!userId) throw new Error('Missing inputs');
    const { pagination } = pagi.getPagination(page, size);
    let response = await services.getAllPostOfUserByPublish({ userId, pagination });
    return res.status(200).json(response);
});

const getAllPostNewAndInterest = asyncHandler(async (req, res) => {
    const { page, size } = req.query;
    const userId = req.user.id;
    if (!userId) throw new Error('Missing inputs');
    const { pagination } = pagi.getPagination(page, size);
    let response = await services.getAllPostNewAndInterest2({ userId, pagination });
    return res.status(200).json(response);
});

// const getAllPostOfUser = asyncHandler(async (req, res) => {
//     const { page, size, userId } = req.query;
//     const { limit, offset } = pagi.getPagination(page, size);
//     const pack = { page, limit, offset, userId };
//     const response = await services.getAllPost(pack);
//     return res.status(200).json(response);
// });

const getAPost = asyncHandler(async (req, res) => {
    const response = await services.getAPost(req.params.id);
    return res.status(200).json(response);
});

const getDeletedPost = asyncHandler(async (req, res) => {
    const response = await services.getDeletedPost(req.user.id);
    return res.status(200).json(response);
});

/**************** Create & Restore ******************/
const createNewPost = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0 || req.body[0] == null) {
        throw new Error('Please input something!');
    }

    let data = req.body;
    if (req.user) {
        data.userId = req.user.id;
        if (req.files) {
            const Images = req.files.map((el) => el.path);
            data.images = Images;
        } else if (req.body.videos) {
        }
    } else {
    }

    const response = await services.createNewPost(data);
    return res.status(200).json(response);
});

const createNewPost2 = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { caption, hashTag, postViewer } = req.body;
    const shareFrom = req.body.shareFrom === 'null' ? null : req.body.shareFrom;
    if (Object.keys(req.files).length === 0 && !req.videos && !caption) throw new Error('Please write caption!');
    if (!postViewer) throw new Error('Missing inputs!');
    let images, videos;
    if (req.files.images) images = req.files.images.map((el) => 'uploads/' + el.filename);
    if (req.files.videos) videos = req.files.videos.map((el) => 'uploads/' + el.filename);
    const response = await services.createNewPost({ userId, caption, hashTag, postViewer, shareFrom, images, videos });
    return res.status(200).json(response);
});

const restoreDeletePost = asyncHandler(async (req, res) => {
    const response = await services.restoreDeletePost(req.params.id, req.user.id);
    return res.status(200).json(response);
});

/************ Update *************/
//edit content of the post (only the caption and viewer type)
const editPost = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0 || Object.values(req.body).some((value) => value === '' || value === null)) {
        throw new Error('Please input something!');
    }

    const { caption, postViewer, hashTag, ...rest } = req.body;
    console.log(rest.length);
    if (Object.keys(rest).length !== 0) {
        throw new Error('Cannot edit these fields!');
    }

    const response = await services.editPost(req.params.id, req.body);
    return res.status(200).json(response);
});

/************ Delete *************/
//soft delete a post, user can restore
const deletePost = asyncHandler(async (req, res) => {
    const response = await services.deletePost(req.params.id, req.user.id);
    return res.status(200).json(response);
});

module.exports = {
    getAllPostOfUser,
    getAllPostOfUserByPublish,
    getAllPostNewAndInterest,
    getAPost,
    getDeletedPost,
    createNewPost,
    createNewPost2,
    editPost,
    deletePost,
    restoreDeletePost,
};
