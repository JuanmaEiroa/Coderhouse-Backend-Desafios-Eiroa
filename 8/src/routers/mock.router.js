import { Router } from "express";
import { generateProducts } from "../utils/mockProductGenerator.util.js";
import productController from "../controllers/product.controller.js";
import CustomErrors from "../utils/errors/CustomErrors.js";
import ErrorIndex from "../utils/errors/ErrorIndex.js";
import { generateProdErrorInfo } from "../utils/errors/errorInfo.js";

const mockRouter = Router();

//Router para generación de Mock products en JSON
/*
mockRouter.get("/", (req, res) => {
    //Definición de un array de productos y uso de la función con faker para la creación de n products definidos en el loop
  const products = [];
  for (let i = 0; i < 10; i++) {
    const product = generateProducts();
    if(!product.title || !product.price){
      CustomErrors.createError("Product creation error", generateProdErrorInfo(product), "Campos incompletos", ErrorIndex.INCOMPLETE_DATA)
    } else {
      products.push(product);
    }
  }
  res.json(products);
});
*/

//Router para generación de Mock products en DB
mockRouter.get("/", (req, res) => {
  try {
    let product;
    for (let i = 0; i < 5; i++) {
      product = generateProducts();
      productController.add(product);
    }
    res.json({ message: "Mock products created" });
  } catch (error) {
    CustomErrors.createError(
      "Product creation error",
      generateProdErrorInfo(product),
      "Campos incompletos",
      ErrorIndex.INCOMPLETE_DATA
    );
  }
});

export default mockRouter;
