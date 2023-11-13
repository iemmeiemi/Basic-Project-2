const asyncHandler = require('express-async-handler');
const services = require('../services');
//const joi_schema = require('../helps/joi_schema');

//all post & pagination, sort, limit
const getAllPost = asyncHandler(async (req, res) => {
    const response = await services.getAllPost(req.body);
    return res.status(200).json(response);
});

const getAPost = asyncHandler(async (req, res) => {
    const response = await services.getAPost(req.query);
    return res.status(200).json(response);
});

const getDeletedPost = asyncHandler(async (req, res) => {
    const response = await services.getDeletedPost(req.user.id);
    return res.status(200).json(response);
});

/**************** Create & Restore ******************/
const createNewPost = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0 ) {
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

const restoreDeletePost = asyncHandler(async (req, res) => {
    const response = await services.restoreDeletePost(req.params.id);
    return res.status(200).json(response);
});


/************ Update *************/
//edit content of the post (only the caption and viewer type)
//chưa ràng buộc user (1 là ràng buộc logic client, 2 là server)
const editPost = asyncHandler(async (req, res) => {
    if (req.body) {
        console.log("req.body: " + req.body.caption + ', pid: ' + req.params.id);
    } else {
        console.log('nothing');
    }

    const response = await services.editPost(req.params.id, req.body);
    return res.status(200).json(response);
});

/************ Delete *************/
//soft delete a post, user can restore
const deletePost = asyncHandler(async (req, res) => {

    const response = await services.deletePost(req.params.id);
    return res.status(200).json(response);
});



module.exports = {
    getAllPost,
    getAPost,
    getDeletedPost,
    createNewPost,
    editPost,
    deletePost,
    restoreDeletePost,

};
