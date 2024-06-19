const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/User");

let authController = {
  loginUser: (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        console.log("Error during authentication");
        return next(err);
      }
      if (!user) {
        console.log("User not found");
        return res.status(400).json({ message: info.message });
      }
      req.logIn(user, (err) => {
        if (err) {
          console.log("Error during login");
          return next(err);
        }
        console.log("Login successful");
        return res.json(user);
      });
    })(req, res, next);
  },

  logoutUser: async (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Server error during logout" });
      }
    });
  },

  registerUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      let existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(200).json({ message: "User created" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },

  googleAuth: passport.authenticate("google", { scope: ["profile", "email"] }),

  googleAuthCallback: passport.authenticate("google", {
    failureRedirect: "http://localhost:4200/login",
    successRedirect: "http://localhost:4200",
  }),
};

module.exports = authController;
