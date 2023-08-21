function sendMail() {
  const email = document.getElementById("email").value;
  fetch(`/api/passrecov/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email})
  })
    .then((response) => {
      if (response.ok) {
        Swal.fire({
          text: `El mail de recupero de contraseña fue enviado!`,
          toast: true,
          icon: "info",
          position: "bottom-right",
        });
      } else {
        console.log("Error al enviar mail para recupero de contraseña");
      }
    })
    .catch((error) => {
      console.log("Error al intentar enviar mail:", error);
    });
}

function recoverPass() {}
