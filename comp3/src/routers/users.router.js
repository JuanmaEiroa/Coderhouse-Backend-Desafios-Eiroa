import { Router } from "express";
import passport from "passport";
import userController from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post(
  "/",
  passport.authenticate("register", { failureRedirect: "/registererror" }),
  async (req, res) => {
    res.redirect("/");
  }
);

userRouter.get("/registererror", async (req, res) => {
  res.send({ error: "Error de estrategia al registrarse" });
});

userRouter.post(
  "/auth",
  passport.authenticate("login", { failureRedirect: "/loginerror" }),
  async (req, res) => {
    if (!req.user) {
      return res
        .status(400)
        .send({ status: "error", error: "Credenciales inválidas" });
    }
    const user = req.user;
    delete user.password;
    req.session.user = user;
    res.redirect("/");
  }
);

userRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

userRouter.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

userRouter.get("/loginerror", (req, res) => {
  res.send({ error: "Fallo en el inicio de sesión" });
});

userRouter.post("/logout", (req, res) => {
  req.session.destroy();
  res.status(201).redirect("/");
});

userRouter.get("/premium/:uid", async (req, res) => {
  try {
    const user = await userController.changeRole(req.params.uid);
    res.send({message: "Usuario cambió de rol exitosamente", payload: user});
  } catch (err) {
    req.logger.error(`Error al convertir en premium al usuario: ${err}`);
    res.status(500).send(`Error al convertir en premium al usuario: ${err}`);
  }
});

export default userRouter;
