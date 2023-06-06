import { productModel } from "../models/product.model.js";

class ProductManager {
  constructor() {
    this.model = productModel;
  }

  async getProducts() {
    return await productModel.find().lean();
  }

  async getProductById(pid) {
    return await productModel.findById(pid).lean();
  }

  async addProduct(product) {
    return await productModel.create(product);
  }

  async updateProduct(pid, product) {
    return await productModel.findByIdAndUpdate(
      pid,
      { $set: product },
      { new: true }
    );
  }

  async deleteProduct(pid) {
    return await productModel.findByIdAndDelete(pid);
  }
}

const productManager = new ProductManager();

export default productManager;
