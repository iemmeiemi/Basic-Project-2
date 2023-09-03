const errHandler = require('express-async-handler');

const services = require('../services');

const register = errHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) throw new Errror('Missing inputs');
    delete req.body.role;
    const response = await services.register(req.body);
    return res.status(200).json(response)
})

const getUsers = errHandler(async (req, res) => {
    const response = await services.getUsers();
    return res.status(200).json(response);
});

module.exports = {
    register,
    getUsers
}