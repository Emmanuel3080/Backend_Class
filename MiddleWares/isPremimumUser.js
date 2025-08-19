const tokenModel = require("../Models/BlacklistedToken");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const userSchema = require("../Models/userModel");
dotenv.config();
const isPremiumUser = async (req, res, next) => {
  const user = req.user;

  try {
    if (user.subscriptionPlan !== "premium") {
      res.status(401).json({
        Message:
          "You have to subscribe to premium plan to perform this operation",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid Token Signature" });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token Expired" });
    } else {
      return res
        .status(500)
        .json({ message: "Authentication error", error: error.message });
    }
  }
};

module.exports = isPremiumUser;
