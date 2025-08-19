// const userSchema = require("../Models/userModel");

const checkUser = (req, res, next) => {
    // const {email}= req.body

    // const verifyEmail = userSchema.findOne()
  if (req.body.email == "emma@gmail.com" && req.method == "POST") {
    return res.status(202).json({
      Message: "Testing Middlewaretypeof first",
    });
  } else {
    next();
  }
};

module.exports = checkUser;
