const socket = io();

function render(data) {
  const productList = document.getElementById("productList");
  const newList = data.map((prod) => {
    return `<li class="productTitle">${prod.title} 
          <ul class="productDesc">
            <li>Descripción: ${prod.description}</li>
            <li>Precio: ${prod.price}</li>
            <li>Stock: ${prod.stock}</li>
            <li>Código: ${prod.code}</li>
            <li>Categoría: ${prod.category}</li>
          </ul>
      </li>
          `;
  });
  productList.innerHTML(newList);
}

socket.on("updatedProducts", (data) => {
  render(data);
});
