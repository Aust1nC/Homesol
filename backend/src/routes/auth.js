const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/login", authController.loginUser);
router.post("/register", authController.registerUser);
router.patch("/update/:id", authController.updateUser);
router.post("/logout", authController.logoutUser);
router.get("/google", authController.googleAuth);
router.get("/callback", authController.googleAuthCallback);

module.exports = router;
