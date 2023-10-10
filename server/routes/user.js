const router = require('express').Router();

const ctrls = require('../controllers/userController');

router.post('/register', ctrls.register);
router.get('/login', ctrls.login); 

router.get('/', ctrls.getUsers);

module.exports = router;

