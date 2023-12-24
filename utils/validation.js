const { celebrate, Joi } = require("celebrate");

const validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(2),
    name: Joi.string().min(1).max(30).required(),
  }),
});

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .email({ minDomainSegments: 2 })
      .required()
      .min(2)
      .max(30),
    password: Joi.string().required().min(2),
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email({ minDomainSegments: 2 }),
    name: Joi.string().min(1).max(30),
  }),
});

const validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(82),
    director: Joi.string().required().min(2),
    duration: Joi.number().integer().required(),
    year: Joi.string().required().min(4).max(4),
    description: Joi.string().required().min(2),
    image: Joi.string()
      .required()
      .pattern(
        /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/
      ),
    trailer: Joi.string()
      .required()
      .pattern(
        /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/
      ),
    thumbnail: Joi.string()
      .required()
      .pattern(
        /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/
      ),
    movieId: Joi.number().integer().required(),
    nameRU: Joi.string().required().min(1),
    nameEN: Joi.string().required().min(1),
  }),
});

const validateDelId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});
module.exports = {
  validateSignup,
  validateSignin,
  validateUser,
  validateMovie,
  validateDelId,
};
