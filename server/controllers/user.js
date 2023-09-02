const errHandler = require('express-async-handler');

const { User } = require('../models');

const createUser = errHandler(async (req, res) => {
    const newUser = await User.create({ name: "newUser" });
    console.log(newUser.dataValues);
    return res.status(200).json({
        success: !!newUser.dataValues,
        rs: newUser.dataValues ? newUser.dataValues : 'Cannot create new user'
    })
})

module.exports = {
    createUser,
}