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

app.get("/products", async (req, res) => {  //Endpoint para mostrar productos
  let productList = await productManager.getProducts();     //Se obtiene el array de productos.
  let productLimit = req.query.limit;       //Se obtiene el límite de productos (en caso de haber sido definido) a mostrar.
  if (productLimit) {
    res.send(await productList.slice(0, productLimit)); //En caso de definir un límite de productos como req.query, se mostrarán esa cantidad
  } else {
    res.send(productList);          // En caso de que no se defina un req.query, se mostrarán todos los productos de la lista. 
  }
});

app.get("/products/:id", async (req, res) => {
  //Endpoint para obtener un producto según un id, indicándolo como req.param
  try {
    let productFound = await productManager.getProductById(
      parseInt(req.params.id)
    );
    if (productFound != undefined) {
      res.send(productFound); //Si el id existe, se muestra el producto que se buscaba
    } else {
      res.status(400).send(`No existe ese ID`); //Si el id no existe, se muestra un error
    }
  } catch (err) {
    res.status(400).send(`Hubo un error al buscar por ID: ${err}`);
  }
});


//Code by Juan Manuel Eiroa :)