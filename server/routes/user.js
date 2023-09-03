const router = require('express').Router();

const ctrls = require('../controllers/userController');

router.post('/', ctrls.register);
router.get('/', ctrls.getUsers);

module.exports = router;

