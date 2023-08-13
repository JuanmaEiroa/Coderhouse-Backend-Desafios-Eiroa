import { Router } from "express";
import ticketController from "../controllers/ticket.controller.js"

const ticketRouter = Router();

ticketRouter.get("/", async (req, res) => {
  try {
    res.status(200).send(await ticketController.get());
  } catch (err) {
    res.status(400).send(err);
  }
});

ticketRouter.get("/:tcode", async (req, res) => {
    try {
      res.status(200).send(await ticketController.getByCode(req.params.tcode));
    } catch (err) {
      res.status(400).send(err);
    }
  });

ticketRouter.post("/", async (req, res) => {
  try {
    res.status(201).send(await ticketController.add(req.body));
  } catch (err) {
    res.status(400).send(err);
  }
});

ticketRouter.delete("/:tid", async (req, res) => {
  try {
    res.status(200).send(await ticketController.delete(req.params.mid));
  } catch (err) {
    res.status(400).send(err);
  }
});

export default ticketRouter;
