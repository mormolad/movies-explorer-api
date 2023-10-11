const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator(email) {
                return validator.isEmail(email); // если не email, вернётся false
            },
            message: "введите корректный email", // когда validator вернёт false, будет использовано это сообщение
        },
    },
    password: {
        type: String,
        required: true,
        select: false,
        validate: {
            validator(pass) {
                return validator.isStrongPassword(pass); // если пароль простой, вернётся false
            },
            message: "пороль не соответствует требованием безопасности", // когда validator вернёт false, будет использовано это сообщение
        },
    },
});
module.exports = mongoose.model("user", userSchema);
