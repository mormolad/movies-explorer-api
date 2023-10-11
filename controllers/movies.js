const MoviesModel = require("../models/movie");
const { CustomeError } = require("../utils/handlerErrors");

const getMoviesUsers = (req, res, next) =>
    MoviesModel.find(req.user._id)
        .then((movies) => {
            if (!movies) {
                throw new CustomeError(404, "no find movies");
            }
            res.status(200).send({ message: movies });
        })
        .catch(next);

const createMovie = (req, res, next) => {
    const {
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        nameRU,
        nameEN,
        thumbnail,
        movieId,
    } = req.body;
    console.log("wtf");
    return MoviesModel.create({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        nameRU,
        nameEN,
        thumbnail,
        movieId,
        owner: req.user._id,
    })
        .then((movie) => {
            if (!movie) {
                throw new CustomeError(400, "bad request");
            }
            return res.status(201).send({ message: movie });
        })
        .catch(next);
};

const deleteMovie = (req, res, next) => {
    MoviesModel.findById({ _id: req.params.movieId })
        .then((movie) => {
            if (!movie) {
                throw new CustomeError(404, "no find movie");
            } else if (movie.owner === req.user._id) {
                CardModel.deleteOne({ _id: req.params.movieId }).then(() =>
                    res.status(200).send({ message: movie })
                );
            } else {
                throw new CustomeError(
                    403,
                    "you can't delete someone else's movie"
                );
            }
        })
        .catch(next);
};

module.exports = {
    getMoviesUsers,
    createMovie,
    deleteMovie,
};
