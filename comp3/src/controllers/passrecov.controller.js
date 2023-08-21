import nodemailer from "nodemailer";
import { appConfig } from "../config/env.config.js";

const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: appConfig.gmailUser,
      pass: appConfig.gmailAppPass,
    },
  });

class PassRecovController {
    async sendMail (email){
        try {
            let mail = await transport.sendMail({
                from: `CoderCommerce ${appConfig.gmailUser}`,
                to: email,
                subject: "Restablecimiento de contraseña",
                html: `
                      <div>
                      <h1>Mail para restablecimiento de contraseña</h1>
                      <p>Se ha enviado el siguiente correo para poder restablecer su contraseña en nuestro e-commerce. Haga click en el siguiente botón para hacerlo:</p>
                      <a href="http://localhost:8080/newpass/${email}"><button>Restablecer contraseña</button></a>
                      </div>
                `,
                attachments: [],
              });
        } catch (error) {
            console.log(`Error interno al intentar enviar el correo de recuperación: ${error}`)
        }
    }
}

export const passRecovController = new PassRecovController()