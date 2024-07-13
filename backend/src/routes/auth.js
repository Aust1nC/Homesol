const router = require("express").Router();
const authController = require("../controllers/authController");

router.post("/login", authController.loginUser);
router.post("/register", authController.registerUser);
router.patch("/update/:id", authController.updateUser);
router.post("/logout", authController.logoutUser);
router.get("/google", authController.googleAuth);
router.get("/google/callback", authController.googleAuthCallback);
router.get("/user-details", authController.getUserDetails);

module.exports = router;
