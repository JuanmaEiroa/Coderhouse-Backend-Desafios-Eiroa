import { Router } from "express";
import productManager from "../dao/dbmanagers/product.manager.js";
import messageManager from "../dao/dbmanagers/message.manager.js";
import cartManager from "../dao/dbmanagers/cart.manager.js"
import { isAuth, isGuest } from "../middlewares/auth.middleware.js";

const viewsRouter = Router();

viewsRouter.get("/products", async (req, res) => {
  const { limit, page, category, availability, sort } = req.query;
  const prodList = await productManager.getProducts(
    limit,
    page,
    category,
    availability, 
    sort
  );
  prodList.status = "success";
  prodList.category = category;
  prodList.availability = availability;
  prodList.sort = sort;
  prodList.prevLink = prodList.hasPrevPage?`products?page=${prodList.prevPage}`:'';
  prodList.nextLink = prodList.hasNextPage?`products?page=${prodList.nextPage}`:'';
  res.render("products", prodList);
});

/*
viewsRouter.get("/",isAuth, (req, res)=>{
    const {user} = req.session;
    delete user.password;
    res.render("index", {
        title: "Mi Perfil",
        user: user
    })
})
*/

viewsRouter.get("/carts/:cid", async (req, res) => {
  try {
    const cart = await cartManager.getCartById(req.params.cid);
    res.render("cart", cart );
  } catch (err) {
    res.status(400).send(err);
  }
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
  const prodList = await productManager.getProducts();
  res.render("realTimeProducts", { prodList });
});

viewsRouter.get("/chat", async (req, res) => {
  const renderMessages = await messageManager.getMessages();
  res.render("chat", { renderMessages });
});

export default viewsRouter;
