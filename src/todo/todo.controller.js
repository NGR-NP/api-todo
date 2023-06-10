const CategoryModel = require("../models/category.model");

const TodoModel = require("../models/todo.model");
const ERROR = require("../utils/ERROR");

exports.createTodo = async (req, res, next) => {
  const { task, category, date } = req.body;
  if (!task) return next(ERROR(400, "enter new task!!"));
  if (!category) return next(ERROR(400, "choose the category!!"));
  if (!date) return next(ERROR(400, "select date of due!!"));

  try {
    const foundCatg = await CategoryModel.findById(category);
    if (!foundCatg)
      return next(ERROR(400, "select category is not found in categorys List"));
    const todo = new TodoModel({
      user: req.userId,
      task: task,
      category: category,
      date: date,
    });

    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    next(err);
  }
};

exports.getAllTodos = async (req, res, next) => {
  try {
    const todos = await TodoModel.find({ user: req.userId }).populate(
      "category"
    );
    res.status(200).json(todos);
  } catch (err) {
    next(err);
  }
};

exports.getTodoById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const todo = await TodoModel.findById({
      _id: id,
      user: req.userId,
    }).populate("category");
    if (!todo) {
      return next(ERROR(404, "Todo not found"));
    }
    res.status(200).json(todo);
  } catch (err) {
    next(err);
  }
};

exports.updateTodo = async (req, res, next) => {
  const { id, task, category, date } = req.body;

  let updates = {};
  if (task) {
    updates.task = task;
  }

  if (date) {
    updates.date = date;
  }
  try {
    const foundCatg = await CategoryModel.findById(category);
    if (!foundCatg)
      return next(ERROR(400, "select category is not found in categorys List"));
    if (category) {
      updates.category = category;
    }
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      { _id: id, user: req.userId },
      updates,
      {
        new: true,
        runValidators: true,
      }
    ).populate("category");

    if (!updatedTodo) {
      return next(ERROR(404, "Todo not found"));
    }
    res.status(200).json(updatedTodo);
  } catch (err) {
    next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedTodo = await TodoModel.findByIdAndDelete({
      _id: id,
      user: req.userId,
    });
    if (!deletedTodo) {
      return next(ERROR(404, "Todo not found"));
    }
    res.status(204);
  } catch (err) {
    next(err);
  }
};
