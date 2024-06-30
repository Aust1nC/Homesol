const Order = require("../models/Order");

let OrderController = {
  create: async (req, res) => {
    try {
      const newOrder = await Order.create(req.body);
      res.status(200).json(newOrder);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};

module.exports = OrderController;
