const Order = require("../models/Order");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

let OrderController = {
  // create: async (req, res) => {
  //   try {
  //     const newOrder = await Order.create(req.body);
  //     res.status(200).json(newOrder);
  //   } catch (error) {
  //     res.status(500).send({ message: error.message });
  //   }
  // },

  create: async (req, res) => {
    const { sessionId } = req.body;
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      console.log(session);
    } catch (error) {}
  },
};

module.exports = OrderController;
