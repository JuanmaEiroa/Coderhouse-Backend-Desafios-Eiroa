import { Router } from "express";
import passport from "passport";
import {
  generateToken,
  authToken,
  passportCall,
} from "../middlewares/jwt.middleware.js";

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
    const token = generateToken({ user });
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 60000,
      })
      .redirect("/");
  }
);

//Uso de estrategia con jwt por cookies
userRouter.get("/current", authToken, passportCall, async (req, res) => {
  res.status(200).send({ message: "Usuario actual", user: req.user });
});

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

export default userRouter;
