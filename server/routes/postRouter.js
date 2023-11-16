const router = require('express').Router();
const uploader = require('../config/storeImages.config');
const ctrls = require('../controllers/postController');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

//Find/Get
router.get('/all-post', ctrls.getAllPost); //has pagination
router.get('/:id', ctrls.getAPost); //chỉnh lại slug
router.get('/get-deleted-post', verifyAccessToken, ctrls.getDeletedPost);

//CRUD 
router.post('/create', verifyAccessToken, uploader.array('images', 5), ctrls.createNewPost);
router.put('/:id', verifyAccessToken, ctrls.editPost);
router.delete('/:id', verifyAccessToken, ctrls.deletePost);
router.post('/:id', verifyAccessToken, ctrls.restoreDeletePost);



module.exports = router;