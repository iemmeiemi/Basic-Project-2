const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const verifyAccessToken = asyncHandler((req, res, next) => {
    if(req?.headers?.authorization?.startsWith('Bearer')) {
        const accessToken = req.headers.authorization.split(' ')[1];
        jwt.verify(accessToken, process.env.JWT_SECRET, (err, decode) => {
            if (err) return res.status(401).json({
                success: false,
                mes: 'Invalid access token!'
            });
            req.user = decode;
            next();
        });
        
    } else return res.status(401).json({
        success: false,
        mes: 'Require Authorization!'
    })
})

const isAdmin = asyncHandler((req, res, next) => {
    const { role } = req.user;
    console.log()
    if (role !== 'admin') return res.status(401).json({
        success: false,
        mes: 'Require Admin role!'
    })
    next();
})

module.exports = {
    verifyAccessToken,
    isAdmin
}