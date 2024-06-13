const Customer = require("../models/Customer");
const CustomerModel = require("../models/Customer");

let CustomerController = {
  all: async (req, res) => {
    try {
      let found = await CustomerModel.find();
      res.json(found);
    } catch (error) {
      res.status(500).send({ error: error.message });
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
      res.status(500).send({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      let newCustomer = new CustomerModel(req.body);
      let savedCustomer = await newCustomer.save();
      res.status(201).json(savedCustomer);
    } catch (error) {
      res.status(409).send({
        error: error.message,
      });
    }
  },

  // update: async (req, res) => {
  //   try {
  //     let found = await CustomerModel.findById(req.params.id);

  //     if (found) {
  //       let updated = await CustomerModel.findByIdAndUpdate(
  //         req.params.id,
  //         req.body,
  //         { new: true, runValidators: true }
  //       );
  //       res.status(200).json(updated);
  //     } else {
  //       res.status(404).send({ message: "Data not found" });
  //     }
  //   } catch (error) {
  //     res.status(500).send({ error: error.message });
  //   }
  // },

  delete: async (req, res) => {
    try {
      let id = req.params.id;
      let result = await CustomerModel.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        return res.status(404).send({ error: "Customer not found." });
      }
      res.json({ message: "Customer deleted." });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },
};

module.exports = CustomerController;
