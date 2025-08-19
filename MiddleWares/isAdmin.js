const tokenModel = require("../Models/BlacklistedToken");

const jwt = require("jsonwebtoken");
const userSchema = require("../Models/userModel");

const isAdmin = async (req, res, next) => {
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
        Message: "Token Not Provided",
      });
    }

    //Check if the token has been blacklisted

    const BlacklistedToken = await tokenModel.findOne({ token });
    if (BlacklistedToken) {
      return res.status(401).json({
        Message: "Token has been blacklisted",
      });
    }

    //verify Token

    const verifyToken = await jwt.verify(token, process.env.jwtToken);
    // if(!veri)

    //Get information of user
    const user = await userSchema.findById(verifyToken.userId);
    req.user = user;

    if (user.role !== "admin") { 
      return res.status(401).json({
        Message: "You're not authorized to perform this operation, You're not an Admin",
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

module.exports = isAdmin;
