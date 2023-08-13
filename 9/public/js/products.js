//FUNCIÓN PARA AGREGAR PRODUCTOS AL CARRITO
function addToCart(pid) {
  //Se obtiene id de carrito y se define como url param
  const cid = document.getElementById("cartId").value;
  //Método fetch con post para agregar productos
  fetch(`/api/carts/${cid}/product/${pid}`, {
    method: "POST",
  })
    .then((response) => {
      if (response.ok) {
        //Alerta de producto agregado
        Swal.fire({
          text: `Producto agregado al carrito!`,
          toast: true,
          icon: "success",
          position: "bottom-right",
        });
      } else {
        //Alerta de error al agregar producto
        Swal.fire({
          text: `Error al agregar el producto al carrito.`,
          icon: "error",
          toast: true,
          position: "bottom-right",
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}