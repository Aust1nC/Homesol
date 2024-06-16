const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");
require("dotenv").config({ path: "../.env" });

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    async (token, tokenSecret, profile, email, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        } else {
          user = new User({
            googleId: profile.id,
            email: email.emails[0].value,
            username: email.displayName,
          });
          await user.save();
          done(null, user);
        }
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// Persist user data inside session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Fetches session details using session id
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(err, null);
  }
});

module.exports = passport;
