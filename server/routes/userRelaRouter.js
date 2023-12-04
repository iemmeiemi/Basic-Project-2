const router = require('express').Router();
const ctrls = require('../controllers/userRelaController');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.get('/check-user-relationship', verifyAccessToken, ctrls.getCheckUserRela);

//List Friend
router.get('/list-friend', ctrls.listFriend);
router.get('/list-friend2', ctrls.listFriend2);
router.get('/list-pending-to-me', verifyAccessToken, ctrls.listFriend);
router.get('/list-me-pending', verifyAccessToken, ctrls.listFriend);
//router.get('/find', ctrls.listFriend); //sort by name

//List block: building later.
//router.get('/list-block', ctrls. ); //sort by name

//Friend rela
router.post('/add-friend', verifyAccessToken, ctrls.addFriend);
router.post('/add-friend2', verifyAccessToken, ctrls.addFriend2);
router.post('/unsend-add-friend', verifyAccessToken, ctrls.unSenAddFriend);
router.put('/accept-add-friend', verifyAccessToken, ctrls.acceptAddFriend);
router.put('/unfriend', verifyAccessToken, ctrls.unFriend);

//Block rela
router.put('/block', verifyAccessToken, ctrls.blockingUser);
router.put('/unblock', verifyAccessToken, ctrls.unblockingUser);

//Follow rela
router.put('/follow', verifyAccessToken, ctrls.following);
router.put('/follow-user', verifyAccessToken, ctrls.followUser);
router.put('/unfollow', verifyAccessToken, ctrls.unfollowing);
router.put('/unfollow-user', verifyAccessToken, ctrls.unfollowUser);

module.exports = router;
