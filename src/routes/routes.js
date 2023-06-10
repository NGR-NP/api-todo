const authRoute = require("../auth/auth.router");
const categoryRoute = require("../category/category.router");
const TodoRoute = require("../todo/todo.router");
const userRoute = require("../user/user.router");

const Routes = require("express").Router();

Routes.use("/auth", authRoute);
Routes.use("/todo", TodoRoute);
Routes.use("/catg", categoryRoute);
Routes.use("/users", userRoute)
module.exports = Routes;
