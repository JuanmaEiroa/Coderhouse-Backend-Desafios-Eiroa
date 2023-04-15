// Desafío 1 (Clase 2) - Clases con ECMAScript y ECMAScript avanzado

class ProductManager {
  #productId = 0;

  constructor() {
    this.productsList = [];
  }

  getProducts() {
    return this.productsList;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const producto = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: this.#getId(),
    };

    let foundCode = false;
    this.productsList.forEach((prod) => {
          if (prod.code === code) {
            foundCode = true;
            console.log("Error: El producto ya se encuentra ingresado");
          }
        });
        if (foundCode === false) {
          this.productsList.push(producto);
        }
      }

  #getId() {
    this.#productId++;
    return this.#productId;
  }

  getProductById(id) {
    let foundId = false;
    this.productsList.forEach((prod) => {
      if (prod.id === id) {
        foundId = true;
        console.log(prod);
      }
    });
    if (foundId === false) {
      console.log("Error: No se encuentra el producto");
    }
  }
}

const product = new ProductManager(); //Check 1 - Crea la instancia de ProductManager
console.log(product.getProducts()); //Check 2 - Muestra el array vacío
product.addProduct( 
  "Producto prueba",
  "Este es un prducto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
 //Check 3 - Añade el nuevo producto

console.log(product.getProducts()); //Check 4 y 5 - Muestra el producto ingresado con su id generado.

product.addProduct( 
  "Producto prueba",
  "Este es un prducto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

//Check 6 - Intenta añadir el mismo producto nuevamente, dará error por existir ya el producto con ese código

product.getProductById(2); // Check 7 - Realiza la búsqueda por id (En este caso, se usa el Id 2. Dado que el segundo producto no pudo cargarse por tener el mismo código del primero, aquí dará error por no encontrar el producto. En caso de modificar el código del segundo producto, se mostrará acá)


//Code by Juan Manuel Eiroa :)