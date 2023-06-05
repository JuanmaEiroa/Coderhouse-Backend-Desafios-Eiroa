import { productModel } from "../models/product.model.js"

class ProductManager {
    constructor(){
        this.model = productModel;
    }

    async getProducts(){
        return await productModel.find().lean();
    }

    async getProductById(pid){
        return await productModel.find({_id:pid})
    }

    async addProduct(product){
        return await productModel.create(product);
    }

    async updateProduct(pid, product){
        return await productModel.updateOne({_id:pid},{product})
    }

    async deleteProduct(pid){
        return await productModel.deleteOne({_id: pid})
    }
}

const productManager = new ProductManager();

export default productManager;