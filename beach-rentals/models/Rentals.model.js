const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const rentalsSchema = new Schema(
  {
    title: String,
    description: String,
    price: Number,
    rentalPic: { type: String, required: false },
    location: { type: Schema.Types.ObjectId, ref: "Location" },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Rentals", rentalsSchema);
