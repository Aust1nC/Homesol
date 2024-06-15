const Customer = require("../models/Customer");

let CustomerController = {
  all: async (req, res) => {
    try {
      let found = await Customer.find();
      res.json(found);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  find: async (req, res) => {
    try {
      let found = await Customer.findById(req.params.id);
      if (!found) {
        return res.status(404).send({ error: "Customer not found." });
      }
      res.json(found);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  create: async (req, res) => {
    try {
      let newCustomer = new Customer(req.body);
      let savedCustomer = await newCustomer.save();
      res.status(201).json(savedCustomer);
    } catch (error) {
      res.status(409).send({
        message: error.message,
      });
    }
  },

  update: async (req, res) => {
    try {
      let found = await Customer.findById(req.params.id);

      if (found) {
        let updated = await Customer.findOneAndUpdate(
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
      let result = await Customer.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        return res.status(404).send({ error: "Customer not found." });
      }
      res.json({ message: "Customer deleted." });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};

module.exports = CustomerController;
