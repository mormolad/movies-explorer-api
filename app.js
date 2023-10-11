const path = require("path");
const express = require("express");
const cors = require("cors");
const { errors } = require("celebrate");
const helmet = require("helmet");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { limiter } = require("./utils/limiter");
const routerUser = require("./routers/users");
const routerMovies = require("./routers/movies");
const routerAuth = require("./routers/auth");
const router = require("./routers/index");
const auth = require("./middlewares/auth");
const { sendError } = require("./utils/handlerErrors");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3000, MONGODB_URL = "mongodb://127.0.0.1:27017/bitfilmsdb" } =
    process.env;

// подключаемся к серверу mongo
mongoose
    .connect(MONGODB_URL, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("connected to db"); // eslint-disable-line no-console
    });

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());
app.disable("x-powered-by");
app.use(requestLogger); // подключаем логгер запросов
app.use(limiter);
app.use(routerAuth);
app.use(auth);
app.use(routerUser);
app.use(routerMovies);
app.use(router);
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());
app.use((err, req, res, next) => {
    sendError(err, req, res);
});
app.listen(PORT, () => {
    console.log(`server start, listen port: ${PORT}`); // eslint-disable-line no-console
});
