const routerAuth = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const { createUser, login } = require("../controllers/auth");

routerAuth.post(
    "/signup",
    celebrate({
        body: Joi.object().keys({
            email: Joi.string().email({ minDomainSegments: 2 }).required(),
            password: Joi.string().required().min(2),
            name: Joi.string().min(2).max(30).required(),
        }),
    }),
    createUser
);

routerAuth.post(
    "/signin",
    celebrate({
        body: Joi.object().keys({
            email: Joi.string()
                .email({ minDomainSegments: 2 })
                .required()
                .min(2)
                .max(30),
            password: Joi.string().required().min(2),
        }),
    }),
    login
);

module.exports = routerAuth;
