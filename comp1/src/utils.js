import {fileURLToPath} from "url";
import { dirname } from "path";
import { Server } from "socket.io";
import express from "express";

//Montaje del servidor en express y el socket para permitir exportar el socket a otros módulos.
const app = express();
const httpServer = app.listen(8080, () => {
    console.log("Listening on port 8080");
  });
const io = new Server(httpServer);

//Creación de constantes para uso de rutas absolutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export {__dirname, app, io};