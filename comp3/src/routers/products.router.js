import { Router } from "express";
import { io } from "../utils/server.util.js";
import productController from "../controllers/product.controller.js";
import { isPremiumOrAdmin } from "../middlewares/auth.middleware.js";
import CustomErrors from "../utils/errors/CustomErrors.js";
import { generateProdErrorInfo } from "../utils/errors/errorInfo.js";
import ErrorIndex from "../utils/errors/ErrorIndex.js";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  try {
    res.status(200).send(await productController.get());
  } catch (err) {
    req.logger.error(`Error al obtener los productos: ${err}`);
    res.status(400).send(err);
  }
});

productRouter.get("/:pid", async (req, res) => {
  try {
    res.status(200).send(await productController.getById(req.params.pid));
  } catch (err) {
    req.logger.error(`Error al obtener el producto por ID: ${err}`);
    res.status(400).send(err);
  }
});

productRouter.post("/", isPremiumOrAdmin, async (req, res) => {
  const product = req.body;
  const {user} = req.session;
  try {
    if (user.role === "Premium") {
      product.owner = user.email;
    }
    res.status(201).send(await productController.add(product));
    io.emit("newProd", product);
  } catch (err) {
    CustomErrors.createError(
      "Product creation error",
      generateProdErrorInfo(product),
      "Campos incompletos",
      ErrorIndex.INCOMPLETE_DATA
    );
  }
});

productRouter.put("/:pid", isPremiumOrAdmin, async (req, res) => {
  try {
    console.log(req.body)
    res
      .status(201)
      .send(await productController.update(req.params.pid, req.body));
  } catch (err) {
    req.logger.error(`Error al actualizar el producto por ID: ${err}`);
    res.status(400).send(err);
  }
});

productRouter.delete("/:pid", isPremiumOrAdmin, async (req, res) => {
  const {user} = req.session
  const product = await productController.getById(req.params.pid)
  try {
    if (user.role === "Admin" || (user.role === "Premium" && user.email === product.owner)) {
      res.status(200).send(await productController.delete(req.params.pid));
      io.emit("deletedProd", req.params.pid);
    } else {
      res.status(403).send("No tiene permisos para eliminar este producto")
    }
  } catch (err) {
    req.logger.error(`Error al eliminar el producto por ID: ${err}`);
    res.status(401).send(err);
  }
});

export default productRouter;
