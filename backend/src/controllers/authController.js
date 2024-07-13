const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

clientUrl = process.env.CLIENT_URL;

let authController = {
  loginUser: (req, res, next) => {
    passport.authenticate("login", { session: false }, (err, user, info) => {
      if (err) {
        console.log("Error during authentication");
        return next(err);
      }
      const token = user.generateJWT();
      const me = {
        _id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
        subscription: user.subscription,
        startDate: user.startDate,
        endDate: user.endDate,
      };

      return res.json({ me, token });
    })(req, res, next);
  },

  logoutUser: async (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Server error during logout" });
      }
      res.json({ message: "logged out successfully." });
    });
  },

  registerUser: (req, res, next) => {
    passport.authenticate("register", { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.status(400).json({ message: info.message });
      }

      res.json({
        message: "Signup successful",
        user: user,
      });
    })(req, res, next);
  },

  updateUser: async (req, res) => {
    const found = await User.findById(req.params.id);
    try {
      if (found) {
        const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });
        res.status(200).json({ me: updated });
      } else {
        res.status(404).send({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).send({ messgae: error.message });
    }
  },

  googleAuth: passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),

  googleAuthCallback: (req, res, next) => {
    passport.authenticate(
      "google",
      { failureRedirect: `${clientUrl}/login`, session: false },
      (err, user) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.redirect(`${clientUrl}/login`);
        }
        const token = user.generateJWT();
        res.cookie("token", token, { httpOnly: true });
        return res.redirect(`${clientUrl}/auth/auth-callback`);
      }
    )(req, res, next);
  },

  getUserDetails: async (req, res) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ message: "No token found" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded._id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({
        me: {
          _id: user._id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          createdAt: user.createdAt,
          subscription: user.subscription,
          startDate: user.startDate,
          endDate: user.endDate,
        },
        token,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },
};

module.exports = authController;
