const {verifyJwt} = require("../auth/auth.middleware");
const {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} = require("./todo.controller");

const TodoRoute = require("express").Router();
TodoRoute.use(verifyJwt)
TodoRoute.post("/", createTodo);
TodoRoute.get("/", getAllTodos);
TodoRoute.get("/:id", getTodoById);
TodoRoute.put("/:id", updateTodo);
TodoRoute.delete("/:id", deleteTodo);

module.exports = TodoRoute;