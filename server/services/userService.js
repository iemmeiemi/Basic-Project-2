const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { Op } = require('sequelize');

const { User, Account } = require('../models');
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt');
const sendMail = require('../utils/sendMail');

const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const register = (data) =>
    new Promise(async (resolve, reject) => {
        try {
            const { birthday, ...data2 } = data;
            const response = await User.findOrCreate({
                where: { email: data.email },
                defaults: {
                    ...data2,
                    password: hashPassword(data2.password),
                },
            });
            if (response[1]) {
                const responseUser = await User.findOne({
                    where: {
                        email: data.email,
                    },
                    attributes: {
                        exclude: ['passwordChangedAt', 'passwordResetExprides', 'passwordResetToken', 'refreshToken'],
                    },
                });
                await Account.findOrCreate({
                    where: { id: +responseUser.id },
                    defaults: {
                        id: +responseUser.id,
                        birthday,
                    },
                });
            }
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
                attributes: {
                    exclude: ['passwordChangedAt', 'passwordResetExprides', 'passwordResetToken', 'refreshToken'],
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
                const { password, ...user } = response.dataValues;
                resolve({
                    success: isChecked,
                    mes: 'Login is successfully',
                    data: isChecked && user,
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
        const response = await User.findByPk(id, {
            attributes: {
                exclude: [
                    'password',
                    'passwordChangedAt',
                    'passwordResetExprides',
                    'passwordResetToken',
                    'refreshToken',
                ],
            },
        });
        resolve({
            success: !!response,
            mes: response ? 'Login is successfully' : 'User not found',
            data: response || 'User not found',
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
            const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15ph kể từ bây giờ. <a href=${process.env.CLIENT_URL}/resetpassword/${resetToken}>Click here</a>`;
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
                mes: rs
                    ? 'Password reset email successfully sent! Please check your inbox.'
                    : 'Failed to send password reset email. Please try again later.!',
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
            const response = await User.findAll({
                attributes: {
                    exclude: [
                        'password',
                        'passwordChangedAt',
                        'passwordResetExprides',
                        'passwordResetToken',
                        'refreshToken',
                    ],
                },
            });
            resolve({
                success: response.length > 0,
                mes: response.length > 0 ? 'Successfully' : 'No users found',
                data: response.length > 0 && response,
            });
        } catch (error) {
            reject(error);
        }
    });

const getUser = (userId) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await User.findByPk(userId, {
                attributes: {
                    exclude: [
                        'password',
                        'passwordChangedAt',
                        'passwordResetExprides',
                        'passwordResetToken',
                        'refreshToken',
                        'interestedUsers',
                    ],
                },
            });
            resolve({
                success: !!response,
                mes: response ? 'Successfully' : 'No users found',
                data: response,
            });
        } catch (error) {
            reject(error);
        }
    });

const getUserAccount = (userId) =>
    new Promise(async (resolve, reject) => {
        try {
            const user = await User.findByPk(userId, {
                attributes: {
                    exclude: [
                        'password',
                        'passwordChangedAt',
                        'passwordResetExprides',
                        'passwordResetToken',
                        'refreshToken',
                        'interestedUsers',
                    ],
                },
            });
            let gender;
            switch (user?.dataValues.gender) {
                case 'Male':
                    gender = 0;
                    break;
                case 'Female':
                    gender = 1;
                    break;
                case 'Undetermined':
                    gender = 2;
                    break;
            }
            const account = await Account.findByPk(userId);
            let userInfo;
            if (user && account) userInfo = { ...user.dataValues, ...account.dataValues, gender };
            resolve({
                success: !!user && !!account,
                mes: user && account ? 'Successfully' : 'No users found',
                data: userInfo,
            });
        } catch (error) {
            reject(error);
        }
    });

const editUserAccount = ({ userData, accountData }) =>
    new Promise(async (resolve, reject) => {
        try {
            const user = await User.update(userData, {
                where: { id: userData.id },
            });
            const account = await Account.update(accountData, {
                where: { id: userData.id },
            });
            resolve({
                success: !!user && !!account,
                mes: user && account ? 'Successfully' : 'No users found',
            });
        } catch (error) {
            reject(error);
        }
    });

const getSearchUsers = ({ q }) =>
    new Promise(async (resolve, reject) => {
        try {
            const response = await User.findAll({
                where: {
                    fullName: { [Op.iLike]: `%${q}%` },
                },
                attributes: {
                    exclude: [
                        'password',
                        'passwordChangedAt',
                        'passwordResetExprides',
                        'passwordResetToken',
                        'refreshToken',
                        'interestedUsers',
                        'email',
                        'phone',
                    ],
                },
            });
            resolve({
                success: response.length > 0,
                mes: response.length > 0 ? 'Successfully' : 'No users found',
                data: response.length > 0 && response,
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
    getUser,
    getUserAccount,
    editUserAccount,
    getSearchUsers,
};
