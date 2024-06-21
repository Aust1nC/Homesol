const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");
require("dotenv").config({ path: "../.env" });

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const { email } = req.body;
      try {
        const found = await User.findOne({ email });
        if (found) {
          return done(null, false, { message: "Email already registered" });
        }

        const newUser = await new User({ username, email, password });
        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: "User not found." });
        }
        const isMatch = await user.isValidPassword(password);

        if (!isMatch) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user, { message: "Logged in Successfully." });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwt_payload, done) => {
      try {
        console.log(jwt_payload);
        const user = await User.findById(jwt_payload._id);

        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error, false);
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
        let user = await User.findOne({ googleId: email.id });
        console.log("profile: ", profile);
        // console.log("email: ", email);

        if (user) {
          // console.log("User found", user);
          return done(null, user);
        } else {
          user = new User({
            googleId: email.id,
            email: email.emails[0].value,
            username: email.displayName,
          });
          await user.save();
          done(null, user);
          // console.log("User created", user);
        }
      } catch (error) {
        console.log("Error ", error);
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
