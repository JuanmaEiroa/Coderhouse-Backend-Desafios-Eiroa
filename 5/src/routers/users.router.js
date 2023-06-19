import { Router } from "express";
import userService from "../services/user.service.js";

const userRouter = Router();

userRouter.post("/", async (req, res) => {
  const userData = req.body;
  console.log(userData);
  try {
    const newUser = await userService.createUser(userData);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).send(`Error al crear un usuario: ${err}`);
  }
});

userRouter.post("/auth", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userService.getByEmail(email);
    if (!user)
      throw new Error("El email no se encuentra en el sistema. Registrese");
    if (user.password !== password)
      throw new Error("La contraseña no es correcta");
    req.session.user = user;
    res.status(201).redirect("/");
  } catch (err) {
    res.status(400).send(`Error al iniciar sesión: ${err}`);
  }
});

userRouter.post("/logout", (req, res) => {
  req.session.destroy();
  //res.status(200).json({ message: "Sesión cerrada" });
  res.redirect("/login")
});

export default userRouter;
