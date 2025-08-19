const mongoose = require("mongoose");
const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    select: false,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin", "seller"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  subscription: {
    type : String,
    default : "INACTIVE",
    enum : ["ACTIVE","INACTIVE"]
  },
  subscriptionPlan: {
    type: String,
    default: "free",
    enum: ["free", "basic", "premium"],
  },
});

const userSchema = mongoose.model("emmaUsers", userModel);
module.exports = userSchema;
