import { Router } from "express";
import productManager from "../dao/dbmanagers/product.manager.js";
import messageManager from "../dao/dbmanagers/message.manager.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res) => {
  const renderProdList = await productManager.getProducts();
  res.render("home", { renderProdList });
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
  const renderProdList = await productManager.getProducts();
  res.render("realTimeProducts", { renderProdList });
});

viewsRouter.get("/chat", async(req,res)=> {
  const renderMessages = await messageManager.getMessages();
  res.render("chat", {renderMessages})
})

export default viewsRouter;
