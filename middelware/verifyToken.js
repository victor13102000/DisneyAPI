const User = require("../models/user");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) res.status(403).json({ msg: "No token provider" });
  
    const decoded = jwt.verify(token, "secret");
  
    const emailUser = decoded.email;
  
    const user = User.findOne({
      where: {
        email: emailUser,
      },
    });
    if(!user) res.status(404).json({msg:"user not found"})
  
  next()
  } catch (error) {
      res.status(401).json({msg:"unauthorized"})
  }
};

module.exports = verifyToken;
