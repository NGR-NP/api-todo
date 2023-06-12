const CategoryModel = require("../models/category.model");

const TodoModel = require("../models/todo.model");
const ERROR = require("../utils/ERROR");

exports.createTodo = async (req, res, next) => {
  const { task, category, date } = req.body;
  if (!task) return next(ERROR(400, "enter new task!!"));
  if (!category) return next(ERROR(400, "choose the category!!"));
  if (!date) return next(ERROR(400, "select date of due!!"));
  // const currentDate = new Date();
  // if () {
  //   return next(ERROR(400, "deu date can't be in past"));
  // }

  try {
    const foundCatg = await CategoryModel.findById(category);
    if (!foundCatg)
      return next(ERROR(400, "select category is not found in categorys List"));
    const todo = new TodoModel({
      user: req.userId,
      task: task,
      category: category,
      date,
    });

    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    next(err);
  }
};

exports.getAllTodos = async (req, res, next) => {
  const { filter } = req.query;
  let query;
  const currentDate = new Date();
  let formattedDate = currentDate.toISOString().slice(0, 10);
  if (filter === "today") {
    query = formattedDate;
  } else if (filter === "tomorrow") {
    currentDate.setDate(currentDate.getDate() + 1);
    query = formattedDate;
  } else if (filter === "day-after-tomorrow") {
    currentDate.setDate(currentDate.getDate() + 2);
    query = formattedDate;
  }
  // else if (filter) {
  //   query = filter;
  // }

  const getTodos = query
    ? TodoModel.find({ user: req.userId, date: query })
        .populate("category")
        .sort({ _id: -1 })
    : TodoModel.find({ user: req.userId })
        .populate("category")
        .sort({ _id: -1 });
  try {
    const todos = await getTodos;
    res.status(200).json(todos);
  } catch (err) {
    next(err);
  }
};

exports.getTodoById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const todo = await TodoModel.find({
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
exports.searchTodo = async (req, res, next) => {
  const { search } = req.query;

  if (!search) return next(ERROR(400, "enter the task you want to search"));

  if (search.length < 3)
    return next(ERROR(400, "please enter more then 3 letter to search"));
  try {
    const result = await TodoModel.find(
      { user: req.userId },
      { $text: { $search: search } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
exports.getTodaysTodo = async (req, res, next) => {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 10);
  try {
    const todayTodo = await TodoModel.find({ user: req.userId, date: formattedDate })
      .populate("category")
      .sort({
        _id: -1,
      });
    res.status(200).json(todayTodo);
  } catch (err) {
    next(err);
  }
};

exports.updateTodo = async (req, res, next) => {
  const { id, task, category, date, status } = req.body;
  // const {id}= req.params
  if (!id) return next(ERROR(400, "enter id of todo"));
  let updates;
  if (task) {
    updates = { task };
  }

  if (date) {
    updates = { date };
  }
  if (status) {
    updates = { status };
  }
  if (!updates) return next(ERROR(400, "nothign to update!!"));
  try {
    if (category) {
      const foundCatg = await CategoryModel.findById(category);
      if (!foundCatg)
        return next(
          ERROR(400, "select category is not found in categorys List")
        );
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
  const { id } = req.body;
  try {
    const deletedTodo = await TodoModel.findByIdAndDelete({
      _id: id,
      user: req.userId,
    });
    if (!deletedTodo) {
      return next(ERROR(404, "Todo not found"));
    }
    res.status(200).json(deletedTodo);
  } catch (err) {
    next(err);
  }
};
