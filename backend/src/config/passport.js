const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");
require("dotenv").config({ path: __dirname + "/../../.env" });

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const { firstName, lastName, email } = req.body;
      try {
        console.log("Registering user:", username, email);
        const found = await User.findOne({ email });
        if (found) {
          console.log("Email exists");
          return done(null, false, { message: "Email already registered" });
        }

        const newUser = new User({
          username,
          firstName,
          lastName,
          email,
          password,
        });
        await newUser.save();
        console.log("Registered");

        return done(null, newUser);
      } catch (error) {
        console.log("Error during registration", error);

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
    async (accessToken, refreshToken, profile, email, done) => {
      try {
        let oldUser = await User.findOne({ googleId: email.id });

        if (oldUser) {
          return done(null, oldUser);
        }
      } catch (err) {
        console.log(err);
      }
      try {
        const newUser = await new User({
          googleId: email.id,
          firstName: email._json.given_name,
          lastName: email._json.family_name,
          email: email._json.email,
          username: email.displayName,
        }).save();
        done(null, newUser);
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
