const router = require('express').Router();

const ctrls = require('../controllers/userController');
const { verifyAccessToken, verifyRefreshToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/register', ctrls.register);
router.post('/login', ctrls.login);
router.get('/refreshaccesstoken', verifyRefreshToken, ctrls.refreshAccessToken);
router.get('/forgotpassword', ctrls.forgotPassword);
router.put('/resetpassword', ctrls.resetPassword);

router.get('/current', verifyAccessToken, ctrls.getCurrent);
router.get('/logout', verifyAccessToken, ctrls.logout);

router.get('/search',verifyAccessToken, ctrls.getSearchUsers);
router.get('/:userId', ctrls.getUser);
router.get('/profile/:userId', ctrls.getUserAccount);
router.put('/profile',verifyAccessToken, ctrls.editUserAccount);

// router.use(verifyAccessToken); ko nên dùng như vầy vì ví dụ:
//
// route.get('/:id', controler)
// route.use(verify)
// route.get('/user, userSontroler)
//
// trường hợp này /user sẽ bị hiểu lầm là /:id

router.get('/', isAdmin, verifyAccessToken, ctrls.getUsers);

module.exports = router;
