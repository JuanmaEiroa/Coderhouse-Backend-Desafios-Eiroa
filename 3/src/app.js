// Desafío 3 (Clase 6) - Servidores con Express

import ProductManager from "./models/3-ProductManager.js"; // Importación del productManager previamente creado para la creación y obtención de productos
import express from "express"; //Importación de express para la generación del servidor.

const app = express(); //Creación del servidor en la constante app
const productManager = new ProductManager("./products.json"); //Creación de una nueva instancia del productManager, usando como ruta ./products.json para la creación del archivo de productos.

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Uso de middleware para parsear los datos de la petición.

app.listen(8080, () => {
  console.log("Listening in 8080"); //Check de que el servidor se encuentra funcionando en el puerto 8080.
});

app.get("/products", async (req, res) => {
  res.send(await productManager.getProducts()); //Endpoint para obtener la lista de productos completa, sin querys.
});

/*app.get("/products", async (req, res) => {
    res.send(productManager.getProducts)        //Endpoint para obtener la lista de productos con un límite de cantidad, establecido en el query param.
})
*/

app.get("/products/:id", async (req, res) => {
  try {
    console.log(await productManager.getProductById(parseInt(req.params.id)));
    res.send(await productManager.getProductById(parseInt(req.params.id)));
  } catch (err) {
    res.status(400).send({ err });
  }
});
