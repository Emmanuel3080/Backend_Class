const tokenModel = require("../Models/BlacklistedToken");

const jwt = require("jsonwebtoken");
const userSchema = require("../Models/userModel");

const isLoggedIn = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        Message: "Log in first , token was not Provided",
        Status: "error",
      });
    }
    //Check if the token has been blacklisted
    const BlacklistedToken = await tokenModel.findOne({ token });
    if (BlacklistedToken) {
      return res.status(401).json({
        Message: "Token has been blacklisted",
      });
    }

    //Check if token is still valid
    const verifyToken = await jwt.verify(token, process.env.jwtToken);
    if (!verifyToken) {
      return res.status(401).json({
        Message: "Token has expired",
      });
    }

    //Get the identity of the user
    const user = await userSchema.findById(verifyToken.userId);
    req.user = user;

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

module.exports = isLoggedIn;
