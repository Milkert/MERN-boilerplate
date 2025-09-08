const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const user = mongoose.model("User", userSchema);

module.exports = user;