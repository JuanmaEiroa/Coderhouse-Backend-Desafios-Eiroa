import { Router } from "express";
import productManager from "../dao/managers/product.manager.js";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  try {
    res.status(200).send(await productManager.getProducts());
  } catch (err) {
    res.status(400).send(err);
  }
});

productRouter.get("/:pid", async (req, res) => {
  try {
    res.status(200).send(await productManager.getProductById(req.params.pid));
  } catch (err) {
    res.status(400).send(err);
  }
});

productRouter.post("/", async (req, res) => {
  try {
    res.status(201).send(await productManager.addProduct(req.body));
  } catch (err) {
    res.status(400).send(err);
  }
});

productRouter.put("/:pid", async (req, res) => {
  try {
    res
      .status(201)
      .send(await productManager.updateProduct(req.params.pid, req.body));
  } catch (err) {
    res.status(400).send(err);
  }
});

productRouter.delete("/:pid", async (req, res) => {
  try {
    res.status(200).send(await productManager.deleteProduct(req.params.pid));
  } catch (err) {
    res.status(400).send(err);
  }
});

export default productRouter;
