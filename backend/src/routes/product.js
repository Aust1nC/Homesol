const router = require("express").Router();
const ProductController = require("../controllers/productControllere");

router.get("/", ProductController.all);
router.post("/", ProductController.create);
router.get("/:id", ProductController.find);
router.patch("/:id", ProductController.update);
router.delete("/:id", ProductController.delete);

module.exports = router;
