// models/Bike.model.js

const { Schema, model } = require("mongoose");
const bikeSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    make: {
      type: String,
      required: [true, "make is required"],
    },
    model: {
      type: String,
      required: [true, "model is required"],
    },
    modelFamily: {
      type: String,
      required: [true, "model family is required"],
    },
    year: {
      type: String,
      required: [true, "year is required"],
    },
    color: {
      type: String,
      required: [true, "color is required"],
    },
    engine: {
      type: String,
      required: [true, "engine is required"],
    },
    mileage: {
      type: String,
      required: [true, "mileage is required"],
    },
    description: {
      type: String,
      required: false,
    },
    bikeCondition: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: [true],
    },
    // comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Bike", bikeSchema);
