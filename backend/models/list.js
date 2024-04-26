const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
    image: {
      type: String,
    },
    user: [
      {
        type: mongoose.Types.ObjectId,
        ref: "UserSchema",
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("ListSchema", listSchema);
