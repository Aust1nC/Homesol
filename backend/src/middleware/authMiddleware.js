const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    console.log("No token provided");
    return res.status(401).send({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      console.log("User not found");
      res.status(401).send({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Failed to authenticate token:", error);
    res.status(401).send({ message: "Failed to authenticate token" });
  }
};

module.exports = authMiddleware;
