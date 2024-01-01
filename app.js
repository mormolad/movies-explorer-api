const path = require("path");
const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { errors } = require("celebrate");
const helmet = require("helmet");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { limiter } = require("./utils/limiter");
const router = require("./routes/index");
const { sendError } = require("./utils/handlerErrors");
const { requestLogger, errorLogger } = require("./middlewares/logger");
//const cors = require("./middlewares/cors");

const { PORT = 3000, MONGODB_URL = "mongodb://127.0.0.1:27017/bitfilmsdb" } =
  process.env;

// подключаемся к серверу mongo
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("connected to db"))
  .catch(() => console.log("do not connected to db"));

const app = express();

app.use(
  cors({
    origin: [
      "http://filmissio.nomoredomainsmonster.ru/", //https://filmissio.nomoredomainsmonster.ru/
      "https://filmissio.nomoredomainsmonster.ru/",
      "http://api.filmissio.nomoredomainsmonster.ru/",
      "https://api.filmissio.nomoredomainsmonster.ru/",
      "http://localhost:3001",
      "http://localhost:3000",
      "https://localhost:3000",
    ],
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ["Content-Type", "origin", "Authorization"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());
app.disable("x-powered-by");
app.use(requestLogger); // подключаем логгер запросов
app.use(limiter);
app.use(router);
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());
app.use((err, req, res, next) => {
  sendError(err, req, res);
});
app.listen(PORT, () => {
  console.log(`server start, listen port: ${PORT}`);
});
