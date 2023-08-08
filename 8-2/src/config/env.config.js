//Importación de dotenv y el program definido con Commander
import dotenv from "dotenv";
import program from "./commander.config.js";

//Definición de constantes según los parámetros usados en consola
const port = program.opts().p;
const persistence = program.opts().pers;

//Uso de dotenv y exportación de todas las variables de entorno
dotenv.config({ path: `${process.cwd()}/src/config/.env/.env` });

export const appConfig = {
  port: port,
  persistence: persistence,
  mongoUrl: process.env.MONGO_URL,
  mongoDbName: process.env.MONGO_DBNAME,
  sessionSecret: process.env.SESS_SECRET,
  adminName: process.env.ADMIN_NAME,
  adminPassword: process.env.ADMIN_PASSWORD,
  githubClient: process.env.GITHUB_CLIENT,
  githubSecret: process.env.GITHUB_SECRET,
};
