const bcrypt = require('bcrypt');

const { User } = require('../models');

const register = (data) => new Promise(async (resolve, reject) => {
    try {
        const response = await User.findOrCreate({
            where: {email: data.email},
            defaults: {
                ...data,
                password: bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))
            }
        });
        
        resolve({
            success: !!response[1],
            mes: response[1] ? 'Register is successfully' : 'Email is used'
        });
    } catch (error) {
        reject(error);
    }
})

const getUsers = () => new Promise(async (resolve, reject) => {
    try {
        const response = await User.findAll();
        const users = response.map(user => user.dataValues);
        resolve({
            success: users.length > 0,
            rs: users.length > 0 ? users : 'No users found'
        });
    } catch (error) {
        reject(error);
    }
})

module.exports = {
    register,
    getUsers
}