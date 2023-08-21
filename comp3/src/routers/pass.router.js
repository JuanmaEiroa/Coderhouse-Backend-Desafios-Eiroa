import { Router } from "express";
import { passRecovController } from "../controllers/passrecov.controller.js";

const passRouter = Router();

passRouter.post("/", async (req,res)=>{
    try {
        res.status(201).send(await passRecovController.sendMail(req.body.email));
    } catch (error) {
        
    }
})

passRouter.post("/newpass", async (req,res)=>{
    try {
        res.status(201).send(await passRecovController.updatePass(req.body.email, req.body.newPass, req.body.repeatNewPass));
    } catch (error) {
        
    }
})

export default passRouter;