const router = require('express').Router();
const ctrls = require('../controllers/userRelaController');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

//List Friend
router.get('/list-friend', ctrls.listFriend);
router.get('/list-pending-to-me', verifyAccessToken, ctrls.listFriend);
router.get('/list-me-pending', verifyAccessToken, ctrls.listFriend);
//router.get('/find', ctrls.listFriend); //sort by name

//List block: building later.
//router.get('/list-block', ctrls. ); //sort by name


//Friend rela
router.post('/add-friend', verifyAccessToken, ctrls.addFriend); 
router.post('/unsend-add-friend', verifyAccessToken, ctrls.unSenAddFriend);
router.put('/accept-add-friend', verifyAccessToken, ctrls.acceptAddFriend);
router.put('/unfriend', verifyAccessToken, ctrls.unFriend); 

//Block rela
router.put('/block', verifyAccessToken, ctrls.blockingUser); 
router.put('/unblock', verifyAccessToken, ctrls.unblockingUser); 

//Follow rela
router.put('/follow', verifyAccessToken, ctrls.following); 
router.put('/unfollow', verifyAccessToken, ctrls.unfollowing); 


module.exports = router;
