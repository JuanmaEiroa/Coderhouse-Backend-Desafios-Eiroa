// Desafío 3 (Clase 6) - Servidores con Express

import * as fs from "fs";

export default class ProductManager {
  //Declaración de variables para obtención automática del id por producto ingresado
  #prodID = 0;
  #getId() {
    this.#prodID++;
    return this.#prodID;
  }

  //Método constructor del array principal del ProductManager
  constructor(path) {
    this.path = path;
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([]));
    }
  }

  //Función asíncrona para agregar el producto y guardarlo en archivo
  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      let product = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        id: this.#getId(),
      };
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log("Error: Todos los campos deben ser completados");
      } else {
        let foundCode = false;
        let productList = JSON.parse(
          await fs.promises.readFile(this.path, "utf-8")
        );
        productList.forEach((prod) => {
          if (prod.code === code) {
            foundCode = true;
          }
        });
        if (!foundCode) {
          productList.push(product);
          await fs.promises.writeFile(this.path, JSON.stringify(productList));
          return;
        } else {
          console.log("Error: El código de producto ya existe");
        }
      }
    } catch (err) {
      console.log(`Error al agregar el producto: ${err}`);
    }
  }

  //Función asíncrona para obtener los productos desde el archivo
  async getProducts() {
    try {
      let productList = JSON.parse(
        await fs.promises.readFile(this.path, "utf-8")
      );
      return productList;
    } catch (err) {
      console.log(`Error al obtener los productos: ${err}`);
    }
  }

  //Función asíncrona para obtener producto por ID desde el archivo
  async getProductById(id) {
    try {
      let productList = JSON.parse(
        await fs.promises.readFile(this.path, "utf-8")
      );

      return productList.find((prod) => {
       return prod.id === id;
      });
    } catch (err) {
      console.log(`Error al obtener el producto por ID: ${err}`);
    }
  }

  //Función asíncrona para actualizar un producto por ID desde el archivo
  async updateProduct(id, key, value) {
    try {
      let productList = JSON.parse(
        await fs.promises.readFile(this.path, "utf-8")
      );
      let newProduct = await productList.findIndex((prod) => prod.id === id);
      productList[newProduct][key] = value;
      await fs.promises.writeFile(this.path, JSON.stringify(productList));
    } catch (err) {
      console.log(`Error al actualizar el producto por ID: ${err}`);
    }
  }

  //Función asíncrona para borrar un producto por ID desde el archivo
  async deleteProduct(id) {
    try {
      let productList = JSON.parse(
        await fs.promises.readFile(this.path, "utf-8")
      );
      productList = await productList.filter((prod) => {
        return prod.id !== id;
      });
      await fs.promises.writeFile(this.path, JSON.stringify(productList));
    } catch (err) {
      console.log(`Error al borrar el producto por ID: ${err}`);
    }
  }
}


//Code by Juan Manuel Eiroa :)

