const router = require('express').Router();

const ctrls = require('../controllers/userController');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/register', ctrls.register);
router.get('/login', ctrls.login);
router.get('/refreshaccesstoken', ctrls.refreshAccessToken);
router.get('/forgotpassword', ctrls.forgotPassword);
router.put('/resetpassword', ctrls.resetPassword);

router.use(verifyAccessToken);

router.get('/current', ctrls.getCurrent);
router.get('/logout', ctrls.logout);
router.get('/', isAdmin, ctrls.getUsers);

module.exports = router;
