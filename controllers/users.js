const UserModel = require("../models/user");
const { CustomeError } = require("../utils/handlerErrors");

const getUser = (req, res, next) => {
    console.log(req.user._id);
    UserModel.findOne({ _id: req.user._id })
        .then((user) => {
            if (!user) {
                throw new CustomeError(404, "user not find");
            }
            return res.status(200).send({ message: user });
        })
        .catch(next);
};

const updateProfile = (req, res, next) =>
    UserModel.findByIdAndUpdate(
        req.user._id,
        {
            name: req.body.name,
            email: req.body.email,
        },
        { new: true, runValidators: true }
    )
        .then((user) => {
            if (user) {
                return res.status(200).send({ message: user });
            }
            throw new CustomeError(404, "user not find");
        })
        .catch(next);

module.exports = {
    getUser,
    updateProfile,
};
