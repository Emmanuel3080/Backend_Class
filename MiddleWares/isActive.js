const tokenModel = require("../Models/BlacklistedToken");

const isActive = async (req, res, next) => {
  const user = req.user;

  if (user.subscription !== "ACTIVE") {
    return res.status(401).json({
      Message: "You're Not Activeee",
    });
  }
  next()
};


module.exports = isActive