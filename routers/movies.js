const routerMovies = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
    getMoviesUsers,
    createMovie,
    deleteMovie,
} = require("../controllers/movies");

routerMovies.get("/movies", getMoviesUsers); // отдать коллекцию фильмов
routerMovies.post(
    "/movies",
    celebrate({
        body: Joi.object().keys({
            country: Joi.string().required().min(2).max(82),
            director: Joi.string().required().min(2),
            duration: Joi.number().integer().required().min(1900).max(2024),
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
    }),
    createMovie
);
routerMovies.delete(
    "/movies/:movieId",
    celebrate({
        params: Joi.object().keys({
            movieId: Joi.string().length(24).hex().required(),
        }),
    }),
    deleteMovie
);

module.exports = routerMovies;
