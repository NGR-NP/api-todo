const CategoryModel = require("../models/category.model");
const TodoModel = require("../models/todo.model");
const ERROR = require("../utils/ERROR");
exports.createCategory = async (req, res, next) => {
  const name = req.body.name.toLowerCase();
  if (!name) return next(ERROR(400, "enter category name!!"));
  try {
    const category = new CategoryModel({
      name: name,
    });

    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    next(err);
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await CategoryModel.find();
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

exports.getCategoryById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await CategoryModel.findById(id);
    if (!category) {
      return next(ERROR(404, "Category not found"));
    }
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

exports.updateCategory = async (req, res, next) => {
  const { id } = req.body;
  const name = req.body.name.toLowerCase();
  if (!name)
    return next(ERROR(400, "enter the category name you want to update!!"));
  try {
    const updates = {
      name: name,
    };

    const updatedCategory = await CategoryModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedCategory) {
      return next(ERROR(404, "Category not found"));
    }
    res.status(200).json(updatedCategory);
  } catch (err) {
    next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedCategory = await CategoryModel.findByIdAndRemove(id);
    if (!deletedCategory) {
      return next(ERROR(404, "Category not found"));
    }
    res.status(200).json(deletedCategory);
  } catch (err) {
    next(err);
  }
};

exports.getTodoCountsByCategory = async (req, res, next) => {
  try {
    const categories = await TodoModel.aggregate([
      {
        $lookup: {
          from: "categorys", // collection name of categories
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $group: {
          _id: "$category.name",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          category: "$_id",
          count: 1,
          _id: 0,
        },
      },
    ]);
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};
