const router = require("express").Router();
const authController = require("../controllers/authController");
const { checkNotAuthenticated } = require("../middleware/authMiddleware");

router.get("/login", checkNotAuthenticated, authController.loginPage);
router.post("/login", authController.loginUser);
router.get("/register", authController.registerPage);
router.post("/register", authController.registerUser);
router.post("/logout", authController.logoutUser);
router.get("/auth/google", authController.googleAuth);
router.get("/auth/callback", authController.googleAuthCallback);

module.exports = router;
