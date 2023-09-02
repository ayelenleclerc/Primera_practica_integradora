import productModel from "../models/product.model.js";

export default class ProductManager {
  getProducts = async () => {
    try {
      return await productModel.find().lean();
    } catch (err) {
      return err;
    }
  };

  getProductById = async (id) => {
    try {
      return await productModel.findById(id);
    } catch (err) {
      return { error: err.message };
    }
  };

  addProduct = async (product) => {
    try {
      await productModel.create(product);
      return await productModel.findOne({ title: product.title });
    } catch (err) {
      return err;
    }
  };

  updateProduct = async (id, product) => {
    try {
      return await productModel.findByIdAndUpdate(id, { $set: product });
    } catch (err) {
      return err;
    }
  };

  deleteProduct = async (id) => {
    try {
      return await productModel.findByIdAndDelete(id);
    } catch (err) {
      return err;
    }
  };
}
