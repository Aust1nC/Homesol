const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET);

router.post("/", async (req, res, next) => {
  try {
    const { items, rentalDuration } = req.body;

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
      success_url: `${process.env.CLIENT_URL}/checkout/success`,
      cancel_url: `${process.env.CLIENT_URL}/order/delivery`,
    });

    res.json({ id: session.id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
