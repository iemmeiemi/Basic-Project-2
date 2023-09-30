const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const { User } = require('../models');
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt');
const sendMail = require('../ultils/sendMail');
const { log } = require('console');

const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const register = (data) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await User.findOrCreate({
                where: { email: data.email },
                defaults: {
                    ...data,
                    password: hashPassword(data.password),
                },
            });
            resolve({
                success: !!response[1],
                mes: response[1] ? 'Register is successfully. Please go login!' : 'Email is used',
            });
        } catch (error) {
            reject(error);
        }
    });

const login = ({ email, password }) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await User.findOne({
                where: {
                    email,
                },
            });
            const isChecked = response && bcrypt.compareSync(password, response.password);
            if (isChecked) {
                const accessToken = generateAccessToken(response.id, response.email, response.role);
                const refreshToken = generateRefreshToken(response.id, response.email);
                await User.update(
                    { refreshToken },
                    {
                        where: {
                            id: response.id,
                        },
                    },
                );
                resolve({
                    success: isChecked,
                    mes: 'Login is successfully',
                    accessToken,
                    refreshToken,
                });
            } else
                resolve({
                    success: !!isChecked,
                    mes: 'Invalid credentials!',
                });
        } catch (error) {
            reject(error);
        }
    });

const getCurrent = ({ id }) =>
    new Promise(async (resolve, reject) => {
        const response = await User.findByPk(id);
        resolve({
            success: !!response,
            mes: response || 'User not found',
        });
    });

const refreshAccessToken = (data) =>
    new Promise(async (resolve, reject) => {
        const response = await User.findOne({
            where: {
                id: data.id,
                email: data.email,
                refreshToken: data.refreshToken,
            },
        });
        const newAccessToken = generateAccessToken(data.id, data.email, data.refreshAccessToken);
        resolve({
            success: !!response,
            newAccessToken: response ? newAccessToken : 'Refresh token not matched',
        });
    });

const logout = ({ refreshToken }) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await User.update(
                { refreshToken: '' },
                {
                    where: {
                        refreshToken,
                    },
                },
            );
            resolve({
                success: !!response,
                mes: response ? 'Logout is successfully!' : 'No users found',
            });
        } catch (error) {
            reject(error);
        }
    });

const forgotPassword = ({ email }) =>
    new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                where: {
                    email,
                },
            });
            if (!user) throw new Error('User not found');
            const resetToken = crypto.randomBytes(32).toString('hex');
            const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
            const passwordResetExprides = Date.now() + 15 * 60 * 1000;
            const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15ph kể từ bây giờ. <a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Click here</a>`;
            const data = {
                email,
                html,
            };
            const response = await User.update(
                {
                    passwordResetToken,
                    passwordResetExprides,
                },
                {
                    where: {
                        email,
                    },
                },
            );
            const rs = await sendMail(data);
            resolve({
                success: !!rs,
                rs,
            });
        } catch (error) {
            reject(error);
        }
    });

const resetPassword = ({ password, resetToken }) =>
    new Promise(async (resolve, reject) => {
        try {
            const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
            const user = await User.findOne({
                where: {
                    passwordResetToken,
                    passwordResetExprides: {
                        [Op.gt]: Date.now(),
                    },
                },
            });
            if (!user) throw new Error('Invalid reset token');
            console.log(user.email);
            const response = await User.update(
                {
                    password: hashPassword(password),
                    passwordChangedAt: Date.now(),
                    passwordResetToken: null,
                    passwordResetExprides: null,
                },
                {
                    where: { email: user.email },
                },
            );
            resolve({
                success: !!response,
                mes: response ? 'Password has been changed successfully' : 'Cannot change password',
            });
        } catch (error) {
            reject(error);
        }
    });

const getUsers = () =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await User.findAll();
            resolve({
                success: response.length > 0,
                rs: response.length > 0 ? response : 'No users found',
            });
        } catch (error) {
            reject(error);
        }
    });
module.exports = {
    register,
    login,
    getCurrent,
    refreshAccessToken,
    logout,
    forgotPassword,
    resetPassword,
    getUsers,
};
