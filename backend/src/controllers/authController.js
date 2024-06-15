const User = require("../models/User");

let authController = {
  login: (req, res) => {
    res.render("login");
  },
  register: async (req, res) => {
    res.send("Login get");
  },
  logout: async (req, res) => {
    res.send("Login get");
  },
};

module.exports = authController;
