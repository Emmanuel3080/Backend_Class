const express = require("express");
const jwt = require("jsonwebtoken");
const {
  deleteAllUser,
  getAllUserHandler,
  updateUserHandler,
  signUpHandler,
  signInHandler,
  handleUserLogOut,
} = require("../Controller/userControl");
const checkUser = require("../MiddleWares/middleWare1");
const isLoggedIn = require("../MiddleWares/isLoggedIn");
const isAdmin = require("../MiddleWares/isAdmin");
const isVerified = require("../MiddleWares/isVerified");
const tokenModel = require("../Models/BlacklistedToken");
const userSchema = require("../Models/userModel");
cons = require("../MiddleWares/isLoggedIn");
const userRouter = express.Router();

userRouter.post("/user/signup", signUpHandler);
userRouter.post("/user/signin", signInHandler);
userRouter.post("/user/logout", handleUserLogOut);
userRouter.delete("/delete", isAdmin, isVerified, deleteAllUser);
userRouter.get("/user/all", isLoggedIn, getAllUserHandler);
userRouter.patch("/user/:userId/update", isLoggedIn, updateUserHandler);

userRouter.get("/user/verify-token", async (req, res) => {
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
        Mesage: "Token Not Provided",
        Status: "Error",
      });
    }

    const BlacklistedToken = await tokenModel.findOne({ token });
    if (BlacklistedToken) {
      return res.status(401).json({
        Message: "Token has been Blacklisted",
        Status: "Error",
      });
    }

    const verifyToken = await jwt.verify(token, process.env.jwtToken);
    if (!verifyToken) {
      res.status(401).json({
        Message: "Token has expired",
        status : "success"
      });
    }

    //Get the owner of the user of the token

    const user = await userSchema.findById(verifyToken.userId);
    return res.status(201).json({
      Message: "User Verified",
      status : "success", 
      user,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = userRouter;
