import mongoose from "mongoose";

const collection = "carts";

const productSubSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "products",
    },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { _id: false }
);

const schema = new mongoose.Schema(
  {
    products: {
      type: [productSubSchema],
      default: [],
    },
  },
  { timestamps: true }
);

schema.pre(["find", "findOne"], function () {
  this.populate("products.product");
});

const cartModel = mongoose.model(collection, schema);

export default cartModel;
