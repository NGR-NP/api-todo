const { verifyJwt } = require("../auth/auth.middleware");
const {
  getTodoCountsByCategory,
  createCategory,
  getAllCategories,
} = require("./category.controller");

const categoryRoute = require("express").Router();
categoryRoute.use(verifyJwt);
categoryRoute.post("/", createCategory);
categoryRoute.get('/', getAllCategories)
categoryRoute.get("/count", getTodoCountsByCategory);
module.exports = categoryRoute;
