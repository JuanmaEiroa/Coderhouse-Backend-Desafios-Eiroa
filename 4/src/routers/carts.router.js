import { Router } from "express";
import CartsManager from "../models/CartsManager.js"; // Importación del productManager previamente creado para la creación y obtención de productos

const cartsManager = new CartsManager("./carts.json");
const cartsRouter = Router();

//Endpoint para generar un carrito
cartsRouter.post("/", async (req, res) => {
  try {
    const cart = {"products":[]};
    res.status(201).send(await cartsManager.addCart(cart));
  } catch (err) {
    res.status(400).send(`Hubo un error al agregar el carrito: ${err}`);
  }
});

//Endpoint para obtener todos los carritos
cartsRouter.get("/", async (req, res) => {
  try {
    res.send(await cartsManager.getCarts());
  } catch (err) {
    res.status(400).send(`Hubo un error al obtener los carritos: ${err}`);
  }
});

//Endpoint para obtener un carrito por id
cartsRouter.get("/:cid", async (req, res) => {
  try {
    let cartFound = await cartsManager.getCartById(
      parseInt(req.params.cid) //Método para obtener un carrito según un id, indicándolo como req.param
    );
    if (cartFound != undefined) {
      res.send(cartFound); //Si el id existe, se muestra el carrito que se buscaba
    } else {
      res.status(400).send(`No existe ese ID`); //Si el id no existe, se muestra un error
    }
  } catch (err) {
    res.status(400).send(`Hubo un error al buscar por ID: ${err}`);
  }
});

//Endpoint para agregar un producto a un carrito
cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    res
      .status(201)
      .send(
        await cartsManager.addProdtoCart(
          parseInt(req.params.cid),
          parseInt(req.params.pid)
        )
      );
  } catch (err) {
    res
      .status(400)
      .send(`Hubo un error al agregar el producto al carrito por ID: ${err}`);
  }
});

//Endpoint para eliminar un carrito por id
cartsRouter.delete("/:cid", async(req,res)=>{
  try {
    res.send(await cartsManager.deleteCart(parseInt(req.params.cid)))
  } catch (err) {
    res.status(400).send(`Hubo un error al eliminar el carrito por ID: ${err}`)
  }
})

export { cartsRouter };
