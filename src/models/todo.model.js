const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    task: {
      type: String,
      required: [true, "enter the Task!!"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categorys",
      required: true,
    },
    date: {
      type: Date,
      required: [true, "choose due date!!"],
    },
  },
  {
    timestamps: true,
  }
);
const TodoModel = mongoose.model("Todos", TodoSchema);

module.exports = TodoModel;
