import nodemailer from "nodemailer";
import { appConfig } from "../config/env.config.js";
import { userService } from "../repositories/repoIndex.js";
import { encryptPassword, comparePassword } from "../utils/encrypt.util.js";
import { compare } from "bcrypt";

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: appConfig.gmailUser,
    pass: appConfig.gmailAppPass,
  },
});

class PassRecovController {
  async sendMail(email) {
    try {
      let mail = await transport.sendMail({
        from: `CoderCommerce ${appConfig.gmailUser}`,
        to: email,
        subject: "Restablecimiento de contraseña",
        html: `
                      <div>
                      <h1>Mail para restablecimiento de contraseña</h1>
                      <p>Se ha enviado el siguiente correo para poder restablecer su contraseña en nuestro e-commerce. Haga click en el siguiente botón para hacerlo:</p>
                      <a href="http://localhost:8080/newpass"><button>Restablecer contraseña</button></a>
                      </div>
                `,
        attachments: [],
      });
    } catch (error) {
      console.log(
        `Error interno al intentar enviar el correo de recuperación: ${error}`
      );
    }
  }

  async updatePass(userEmail, newPass) {
    const user = await userService.getByEmail(userEmail);
    if (comparePassword(user, newPass)) {
        throw new Error("No se puede utilizar la contraseña ya existente")
    } else {
        const newHashedPass = encryptPassword(newPass);
        user.password = newHashedPass;
        return await userService.update(user._id, user);
    }
  }
}

export const passRecovController = new PassRecovController();
