const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  county: {
    type: String,
    required: true,
  },
  postcode: {
    type: String,
    required: true,
  },
});

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  orderDate: {
    type: Date,
    default: Date.now,
  },
  address: {
    type: AddressSchema,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  price: {
    type: Number,
    required: true,
  },
  referenceNumber: {
    type: String,
    unique: true,
    required: true,
  },
});

OrderSchema.pre("save", function (next) {
  if (this.isNew) {
    this.referenceNumber = uuidv4();
  }
  next();
});

module.exports = mongoose.model("Order", OrderSchema);
