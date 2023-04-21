const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const locationSchema = new Schema(
  {
    street: String,
    city: String,
    state: String,
    zip: Number,
    name: { type: String, required: true },
    rentals: [{ type: Schema.Types.ObjectId, ref: "Rentals" }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Location", locationSchema);
