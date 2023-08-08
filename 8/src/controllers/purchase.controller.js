import {
  cartService,
  productService,
  ticketService,
  userService,
} from "../repositories/repoIndex.js";

class PurchaseController {
  async endPurchase(cid, user) {
    try {
      //Obtengo el carrito y sus productos
      const cart = await cartService.getById(cid);
      const cartProducts = cart.products;

      //Genero un array para los productos finales
      let finalProducts = [];
      let finalPrice = 0;

      //Se recorre cada producto del cart
      for (const prod of cartProducts) {
        //Se obtiene id del producto y se busca en la lista general
        const cartProdId = prod.product;
        const productFromList = await productService.getById(cartProdId);

        //Si la cantidad es menor o igual al stock disponible, se restan del mismo
        if (prod.quantity <= productFromList.stock) {
          productFromList.stock -= prod.quantity;
          await productService.update(productFromList._id, productFromList);
          //Se carga el producto en el array final
          finalProducts.push(prod);
          //Se elimina del carrito
          await cartService.deleteProdfromCart(cid, prod.product);
          //Se suma el precio total
          const productPrice = productFromList.price;
          finalPrice += prod.quantity * productPrice;
        } else {
          //En caso de no haber stock suficiente, se loggea un error
          console.log(
            `${productFromList.title}: Stock insuficiente para la compra`
          );
        }
      }

      //Obtención del usuario actual
      const purchaseUser = await userService.getById(user._id);

      //Generación del ticket de compra
      await ticketService.add({
        amount: finalPrice,
        purchaser: purchaseUser.email,
      });
    } catch (error) {
      console.error("Error durante la compra:", error);
    }
  }
}

const purchaseController = new PurchaseController();
export default purchaseController;
