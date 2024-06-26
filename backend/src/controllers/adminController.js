const User = require("../models/User");

let AdminController = {
  all: async (req, res) => {
    try {
      let found = await User.find();
      res.json(found);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  find: async (req, res) => {
    try {
      let found = await User.findById(req.params.id);
      if (!found) {
        return res.status(404).send({ error: "User not found." });
      }
      res.json(found);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  create: async (req, res) => {
    try {
      let newUser = new User(req.body);
      let savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(409).send({
        message: error.message,
      });
    }
  },

  update: async (req, res) => {
    try {
      let found = await User.findById(req.params.id);

      if (found) {
        let updated = await User.findOneAndUpdate(
          { _id: req.params.id },
          req.body,
          { new: true, runValidators: true }
        );
        res.status(200).json(updated);
      } else {
        res.status(404).send({ message: "Data not found" });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      let id = req.params.id;
      let result = await User.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        return res.status(404).send({ error: "User not found." });
      }
      res.json({ message: "User deleted." });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};

module.exports = AdminController;
