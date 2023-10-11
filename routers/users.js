const routerUser = require("express").Router();
const { celebrate, Joi } = require("celebrate");

const { getUser, updateProfile } = require("../controllers/users");
// возвращает информацию о пользователе (email и имя)
routerUser.get("/users/me", getUser);
// обновляет информацию о пользователе (email и имя)
routerUser.patch(
    "/users/me",
    celebrate({
        body: Joi.object().keys({
            email: Joi.string().email({ minDomainSegments: 2 }).required(),
            name: Joi.string().min(1).max(30).required(),
        }),
    }),
    updateProfile
);

module.exports = routerUser;
