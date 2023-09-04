const errHandler = require('express-async-handler');

const services = require('../services');
const joi_schema = require('../helps/joi_schema');

const register = errHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) throw new Error('Missing inputs');
    const error = joi_schema.validate({email, password})?.error;
    if (error) throw new Error(error.details[0]?.message)
    delete req.body.role;
    const response = await services.register(req.body);
    return res.status(200).json(response)
})

const login = errHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) throw new Error('Missing inputs');
    const response = await services.login(req.body);
    const {refreshToken, ...rs} = response;
    console.log(rs);
    res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7*24*60*60*1000 });
    return res.status(200).json(rs)
})

const getUsers = errHandler(async (req, res) => {
    const response = await services.getUsers();
    return res.status(200).json(response);
});

module.exports = {
    register,
    login,
    getUsers,
}