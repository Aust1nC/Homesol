const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/User");

let authController = {
  loginPage: (req, res) => {
    res.render("login", { message: req.query.error });
  },

  loginUser: (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect("/login?error=" + info.message);
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect("/");
      });
    })(req, res, next);
  },

  logoutUser: async (req, res) => {
    req.logout(() => res.redirect("/login"));
  },

  registerPage: async (req, res) => {
    res.render("register");
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
      res.redirect("/login");
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  },

  googleAuth: passport.authenticate("google", { scope: ["profile", "email"] }),

  googleAuthCallback: passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/",
  }),
};

module.exports = authController;
