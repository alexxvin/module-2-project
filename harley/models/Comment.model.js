const { Schema, model } = require("mongoose");
const commentSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    content: String,
  },

  {
    timestamps: true,
  }
);

module.exports = model("Comment", commentSchema);
