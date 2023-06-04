import { Router } from "express";
import messageManager from "../dao/managers/message.manager.js";

const messageRouter = Router();

messageRouter.get("/", async (req, res) => {
  try {
    res.status(200).send(await messageManager.getMessages());
  } catch (err) {
    res.status(400).send(err);
  }
});

messageRouter.post("/", async (req, res) => {
  try {
    res.status(201).send(await cartManager.addCart(req.body));
  } catch (err) {
    res.status(400).send(err);
  }
});

messageRouter.delete("/:mid", async (req, res) => {
  try {
    res.status(200).send(await cartManager.deleteMessage(req.params.mid));
  } catch (err) {
    res.status(400).send(err);
  }
});

export default cartRouter;
