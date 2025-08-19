const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
});

const tokenModel = mongoose.model("BlacklistedToken", tokenSchema);
module.exports = tokenModel;
