const jwt = require('jsonwebtoken');

const generateAccessToken = (id, email, role) => jwt.sign({id, email, role}, process.env.JWT_SECRET, {expiresIn: '2d'});
const generateRefreshToken = (id, email) => jwt.sign({id, email}, process.env.JWT_SECRET, {expiresIn: '7d'});

module.exports = {
    generateAccessToken,
    generateRefreshToken
}