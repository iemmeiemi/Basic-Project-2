const router = require('express').Router();

const ctrls = require('../controllers/user');

router.get('/', ctrls.createUser);

module.exports = router;

