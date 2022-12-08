const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = Schema(
  {
    provider: { type: String, require: true },
    displayName: { type: String, required: false },
    email: { type: String, required: true },
    avatar: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model('User',User)