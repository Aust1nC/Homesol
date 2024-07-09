const Order = require("../models/Order");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const Product = require("../models/Product");
const User = require("../models/User");
const sendMail = require("../util/smtp");
const { inspect } = require("util");

let OrderController = {
  create: async (req, res) => {
    const { sessionId } = req.body;
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["line_items"],
      });

      // Lookup Product and create item list
      const items = await getOrderItems(session.line_items.data);

      // Create a new Order
      const newOrder = await createOrder(session, items);

      // Send email notification
      await sendOrderConfirmationEmail(session, newOrder);

      // Update user subscription status and dates
      const updatedUser = await updateUserSubscription(session);

      res.status(200).json({ order: newOrder, user: updatedUser });
    } catch (error) {
      console.log("Error craeting order:", error);
      res.status(500).send({ message: error.message });
    }
  },

  get: async (req, res) => {
    try {
      const orders = await Order.findOne({ user: req.user._id })
        .populate({
          path: "items.product",
          select: "name category",
        })
        .exec();
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(401).send({ message: error.message });
    }
  },
};

const getOrderItems = async (lineItems) => {
  const productPromises = lineItems.map(async (item) => {
    const product = await Product.findOne({ name: item.description });

    if (!product) {
      throw new Error(`Product not found: ${item.description}`);
    }
    return {
      product: product._id,
      quantity: item.quantity,
    };
  });
  return Promise.all(productPromises);
};

const createOrder = async (session, items) => {
  const { amount_total, metadata } = session;

  return Order.create({
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
};

const sendOrderConfirmationEmail = async (session, order) => {
  const { metadata } = session;

  const emailUser = await User.findById(metadata.userId);
  const emailSubject = "Homesol - Your Order Confirmation";
  const emailText = `Hello ${emailUser.firstName} ${emailUser.lastName}! \n\nYour order has been received successfully. \n\nOrder number: ${order._id} \n\nThank you for choosing Homesol!`;
  const emailHtml = `<p>Hello ${emailUser.firstName} ${emailUser.lastName}!</p>
  <p>Your order has been received successfully.</p>
  <p>Your order number: <b>${order._id}</b></p>
  <p>Thank you for choosing Homesol!</p>`;

  await sendMail(emailUser.email, emailSubject, emailText, emailHtml);
};

const updateUserSubscription = async (session) => {
  const { metadata } = session;
  const rentalDuration = parseInt(metadata.rentalDuration, 10); // Ensure rentalDuration is an integer
  const user = await User.findById(metadata.userId);

  try {
    if (!user.subscription) {
      user.subscription = true;
      user.startDate = new Date(); // Set the start date to the current date

      // Calculate the new end date based on the start date
      let newEndDate = new Date(user.startDate);
      newEndDate.setMonth(newEndDate.getMonth() + rentalDuration);

      user.endDate = newEndDate;
    } else {
      // User has an existing subscription, update the end date based on the current end date
      let newEndDate = new Date(user.endDate);
      newEndDate.setMonth(newEndDate.getMonth() + rentalDuration);

      user.endDate = newEndDate;
    }

    await user.save();

    return user;
  } catch (error) {
    console.log(error);
  }
};

module.exports = OrderController;
