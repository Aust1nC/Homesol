const CustomerModel = require("../models/Customer");

let CustomerController = {
  all: async (req, res) => {
    try {
      let found = await CustomerModel.find();
      res.json(found);
    } catch (error) {
      res
        .status(500)
        .send({ error: "An error occurred while fetching customers." });
    }
  },

  find: async (req, res) => {
    try {
      let found = await CustomerModel.findById(req.params.id);
      if (!found) {
        return res.status(404).send({ error: "Customer not found." });
      }
      res.json(found);
    } catch (error) {
      res
        .status(500)
        .send({ error: "An error occurred while fetching the customer." });
    }
  },

  create: async (req, res) => {
    try {
      let newCustomer = new CustomerModel(req.body);
      let savedCustomer = await newCustomer.save();
      res.status(201).json(savedCustomer);
    } catch (error) {
      res
        .status(409)
        .send({ error: "An error occurred while creating the customer." });
    }
  },

  delete: async (req, res) => {
    try {
      let id = req.params.id;
      let result = await CustomerModel.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        return res.status(404).send({ error: "Customer not found." });
      }
      res.json({ message: "Customer deleted." });
    } catch (error) {
      res
        .status(500)
        .send({ error: "An error occurred while deleting the customer." });
    }
  },
};

module.exports = CustomerController;
