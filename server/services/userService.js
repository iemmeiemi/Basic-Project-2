const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

const hashPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const generateAccessToken = (id, email, role) => ('Bearer ' + jwt.sign({id, email, role}, process.env.JWT_SECRET, {expiresIn: '2d'}));
const generateRefreshToken = (id, email) => jwt.sign({id, email}, process.env.JWT_SECRET, {expiresIn: '7d'});
await jwt.verify(token, process.env.JWT_SECRET)

const register = (data) => new Promise(async (resolve, reject) => {
    try {
        // [user, isCreated]
        const response = await User.findOrCreate({ 
            where: {email: data.email},
            defaults: {
                ...data,
                password: hashPassword(data.password)
            }
        });
        resolve({
            success: !!response[1],
            mes: response[1] ? 'Register is successfully. Please go login!' : 'Email is used'
        });
    } catch (error) {
        reject(error);
    }
})

const login = ({email, password}) => new Promise(async (resolve, reject) => {
    try {
        const response = await User.findOne({
            where: {
                email
            }
        });
        const isChecked = response && bcrypt.compareSync(password, response.password);
        const accessToken = isChecked ? generateAccessToken(response.id, response.email, response.role) : null;
        const refreshToken = isChecked ? generateRefreshToken(response.id, response.email) : null;
        resolve({
            success: !!isChecked,
            mes: isChecked ? 'Login is successfully' : 'Login failed',
            accessToken,
            refreshToken
        });
    } catch (error) {
        reject(error);
    }
})

const getUsers = () => new Promise(async (resolve, reject) => {
    try {
        const response = await User.findAll();
        resolve({
            success: response.length > 0,
            rs: response.length > 0 ? response : 'No users found'
        });
    } catch (error) {
        reject(error);
    }
})

module.exports = {
    register,
    login,
    getUsers
}