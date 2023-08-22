import { Router } from "express";
import { passRecovController } from "../controllers/passrecov.controller.js";

const passRouter = Router();

passRouter.post("/", async (req,res)=>{
    try {
        res.status(201).send(await passRecovController.sendMail(req.body.email));
    } catch (err) {
        req.logger.fatal(`Error interno al enviar el mail para restablecimiento de contraseña: ${err}`);
        res.status(500).send(err)
    }
})

passRouter.post("/newpass", async (req,res)=>{
    try {
        res.status(201).send(await passRecovController.updatePass(req.body.email, req.body.newPass, req.body.repeatNewPass));
    } catch (err) {
        req.logger.fatal(`Error interno al restablecer la contraseña: ${err}`);
        res.status(500).send(err)
    }
})

export default passRouter;