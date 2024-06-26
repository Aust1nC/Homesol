const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db.js");
const passport = require("./config/passport");

require("dotenv").config({ path: "../.env" });

const PORT = process.env.PORT;

// Instantiate an Express Application
const app = express();

// Set Ejs view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);
app.use(helmet());

// Passport middleware
app.use(passport.initialize());

// Connect to database
connectDB();

// Assign Routes
app.use("/product", require("./routes/product.js"));
app.use("/admin", require("./routes/admin.js"));
app.use("/auth", require("./routes/auth.js"));

// API testing
// app.get("/", (req, res) => res.render("home"));
// app.get("/auth/login", (req, res) => res.render("login"));
// app.get("/auth/register", (req, res) => res.render("register"));
// app.get(
//   "/user/profile",
//   passport.authenticate("jwt", { session: false }),
//   (req, res, next) => {
//     res.json({
//       message: "You made it to the secure route",
//       user: req.user,
//       token: req.query.token,
//     });
//   }
// );

// Handle not valid route
app.use("*", (req, res) => {
  res.status(404).json({ status: false, message: "Endpoint Not Found" });
});

// Open Server on selected Port
app.listen(PORT, () => console.info("Server listening on port ", PORT));
