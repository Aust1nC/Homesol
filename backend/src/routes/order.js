const router = require("express").Router();
const orderController = require("../controllers/orderController");

router.post("/create-order", orderController.create);

module.exports = router;
