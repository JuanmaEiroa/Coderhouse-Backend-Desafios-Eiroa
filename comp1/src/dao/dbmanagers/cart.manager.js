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
    return await cartModel.find({ _id: cid });
  }

  async addCart(cart) {
    return await cartModel.create(cart);
  }

  async updateCart(cid, cart) {
    return await cartModel.updateOne({ _id: cid }, { cart });
  }

  async deleteCart(cid) {
    return await cartModel.deleteOne({ _id: cid });
  }
  async addProdtoCart(cid, pid) {
    try {
      //Se trae la lista de carritos y se busca el que corresponde según el id
      let selectedCart = await this.getCartById(cid);

      //Se trae la lista de productos y se busca el que corresponde según el id
      let selectedProduct = await productManager.getProductById(pid);

      //Definición de variables para producto ya existente
      let prodFound = false;
      let oldProd;

      //Uso de método forEach para verificar la existencia de un producto, cambiando la variable a true si se encontró y seleccionando ese producto para actualizarlo luego.
      selectedCart[0].products.forEach((prod) => {
        if (prod.id === selectedProduct.id) {
          prodFound = true;
          oldProd = prod;
        }
      });

      //Uso de condicional para determinar si existe o no el producto en el carrito seleccionado
      if (prodFound) {
        oldProd.quantity++; //Si el producto existe, se aumenta su cantidad en 1
      } else {
        selectedCart[0].products.push({
          product: selectedProduct._id,
          quantity: 1,
        }); //Si el producto no existe, se ingresa en el carrito con cantidad de 1.
      }
      this.updateCart(cid, selectedCart[0]);
    } catch (err) {
      console.log(`Error al agregar el producto al carrito por ID: ${err}`);
    }
  }
}

const cartManager = new CartManager();

export default cartManager;
