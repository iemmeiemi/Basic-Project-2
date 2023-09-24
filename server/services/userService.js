const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models');
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt');

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

const getCurrent = ({ id, email }) =>
    new Promise(async (resolve, reject) => {
        const response = await User.findOne({
            where: { id, email },
        });
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

module.exports = {
    register,
    login,
    getCurrent,
    refreshAccessToken,
    logout,
    getUsers,
};
