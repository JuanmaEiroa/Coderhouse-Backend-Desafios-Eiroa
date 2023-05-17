const socket = io();

function render(data) {
  const html = data
    .map((prod, index) => {
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
    })
    .join(" ");
  console.log(html);
  document.getElementById("productList").innerHTML = html;
}

socket.on("productList", (data) => {
  render(data);
});

socket.on("updatedProducts", (data) => {
  render(data);
});
