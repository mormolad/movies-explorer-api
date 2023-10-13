const router = require("express").Router();
const { getPage } = require("../controllers/index");
const routerUser = require("./users");
const routerMovies = require("./movies");
const auth = require("../middlewares/auth");
const { createUser, login } = require("../controllers/auth");
const { validateSignup, validateSignin } = require("../utils/validation");

router.post("/signup", validateSignup, createUser);
router.post("/signin", validateSignin, login);

router.use("/users", auth, routerUser);
router.use("/movies", auth, routerMovies);

router.all("/*", getPage); // страница не наёдена
module.exports = router;
