const bcrypt = require("bcryptjs");
const { getJWT } = require("../utils/jwt");
const UserModel = require("../models/user");
const { CustomeError } = require("../utils/handlerErrors");

const login = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new CustomeError(400, "Blank email or password fields");
    }
    UserModel.findOne({ email })
        .select("+password")
        .then((user) => {
            if (!user) {
                return next(
                    new CustomeError(401, "incorrect email or password")
                );
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    return next(
                        new CustomeError(401, "incorrect email or password")
                    );
                }
                if (!result) {
                    return next(
                        new CustomeError(401, "incorrect email or password")
                    );
                }
                return res.status(200).send({ message: getJWT(user._id) });
            });
        })
        .catch(next);
};

const createUser = (req, res, next) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return next(
            new CustomeError(400, "Blank name, email or password fields")
        );
    }
    bcrypt.hash(password, 10).then((hash) => {
        UserModel.create({
            email,
            password: hash,
            name,
        })
            .then((user) => {
                const userRes = user.toObject();
                delete userRes.password;
                return res.status(201).send({ message: userRes });
            })
            .catch(next);
    });
};

module.exports = {
    createUser,
    login,
};
