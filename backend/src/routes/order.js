const router = require("express").Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create-order", orderController.create);
router.get("/get", authMiddleware, orderController.get);

module.exports = router;
