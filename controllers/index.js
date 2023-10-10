/*const dotenv = require("dotenv").config();*/
const { noFindRout } = require("../errors");
const { CustomeError } = require("../utils/handlerErrors");

const getPage = (req, res, next) => next(new CustomeError(404, "no find page"));

module.exports = {
    getPage,
};
