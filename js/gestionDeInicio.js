function alertaCerrarSesion(){
    Swal.fire({
        
        title: '¿Estas seguro que deseas cerrar sesión?',
        showDenyButton: true,
        denyButtonText: `Cancelar`,
        confirmButtonText: 'Confirmar',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Se ha cerrado la sesión con exito', '', 'success')
        }
      })
}

function seleccionarImagen(){
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.addEventListener("change", (event) => {
      const selectedImage = event.target.files[0];
      if (selectedImage) {
          console.log("Imagen seleccionada:", selectedImage);
      }
  });
  
  input.click();
}

function alertaCerrarSesion(){
  Swal.fire({
      
      title: '¿Estas seguro que deseas cerrar sesión?',
      showDenyButton: true,
      denyButtonText: `Cancelar`,
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Se ha cerrado la sesión con exito', '', 'success')
      }
    })
}