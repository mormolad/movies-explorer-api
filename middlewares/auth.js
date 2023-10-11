const { isJWT, getPayload } = require("../utils/jwt");
const { CustomeError } = require("../utils/handlerErrors");

const auth = (req, res, next) => {
    if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith("Bearer ")
    ) {
        return next(new CustomeError(401, "you are not authorized"));
    }
    const token = req.headers.authorization.replace("Bearer ", "");

    isJWT(token)
        ? (req.user = { _id: getPayload(token)._id })
        : next(new CustomeError(401, "authorization required"));

    next();
};

module.exports = auth;
