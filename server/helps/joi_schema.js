const joi = require('joi');

const  email = joi.string().email({minDomainSegments: 2}).required();
const password = joi.string().min(6).required();

module.exports = joi.object({
    email,
    password
})