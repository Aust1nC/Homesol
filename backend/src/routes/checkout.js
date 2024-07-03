const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

// Create Strip session
router.post("/", async (req, res, next) => {
  try {
    const { items, rentalDuration, userId, address } = req.body;

    const line_items = items.map((item) => ({
      price_data: {
        currency: "gbp",
        product_data: {
          name: item.product.name,
        },
        unit_amount: Math.round(
          (item.product.price * 100 * rentalDuration * 7) / 60
        ), // Stripe expects amounts in cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/order/delivery`,
      metadata: {
        userId: userId,
        street: address.street,
        city: address.city,
        county: address.county,
        postcode: address.postcode,
        rentalDuration: rentalDuration,
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
