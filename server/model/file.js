const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const File = Schema(
  {
    fileId: { type: String, required: true },
    data: { type: String, },
    userId: { type: String, ref: "User" },
    name: { type: String, default: "Untitled"}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("File", File);
