const router = require("express").Router();
const ProductController = require("../controllers/productControllere");

router.get("/product", ProductController.all);
router.post("/product", ProductController.create);
router.get("/product/:id", ProductController.find);
router.patch("/product/:id", ProductController.update);
router.delete("/product/:id", ProductController.delete);

module.exports = router;
