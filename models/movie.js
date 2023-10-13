const mongoose = require("mongoose");
const validator = require("validator");

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      // опишем свойство validate
      validator(url) {
        return validator.isURL(url); // если не url, вернётся false
      },
      message: "Введите коректный адрес постера", // когда validator вернёт false, будет использовано это сообщение
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      // опишем свойство validate
      validator(url) {
        return validator.isURL(url); // если не url, вернётся false
      },
      message: "Введите коректный адрес трейлера", // когда validator вернёт false, будет использовано это сообщение
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      // опишем свойство validate
      validator(url) {
        return validator.isURL(url); // если не url, вернётся false
      },
      message: "Введите коректный адрес миниатюры", // когда validator вернёт false, будет использовано это сообщение
    },
  },
  owner: {
    type: String,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("movies", movieSchema);
