import { Router } from "express";
import { io } from "../utils/server.util.js";
import productController from "../controllers/product.controller.js"
import { isAdmin } from "../middlewares/auth.middleware.js";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  try {
    res.status(200).send(await productController.get());
  } catch (err) {
    res.status(400).send(err);
  }
});

productRouter.get("/:pid", async (req, res) => {
  try {
    res.status(200).send(await productController.getById(req.params.pid));
  } catch (err) {
    res.status(400).send(err);
  }
});

productRouter.post("/", isAdmin, async (req, res) => {
  try {
    res.status(201).send(await productController.add(req.body));
    io.emit("newProd", req.body);
  } catch (err) {
    res.status(400).send(err);
  }
});

productRouter.put("/:pid", isAdmin, async (req, res) => {
  try {
    res
      .status(201)
      .send(await productController.update(req.params.pid, req.body));
  } catch (err) {
    res.status(400).send(err);
  }
});

productRouter.delete("/:pid", isAdmin, async (req, res) => {
  try {
    res.status(200).send(await productController.delete(req.params.pid));
    io.emit("deletedProd", req.params.pid);
  } catch (err) {
    res.status(400).send(err);
  }
});

export default productRouter;
