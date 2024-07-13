const assert = require("assert");
const sinon = require("sinon");
const app = require("../server");
const Product = require("../models/Product");
const request = require("supertest");

describe("ProductController", () => {
  let errorMessage = "Database error";
  let mockProduct = {
    _id: "1",
    name: "Product 1",
    price: 10,
    category: "kitchen",
  };

  afterEach(() => {
    sinon.restore();
  });

  describe("all", () => {
    it("should return all products", async () => {
      const mockProducts = [
        { name: "Product 1", price: 10, category: "kitchen" },
        { name: "Product 2", price: 20, category: "technology" },
      ];

      // Stub the Product.find method to return mockProducts
      const findStub = sinon.stub(Product, "find").resolves(mockProducts);

      const res = await request(app).get("/product");

      assert.strictEqual(res.status, 200);
      assert(Array.isArray(res.body));
      assert.deepStrictEqual(res.body, mockProducts);
    });

    it("should handle errors", async () => {
      // Stub the Product.find method to throw an error
      const findStub = sinon
        .stub(Product, "find")
        .throws(new Error(errorMessage));

      const res = await request(app).get("/product");

      assert.strictEqual(res.status, 500);
      assert.strictEqual(res.body.message, errorMessage);
    });
  });

  describe("find", () => {
    it("should return a product by id", async () => {
      // Stub the Product.findById method to return mockProduct
      const findByIdStub = sinon
        .stub(Product, "findById")
        .resolves(mockProduct);

      const res = await request(app).get(`/product/${mockProduct._id}`);

      assert.strictEqual(res.status, 200);
      assert.deepStrictEqual(res.body, mockProduct);
    });

    it("should return 404 if product not found", async () => {
      // Stub the Product.findById method to return null
      const findByIdStub = sinon.stub(Product, "findById").resolves(null);

      const res = await request(app).get(`/product/1`);

      assert.strictEqual(res.status, 404);
      assert.strictEqual(res.body.error, "Product not found.");
    });

    it("should handle errors", async () => {
      // Stub the Product.findById method to throw an error
      const findByIdStub = sinon
        .stub(Product, "findById")
        .throws(new Error(errorMessage));

      const res = await request(app).get(`/product/1`);

      assert.strictEqual(res.status, 500);
      assert.strictEqual(res.body.message, errorMessage);
    });
  });

  describe("create", () => {
    it("should create a product", async () => {
      // Stub the save method of Product prototype to resolve with mockProduct
      const createStub = sinon
        .stub(Product.prototype, "save")
        .resolves(mockProduct);

      const res = await request(app).post("/product").send(mockProduct);

      assert.strictEqual(res.status, 201);
      assert.deepStrictEqual(res.body, mockProduct);
    });

    it("should handle errors during creation", async () => {
      // Stub the save method of Product prototype to throw an error
      const createStub = sinon
        .stub(Product.prototype, "save")
        .throws(new Error(errorMessage));

      const res = await request(app).post("/product").send(mockProduct);

      assert.strictEqual(res.status, 409);
      assert.strictEqual(res.body.message, errorMessage);
    });
  });

  describe("update", () => {
    it("should update a product", async () => {
      const findByIdStub = sinon
        .stub(Product, "findById")
        .resolves(mockProduct);

      const updatedProduct = { ...mockProduct, name: "Updated Product 1" };

      const findOneAndUpdateStub = sinon
        .stub(Product, "findOneAndUpdate")
        .resolves(updatedProduct);

      const res = await request(app).patch(`/product/${mockProduct._id}`).send({
        name: "Updated Product 1",
      });

      assert.strictEqual(res.status, 200);
      assert.deepStrictEqual(res.body, updatedProduct);
    });

    it("should return 404 if product not found", async () => {
      const findByIdStub = sinon.stub(Product, "findById").resolves(null);

      const res = await request(app)
        .patch(`/product/1`)
        .send({ name: "Updated Product 1" });

      assert.strictEqual(res.status, 404);
      assert.strictEqual(res.body.message, "Product not found");
    });

    it("should handle errors", async () => {
      const findByIdStub = sinon
        .stub(Product, "findById")
        .throws(new Error(errorMessage));

      const res = await request(app)
        .patch(`/product/1`)
        .send({ name: "Updated Product 1" });

      assert.strictEqual(res.status, 500);
      assert.strictEqual(res.body.message, errorMessage);
    });
  });

  describe("delete", () => {
    it("should delete a product", async () => {
      const deleteOneStub = sinon
        .stub(Product, "deleteOne")
        .resolves({ deletedCount: 1 });

      const res = await request(app).delete(`/product/${mockProduct._id}`);

      assert.strictEqual(res.status, 200);
      assert.deepStrictEqual(res.body, { message: "Product deleted" });
    });

    it("should return 404 if product not found", async () => {
      const deleteOneStub = sinon
        .stub(Product, "deleteOne")
        .resolves({ deletedCount: 0 });

      const res = await request(app).delete(`/product/${mockProduct._id}`);

      assert.strictEqual(res.status, 404);
      assert.deepStrictEqual(res.body, { message: "Product not found" });
    });

    it("should handle errors", async () => {
      const deleteOneStub = sinon
        .stub(Product, "deleteOne")
        .throws(new Error(errorMessage));

      const res = await request(app).delete(`/product/${mockProduct._id}`);

      assert.strictEqual(res.status, 500);
      assert.deepStrictEqual(res.body.message, errorMessage);
    });
  });
});
