import { Router } from "express";
import userManager from "../dao/dbmanagers/user.manager.js";

const userRouter = Router();

userRouter.post("/", async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await userManager.createUser(userData);
    res.status(201).send("Registro exitoso!");
  } catch (err) {
    res.status(400).send(`Error al crear un usuario: ${err}`);
  }
});

let userRole;

userRouter.post("/auth", async (req, res) => {
  userRole = "User";
  const { email, password } = req.body;
  try {
    if (email === "adminCoder@coder.com" && password === "coderpass123") {
      userRole = "Admin";
      req.session.user = {
        first_name: "Coder",
        last_name: "House",
        email: email,
      }
    } else {
      const user = await userManager.getByEmail(email);
      if (!user)
        throw new Error("El email no se encuentra en el sistema. Registrese");
      if (user.password !== password)
        throw new Error("La contraseña no es correcta");
      req.session.user = user;
    }
    res.status(201).redirect("/products");
  } catch (err) {
    res.status(400).send(`Error al iniciar sesión: ${err}`);
  }
});

userRouter.post("/logout", (req, res) => {
  req.session.destroy();
  res.status(201).redirect("/");
});

export {userRole, userRouter};
