import { cartModel } from "../models/cart.model.js"

class CartManager {
    constructor(){
        this.model = cartModel;
    }

    async getCarts(){
        return await cartModel.find().lean();
    }

    async getCartById(cid){
        return await cartModel.find({_id:cid})
    }

    async addCart(cart){
        return await cartModel.create(cart);
    }

    async updateCart(cid, cart){
        return await cartModel.updateOne({_id:cid},{cart})
    }

    async deleteCart(cid){
        return await cartModel.deleteOne({_id: cid})
    }

    async addProdToCart(cid,pid){
        
    }
}

const cartManager = new CartManager();

export default cartManager;