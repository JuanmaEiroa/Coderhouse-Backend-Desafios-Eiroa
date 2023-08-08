import { Router } from "express";
import { generateProducts } from "../utils/mockProductGenerator.util.js";
import CustomErrors from "../utils/errors/CustomErrors.js";
import { generateProdErrorInfo } from "../utils/errors/errorInfo.js";
import ErrorIndex from "../utils/errors/ErrorIndex.js";

const mockRouter = Router();

mockRouter.get("/", (req, res) => {
    //Definición de un array de productos y uso de la función con faker para la creación de n products definidos en el loop
  const products = [];
  for (let i = 0; i < 100; i++) {
    const product = generateProducts();
    if(!product.title || !product.price){
      CustomErrors.createError("Product creation error", generateProdErrorInfo(product), "Campos incompletos", ErrorIndex.INCOMPLETE_DATA)
    } else {
      products.push(product);
    }
  }
  res.json(products);
});

export default mockRouter;