const Order = require("../models/Order");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const Product = require("../models/Product");
const User = require("../models/User");
const sendMail = require("../util/smtp");

let OrderController = {
  create: async (req, res) => {
    const { sessionId } = req.body;
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["line_items"],
      });
      const { amount_total, metadata, line_items } = session;
      const productPromises = line_items.data.map(async (item) => {
        const product = await Product.findOne({ name: item.description });
        if (!product) {
          throw new Error(`Product not found: ${item.description}`);
        }
        return {
          product: product._id,
          quantity: item.quantity,
        };
      });

      const items = await Promise.all(productPromises);

      const newOrder = await Order.create({
        user: metadata.userId,
        items: items,
        orderDate: new Date(),
        address: {
          street: metadata.street,
          city: metadata.city,
          county: metadata.county,
          postcode: metadata.postcode,
        },
        status: "Pending",
        price: amount_total / 100,
      });

      const user = await User.findById(metadata.userId);
      const subject = "Homesol - Your Order Confirmation";
      const text = res.status(200).json(newOrder);
    } catch (error) {
      console.log("Error craeting order:", error);
      res.status(500).send({ message: error.message });
    }
  },
};

module.exports = OrderController;
