import { Router } from "express";
import cartManager from "../dao/dbmanagers/cart.manager.js";

const cartRouter = Router();

cartRouter.get("/", async (req, res) => {
  try {
    res.status(200).send(await cartManager.getCarts());
  } catch (err) {
    res.status(400).send(err);
  }
});

cartRouter.get("/:pid", async (req, res) => {
  try {
    res.status(200).send(await cartManager.getCartById(req.params.pid));
  } catch (err) {
    res.status(400).send(err);
  }
});

cartRouter.post("/", async (req, res) => {
  try {
    res.status(201).send(await cartManager.addCart(req.body));
  } catch (err) {
    res.status(400).send(err);
  }
});

cartRouter.put("/:pid", async (req, res) => {
  try {
    res
      .status(201)
      .send(await cartManager.updateCart(req.params.pid, req.body));
  } catch (err) {
    res.status(400).send(err);
  }
});

cartRouter.delete("/:pid", async (req, res) => {
  try {
    res.status(200).send(await cartManager.deleteCart(req.params.pid));
  } catch (err) {
    res.status(400).send(err);
  }
});

cartRouter.post("/:cid/product/:pid", async (req,res) => {
  try {
    res.status(201).send(await cartManager.addProdtoCart(req.params.cid, req.params.pid))
  } catch (err) {
    res.status(400).send(err);
  }
})

export default cartRouter;
