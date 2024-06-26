const router = require("express").Router();
const UserController = require("../controllers/UserController");

router.get("/user", UserController.all);
router.post("/user", UserController.create);
router.get("/user/:id", UserController.find);
router.patch("/user/:id", UserController.update);
router.delete("/user/:id", UserController.delete);

module.exports = router;
