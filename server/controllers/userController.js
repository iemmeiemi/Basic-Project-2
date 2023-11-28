const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const services = require('../services');
const { emailPasswordFormValidate, passwordFormValidate } = require('../helps/joi_schema');

const register = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, birthday, gender } = req.body;
    if (!firstName || !lastName || !email || !password || !birthday) throw new Error('Missing inputs');
    const fullName = firstName + ' ' + lastName;
    const error = emailPasswordFormValidate.validate({ email, password })?.error;
    if (error) throw new Error(error.details[0]?.message);
    delete req.body.role;
    switch (gender) {
        case 0:
            return 'Male';
        case 1:
            return 'Female';
        case 2:
            return 'Undetermined';
    }
    const response = await services.register({ firstName, lastName, fullName, gender, email, password, birthday });
    return res.status(200).json(response);
});

const login = asyncHandler(async (req, res) => {
    const { email, password, remember } = req.body;
    if (!email || !password) throw new Error('Missing inputs');
    const response = await services.login(req.body);
    const { refreshToken, ...rs } = response;
    if (remember) res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
    return res.status(200).json(rs);
});

const getCurrent = asyncHandler(async (req, res) => {
    const { id } = req.user;
    const response = await services.getCurrent({ id });
    return res.status(200).json(response);
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const decode = req.user;
    const response = await services.refreshAccessToken({ ...decode, refreshToken: req.cookies.refreshToken });
    return res.status(200).json(response);
});

const logout = asyncHandler(async (req, res) => {
    const cookies = req.cookies;
    if (!cookies || !cookies.refreshToken)
        return res.status(200).json({
            success: true,
            mes: 'Logout is successfully!',
    });
    // throw new Error('No refresh token in cookies');
    const response = await services.logout({ refreshToken: cookies.refreshToken });
    res.clearCookie('refreshToken', { httpOnly: true, secure: true });
    return res.status(200).json(response);
});

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.query;
    if (!email) throw new Error('Missing inputs');
    const response = await services.forgotPassword({ email });
    return res.status(200).json(response);
});

const resetPassword = asyncHandler(async (req, res) => {
    const { password, resetToken } = req.body;
    if (!password || !resetToken) throw new Error('Missing inputs');
    const error = passwordFormValidate.validate({password})?.error;
    if (error) throw new Error(error.details[0]?.message);
    const response = await services.resetPassword({ password, resetToken });
    return res.status(200).json(response);
});

const getUsers = asyncHandler(async (req, res) => {
    const response = await services.getUsers();
    return res.status(200).json(response);
});

const getUser = asyncHandler(async (req, res) => {
    const response = await services.getUser(req.params.userId);
    return res.status(200).json(response);
});

module.exports = {
    register,
    login,
    refreshAccessToken,
    getCurrent,
    logout,
    forgotPassword,
    resetPassword,
    getUsers,
    getUser
};
