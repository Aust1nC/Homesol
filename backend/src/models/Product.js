const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ["technology", "appliance", "kitchen"],
    required: true,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
