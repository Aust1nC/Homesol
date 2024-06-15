const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db.js");
const ProductController = require("./controllers/productControllere.js");
require("dotenv").config({ path: "../.env" });

const PORT = process.env.PORT;

// Instantiate an Express Application
const app = express();

// Configure Express App Instance
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Connect to database
connectDB();

app.use(cookieParser());
app.use(cors());
app.use(helmet());

// This middleware adds the json header to every response
app.use("*", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

// Assign Routes
app.use("/", require("./routes/customer.js"));
app.use("/", require("./routes/product.js"));

// Handle not valid route
app.use("*", (req, res) => {
  res.status(404).json({ status: false, message: "Endpoint Not Found" });
});

// Open Server on selected Port
app.listen(PORT, () => console.info("Server listening on port ", PORT));
