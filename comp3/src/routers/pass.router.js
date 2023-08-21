import { Router } from "express";
import { passRecovController } from "../controllers/passrecov.controller.js";

const passRouter = Router();

passRouter.post("/", async (req,res)=>{
    await passRecovController.sendMail(req.body.email);
})

export default passRouter;