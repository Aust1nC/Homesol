const assert = require("assert");
const sinon = require("sinon");
const app = require("../server");
const Product = require("../models/Product");
const ProductController = require("../controllers/productController");
const request = require("supertest");

describe("ProductController", () => {
  describe("all", () => {
    it("should return all products", async () => {
      const mockProducts = [
        { name: "Product 1", price: 10, category: "kitchen" },
        { name: "Product 2", price: 20, category: "technology" },
      ];

      // Stub the Product.find method to return mockProducts
      const findStub = sinon.stub(Product, "find").resolves(mockProducts);

      try {
        // Use supertest to make a request to your app
        const res = await request(app).get("/product");

        assert.strictEqual(res.status, 200);
        assert(Array.isArray(res.body));
        assert.deepStrictEqual(res.body, mockProducts);
      } finally {
        findStub.restore();
      }
    });

    it("should handle errors", async () => {
      const errorMessage = "Database error";

      // Stub the Product.find method to throw an error
      const findStub = sinon
        .stub(Product, "find")
        .throws(new Error(errorMessage));

      try {
        // Use supertest to make a request to your app
        const res = await request(app).get("/product");

        assert.strictEqual(res.status, 500);
        assert.strictEqual(res.body.message, errorMessage);
      } finally {
        findStub.restore();
      }
    });
  });
});
