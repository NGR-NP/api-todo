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
      type: String,
      required: [true, "choose due date!!"],
    },
    status:{
      type: String,
      enum: ["completed", "expired", "not completed"]
      ,default: "not completed" 
    }
  },
  
  {
    timestamps: true,
  }
);
TodoSchema.index({ task: "text" });
TodoSchema.index({ date: -1 });
const TodoModel = mongoose.model("Todos", TodoSchema);

module.exports = TodoModel;
