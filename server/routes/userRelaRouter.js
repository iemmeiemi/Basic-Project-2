const router = require('express').Router();
const ctrls = require('../controllers/userRelaController');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

//List Friend
router.post('/list', ctrls.listFriend);
router.post('/find', ctrls.listFriend);


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
