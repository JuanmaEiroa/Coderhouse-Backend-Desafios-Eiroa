// Desafío 4 - Websockets y Handlebars

import express from "express"; //Importación de express para la generación del servidor.
import handlebars from "express-handlebars"; //Importación de handlebars
import { productsRouter } from "./routers/products.router.js"; //Importación del Router de productos
import { cartsRouter } from "./routers/carts.router.js"; //Importación del Router de carts
import viewsRouter from "./routers/views.router.js"; //Importación del Router de views
import { Server } from "socket.io";
import ProductManager from "./models/ProductManager.js";

//Creación del servidor en la constante app
const app = express();

const productManager = new ProductManager("./products.json");

//Uso de middleware para parsear los datos de la petición.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Seteo de motor de handlebars y views
app.engine("handlebars", handlebars.engine());
app.set("views", "views/");
app.set("view engine", "handlebars");

app.use(express.static("public"));

//Uso de los middleware de routing para determinar las rutas a usar por la aplicación
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

const httpServer = app.listen(8080, () => {
  console.log("Listening in 8080"); //Check de que el servidor se encuentra funcionando en el puerto 8080.
});
const io = new Server(httpServer);

io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado!");
  socket.emit("productList", await productManager.getProducts());

  socket.on("newProduct", async (product) => {
    await productManager.addProduct(product);
    socket.emit("productList", await productManager.getProducts());
  });

  socket.on("eraseProduct", async(id) => {
    await productManager.deleteProduct(id);
    socket.emit("productList", await productManager.getProducts());
  })
});

//Code by Juan Manuel Eiroa :)
