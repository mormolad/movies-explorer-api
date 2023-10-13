const routerUser = require("express").Router();
const { validateUser } = require("../utils/validation");
const { getUser, updateProfile } = require("../controllers/users");
// возвращает информацию о пользователе (email и имя)
routerUser.get("/me", getUser);
// обновляет информацию о пользователе (email и имя)
routerUser.patch("/me", validateUser, updateProfile);

module.exports = routerUser;
