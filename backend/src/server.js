const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db.js");
const bodyParser = require("body-parser");
const passport = require("./config/passport");

require("dotenv").config({ path: __dirname + "/.env" });

const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

// Instantiate an Express Application
const app = express();

// Set Ejs view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    origin: CLIENT_URL,
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
app.use("/order", require("./routes/order.js"));
app.use("/admin", require("./routes/admin.js"));
app.use("/auth", require("./routes/auth.js"));
app.use("/checkout", require("./routes/checkout.js"));

// Handle not valid route
app.use("*", (req, res) => {
  res.status(404).json({ status: false, message: "Endpoint Not Found" });
});

// Open Server on selected Port
app.listen(PORT, () => console.info("Server listening on port ", PORT));

module.exports = app;
