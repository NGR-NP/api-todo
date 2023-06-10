const authRoute = require("express").Router();
const { Register, login } = require("./auth.controller");
authRoute.post("/register", Register);
authRoute.post("/login", login);

module.exports = authRoute;
