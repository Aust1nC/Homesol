const assert = require("assert");
const sinon = require("sinon");
const app = require("../server");
const Product = require("../models/Product");
const ProductController = require("../controllers/productController");

require("dotenv").config({ path: "../../.env" });
console.log(process.env.JWT_SECRET);

describe("ProductController", () => {
  describe("all", () => {
    it("should return all products", async () => {
      const mockProducts = [
        { name: "Product 1", price: 10, category: "kitchen" },
        { name: "Product 2", price: 20, category: "technology" },
      ];
      const findStub = sinon.stub(Product, "find").resolves(mockProducts);

      try {
        const res = await app.inject({
          method: "GET",
          url: "/product",
        });

        assert.strictEqual(res.status, 200);
        assert(Array.isArray(res.body));
        assert.deepStrictEqual(res.body, mockProducts);
      } finally {
        findStub.restore();
      }
    });

    it("should handle errors", async () => {
      const errorMessage = "Database error";
      const findStub = sinon
        .stub(Product, "find")
        .rejects(new Error(errorMessage));

      try {
        const res = await app.inject({
          method: "GET",
          url: "/product",
        });
        assert.strictEqual(res.status, 500);
        assert.strictEqual(res.body.message, errorMessage);
      } finally {
        findStub.restore();
      }
    });
  });
});
