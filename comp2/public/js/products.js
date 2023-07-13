function addToCart(pid) {
  const cid = document.getElementById("cartId").value;
  const form = document.createElement("form");
  form.method = "POST";
  form.action = `/api/carts/${cid}/product/${pid}`;
  document.body.appendChild(form);
  form.submit();
}
