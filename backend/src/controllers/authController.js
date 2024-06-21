const passport = require("passport");

clientUrl = "localhost://4200";

let authController = {
  loginUser: (req, res, next) => {
    passport.authenticate("login", { session: false }, (err, user, info) => {
      if (err) {
        console.log("Error during authentication");
        return next(err);
      }
      const token = user.generateJWT();
      const me = user.toJSON();
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

  googleAuth: passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),

  googleAuthCallback: (req, res, next) => {
    passport.authenticate(
      "google",
      { failureRedirect: "http://localhost:3000/login", session: false },
      (err, user) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.redirect("http://localhost:3000/login");
        }
        const token = user.generateJWT();
        // res.redirect(`http://localhost:3000?token=${token}`);
        return res.json({ user, token });
      }
    )(req, res, next);
  },
};

module.exports = authController;
