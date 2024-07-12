const Product = require("../models/Product");

let ProductController = {
  all: async (req, res) => {
    try {
      let found = await Product.find();
      res.json(found);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  find: async (req, res) => {
    try {
      let found = await Product.findById(req.params.id);
      if (!found) {
        return res.status(404).send({ error: "Product not found." });
      }
      res.json(found);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  create: async (req, res) => {
    try {
      let newProduct = new Product(req.body);
      let savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      res.status(409).send({
        message: error.message,
      });
    }
  },

  update: async (req, res) => {
    try {
      let found = await Product.findById(req.params.id);

      if (found) {
        let updated = await Product.findOneAndUpdate(
          { _id: req.params.id },
          req.body,
          { new: true, runValidators: true }
        );
        res.status(200).json(updated);
      } else {
        res.status(404).send({ message: "Product not found" });
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      let id = req.params.id;
      let result = await Product.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        return res.status(404).send({ message: "Product not found" });
      }
      res.status(200).send({ message: "Product deleted" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};

// async function insertDummyProductData() {
//   try {
//     await Product.insertMany([
//       {
//         name: "Drying rack",
//         price: 5,
//         category: "appliance",
//       },
//       {
//         name: "Electric kettle",
//         price: 5,
//         category: "appliance",
//       },
//       {
//         name: "Rice cooker",
//         price: 5,
//         category: "appliance",
//       },
//       {
//         name: "Hair dryer",
//         price: 5,
//         category: "appliance",
//       },
//       {
//         name: "Desk lamp",
//         price: 5,
//         category: "appliance",
//       },
//       {
//         name: "Home pod",
//         price: 10,
//         category: "technology",
//       },
//       {
//         name: "Robot vacuum cleaner",
//         price: 15,
//         category: "technology",
//       },
//       {
//         name: "Mini projector",
//         price: 10,
//         category: "technology",
//       },
//       {
//         name: "Dehumidifier",
//         price: 5,
//         category: "technology",
//       },
//       {
//         name: "Monitor",
//         price: 10,
//         category: "technology",
//       },
//       {
//         name: "Chopping board",
//         price: 5,
//         category: "kitchen",
//       },
//       {
//         name: "Knife set",
//         price: 5,
//         category: "kitchen",
//       },
//       {
//         name: "Microwave",
//         price: 10,
//         category: "kitchen",
//       },
//       {
//         name: "Bowls and plates",
//         price: 10,
//         category: "kitchen",
//       },
//       {
//         name: "Apron",
//         price: 5,
//         category: "kitchen",
//       },
//     ]);
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// insertDummyProductData();

module.exports = ProductController;
