const { verifyJwt } = require("../auth/auth.middleware");
const {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  getTodaysTodo,
  searchTodo,
} = require("./todo.controller");

const TodoRoute = require("express").Router();
TodoRoute.use(verifyJwt);
TodoRoute.post("/", createTodo);
TodoRoute.get("/", getAllTodos);
TodoRoute.get("/search", searchTodo);
TodoRoute.get("/today", getTodaysTodo);
TodoRoute.put("/", updateTodo);
TodoRoute.delete("/", deleteTodo);
TodoRoute.get("/:id", getTodoById);

module.exports = TodoRoute;
