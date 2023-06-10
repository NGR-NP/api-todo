const UserModel = require("../models/user.model");
const ERROR = require("../utils/ERROR");

// Get a user by ID
async function getUserById(req, res, next) {
  try {
    const id = req.userId;
    const user = await UserModel.findById(id).select("-password").lean();
    if (!user) {
      return next(ERROR(404, "User not found"));
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

// Update a user
async function updateUser(req, res, next) {
  try {
    const id = req.userId;
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
}

// Delete a user
async function deleteUser(req, res, next) {
  try {
    const id = req.userId;
    const deletedUser = await UserModel.findByIdAndRemove(id);
    if (!deletedUser) {
      return next(ERROR(404, "User not found"));
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUserById,
  updateUser,
  deleteUser,
};
