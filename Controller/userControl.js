const bcrypt = require("bcryptjs");
const userSchema = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const { findOne } = require("../Models/productModel");
const tokenModel = require("../Models/BlacklistedToken");
const { VirtualType } = require("mongoose");

const nodemailer = require("nodemailer");
const sendEmail = require("../utils/sendEmail");

const signUpHandler = async (req, res) => {
  const { password, email, name } = req.body;
  try {
    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const UserSignUp = await userSchema.create({
      ...req.body,
      password: hashedPassword,
    });
    const sendMails = sendEmail(email,name)  ///Send Email function invoked here
    if (!UserSignUp) {
      res.status(404).json({
        Message: "Sign Up Failed",
        Status: "error",
      });
    }
    return res.status(201).json({
      Message: "User Sign Up Successful",
      Status: "success",
      User: UserSignUp,
      sendMails
    });
  } catch (error) {
    console.log(error);
  }
};

const signInHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    //Verify User by it's email first
    const verifyUser_Email = await userSchema
      .findOne({ email })
      .select("+password");
    if (!verifyUser_Email) {
      res.status(404).json({
        Message: "Email or password incorrect",
        Status: "error",
      });
    }
    // return res.status(201).json({
    //   verifyUser_Email
    // });

    //Verify the user Password
    const checkPassword = await bcrypt.compare(
      password,
      verifyUser_Email.password
    );
    if (!checkPassword) {
      res.status(404).json({
        Message: "Email or passworddd incorectt jhor",
        Status: "error",
      });
    }
    // return res.status(201).json({
    //   checkPassword
    // })

    //Generate token for user
    const generateToken = await jwt.sign(
      { userId: verifyUser_Email.id, email: verifyUser_Email.email },
      process.env.jwtToken,
      {
        expiresIn: process.env.JWTEXP,
      }
    );
    return res.status(201).json({
      Message: "Sign In Succesful",
      Status: "Success",
      IsPasswordVerified: checkPassword,
      User: verifyUser_Email,
      Token: generateToken,
    });
  } catch (error) {
    console.log(error);
  }
};

const handleUserLogOut = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    res.status(401).json({
      Message: "Token not provided",
      Status: "error",
    });
  }
  try {
    const checkToken = await jwt.verify(token, process.env.jwtToken);
    if (!checkToken) {
      return res.status(401).json({
        Message: "Token doesn't exist",
        status: "failed",
      });
    }
    //  return res.status(201).json({
    //   checkToken
    //  })

    await tokenModel.create({ token });
    return res.status(201).json({
      Message: "Logged Out Sucessful",
      doesTokenExist: checkToken,
      status: "success",
    });
  } catch (error) {
    // console.log(error);
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
const getAllUserHandler = async (req, res) => {
  console.log(req.user);

  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(404).json({
        Message: "Token Not Provided",
      });
    }

    const eachToken = await jwt.verify(token, process.env.jwtToken);
    const showAllUser = await userSchema.find();
    if (!showAllUser) {
      res.status(404).json({
        Message: "All Users unable to fetch",
        Status: "Error",
      });
    }

    // const userEmailWithToken =  await userSchema.findById()
    return res.status(200).json({
      Message: "All user Fetched",
      Status: "Successs",
      token,
      No_of_users: showAllUser.length,
      currenUser: eachToken,
      Users: showAllUser,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteAllUser = async (req, res) => {
  // console.log(req.user);

  try {
    const deleteAll = await userSchema.deleteMany({});

    if (!deleteAll) {
      res.status(404).json({
        Status: "Error",
        Message: "Unable to delete all User",
      });
    }
    return res.status(200).json({
      Message: "All User Deleted",
      Status: "Success",
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUserHandler = async (req, res) => {
  const { userId } = req.params;
  try {
    const updateUser = await userSchema.findByIdAndUpdate(userId, req.body);
    if (!updateUser) {
      res.status(400).json({
        Message: "Failed to Update",
        Status: "Error",
      });
    }
    return res.status(200).json({
      Message: "Update Successful",
      Status: "Success",
      user: updateUser,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  deleteAllUser,
  getAllUserHandler,
  updateUserHandler,
  signUpHandler,
  signInHandler,
  handleUserLogOut,
};
