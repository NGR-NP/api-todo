const UserModel = require("../models/user.model");
const ERROR = require("../utils/ERROR");
exports.getUserById = async (req, res, next) => {
  const id = req.userId;
  try {
    const user = await UserModel.findById(id).select("-password").lean();
    if (!user) {
      return next(ERROR(404, "User not found"));
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
exports.updateUser = async (req, res, next) => {
  const id = req.userId;
  try {
    const updates = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return next(ERROR(404, "User not found"));
    }
    res.status(201).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
exports.deleteUser = async (req, res, next) => {
  const id = req.userId;
  try {
    const deletedUser = await UserModel.findByIdAndRemove(id);
    if (!deletedUser) {
      return next(ERROR(404, "User not found"));
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
