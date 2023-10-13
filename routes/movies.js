const routerMovies = require("express").Router();
const { validateMovie, validateDelId } = require("../utils/validation");
const {
  getMoviesUsers,
  createMovie,
  deleteMovie,
} = require("../controllers/movies");

routerMovies.get("/", getMoviesUsers); // отдать коллекцию фильмов
routerMovies.post("/", validateMovie, createMovie); //сохранить в коллекцию фильм
routerMovies.delete("/:movieId", validateDelId, deleteMovie); //удалить фильм из коллекции

module.exports = routerMovies;
