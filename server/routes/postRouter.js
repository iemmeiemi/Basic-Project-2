const router = require('express').Router();
const uploader = require('../config/storeImages.config');
const ctrls = require('../controllers/postController');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

//Find/Get
router.get('/all-post-of-user', verifyAccessToken, ctrls.getAllPostOfUser); //has pagination
router.get('/all-post-of-user-by-publish', ctrls.getAllPostOfUserByPublish);
router.get('/all-post-new-and-interest', verifyAccessToken, ctrls.getAllPostNewAndInterest);
router.get('/get-deleted-post', verifyAccessToken, ctrls.getDeletedPost);
router.get('/:id', ctrls.getAPost); //chỉnh lại slug

//CRUD
router.post(
    '/create',
    verifyAccessToken,
    uploader.fields([
        {
            name: 'images',
            maxCount: 4,
        },
        {
            name: 'videos',
            maxCount: 1,
        },
    ]),
    ctrls.createNewPost2,
);
router.put(
    '/:id',
    verifyAccessToken,
    uploader.fields([
        {
            name: 'images',
            maxCount: 4,
        },
        {
            name: 'videos',
            maxCount: 1,
        },
    ]),
    ctrls.editPost2,
);
router.delete('/:id', verifyAccessToken, ctrls.deletePost);
router.post('/:id', verifyAccessToken, ctrls.restoreDeletePost);

module.exports = router;
