    const mongoose = require("mongoose");

    const CategorySchema = new mongoose.Schema(
      {
        name: {
          type: String,
          required: [true, "enter the category name!!"],
        },
      },
      {
        timestamps: true,
      }
    );
    const CategoryModel = mongoose.model("Categorys", CategorySchema);

    module.exports = CategoryModel;
          