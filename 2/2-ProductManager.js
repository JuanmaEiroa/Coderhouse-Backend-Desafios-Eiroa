// Desafío 2 (Clase 4) - Manejo de Archivos

const fs = require("fs");

class ProductManager {
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
      console.log(productList);
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
      console.log(
        await productList.find((prod) => {
          return prod.id === id;
        })
      );
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
      let newProduct = await productList.findIndex(prod => prod.id === id);
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

const products = new ProductManager("./products.json"); //Check 1 - Creación de instancia de ProductManager

async function test() {
  try {
    await products.getProducts() //Check 2 - Obtención de arreglo vacío previo al agregado de productos

    await products.addProduct(
      "Producto 1",
      "Este es el producto 1",
      2500,
      "Sin imagen",
      "ABC123",
      20
    );
    await products.addProduct(
      "Producto 2",
      "Este es el producto 2",
      1200,
      "Sin imagen",
      "ABC124",
      20
    ); //Check 3 y 4 - Agregado de 2 productos con ID autoincrementable.

    await products.getProducts(); //Check 5 - Obtención de productos agregados previamente

    await products.getProductById(1); //Check 6 - Obtención de producto por ID

    await products.updateProduct(1, "title", "Este es el nuevo producto 1");
    await products.getProductById(1); //Check 7 - Actualización de un campo del producto 1, y obtención del mismo mediante ID


    await products.deleteProduct(1);
    await products.deleteProduct(2);
    await products.getProducts(); //Check 8 - Eliminación de productos a elección por ID y obtención de nueva lista de productos (al eliminar ambos, se obtiene nuevamente un array vacío)
  } catch (err) {
    console.log(`Se ha producido un error en el test: ${err}`);
  }
}

test();

//Code by Juan Manuel Eiroa :)
