const joi = require('joi');

const email = joi.string().email({ minDomainSegments: 2 }).required();
const password = joi.string().min(6).required();

module.exports = {
    emailPasswordFormValidate: joi.object({
        email,
        password,
    }),
    passwordFormValidate: joi.object({password}),
    emailFormValidate: joi.object({email}),
};
