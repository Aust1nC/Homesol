const passport = require("passport");

clientUrl = "localhost://4200";

let authController = {
  loginUser: (req, res, next) => {
    passport.authenticate("login", { session: false }, (err, user, info) => {
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
        const token = user.generateJWT();
        return res.json({ user, token });
      });
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
    passport.authenticate("register", { sesison: false }, (err, user, info) => {
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

  googleAuth: passport.authenticate("google", { scope: ["profile", "email"] }),

  googleAuthCallback: passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
    successRedirect: "http://localhost:3000",
  }),
};

module.exports = authController;
