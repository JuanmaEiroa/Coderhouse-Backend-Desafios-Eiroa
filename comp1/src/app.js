import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import productRouter from "./routers/products.router.js";
import cartRouter from "./routers/carts.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", "views/");
app.set("view engine", "handlebars");

app.use(express.static("public"));

mongoose.connect(
  "mongodb+srv://juanmaeiroa:cel1540236483@codercluster.ictc3lo.mongodb.net/?retryWrites=true&w=majority",
  { dbName: "ecommerce" }
);

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
