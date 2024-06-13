const router = require("express").Router();
const CustomerController = require("../controllers/customerController");

router.get("/customer", CustomerController.all);
router.post("/customer", CustomerController.create);

module.exports = router;
