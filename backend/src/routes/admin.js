const router = require("express").Router();
const adminController = require("../controllers/adminController");

router.get("/user", adminController.all);
router.post("/user", adminController.create);
router.get("/user/:id", adminController.find);
router.patch("/user/:id", adminController.update);
router.delete("/user/:id", adminController.delete);

module.exports = router;
