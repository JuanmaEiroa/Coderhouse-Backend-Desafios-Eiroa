import { cartModel } from "../models/cart.model.js";
import productManager from "../dbmanagers/product.manager.js";

class CartManager {
  constructor() {
    this.model = cartModel;
  }

  async getCarts() {
    return await cartModel.find().lean();
  }

  async getCartById(cid) {
    return await cartModel.findById(cid);
  }

  async addCart(cart) {
    return await cartModel.create(cart);
  }

  async updateCart(cid, cart) {
    return await cartModel.findByIdAndUpdate(
      cid,
      { $set: cart },
      { new: true }
    );
  }

  async deleteCart(cid) {
    return await cartModel.findByIdAndDelete(cid);
  }

  async addProdtoCart(cid, pid) {
    try {
      //Se trae la lista de carritos y se busca el que corresponde según el id
      let selectedCart = await this.getCartById(cid);

      //Se trae la lista de productos y se busca el que corresponde según el id
      let selectedProduct = await productManager.getProductById(pid);

      let existingProduct = selectedCart.products.find((prod) => {
        return prod.product.toString() === selectedProduct._id.toString();
      });

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        selectedCart.products.push({
          product: selectedProduct._id,
          quantity: 1,
        });
      }

      await this.updateCart(cid, selectedCart);
    } catch (err) {
      console.log(`Error al agregar el producto al carrito por ID: ${err}`);
    }
  }
}

const cartManager = new CartManager();

export default cartManager;
