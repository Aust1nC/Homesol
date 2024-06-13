const router = require("express").Router();
const CustomerController = require("../controllers/customerController");

router.get("/customer", CustomerController.all);
router.post("/customer", CustomerController.create);
router.get("/customer/:id", CustomerController.find);
router.patch("/customer/:id", CustomerController.create);
router.delete("/customer/:id", CustomerController.delete);

module.exports = router;
