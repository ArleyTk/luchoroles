//const url = 'https://backendapi-2t9z.onrender.com/api/usuarios'
const url = 'https://apipedidos2.onrender.com/api/usuario'





const listarDatos = async(busqueda) => {
    let respuesta = ''
    let body = document.getElementById('contenidotablapedidos')
    //url: Es la url de la api.
    //Al deslpegarla en el servidor colocar la api del servidor
    let urlAPI = url;
    if (busqueda) {
        alert(busqueda)
        urlAPI += `?_id=${encodeURIComponent(busqueda)}`;
    }



        fetch(urlAPI, {
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
    .then(function(data) {
        let listaUsuarios = data.pedidos //Capturar el array devuelto por la api

        table.clear();

        console.log(listaUsuarios)

        datos = 
        listaUsuarios.map(function(usuario) {//Recorrer el array
            respuesta +=

            `<tr>
            <td>${usuario.idpedido}</td>`+
            `<td>${usuario.descpedido}</td>`+
            `<td>${usuario.preciopedido}</td>`+
            `<td>${usuario.fechapedido}</td>`+
            `<td>${usuario.productospedido}</td>`+
            `<td>${usuario.clientepedido}</td>`+
            `<td><i onclick="window.location.href='ActualizarPed.html?_id=${usuario._id}'" class="fa-solid fa-pen-to-square iconosRojos"></i>
            <i class="fa-solid fa-trash iconosRojos"  onclick='eliminar("${usuario._id}")'></i>
            </td>`+

            `</tr>`
            
        })
        table.rows.add($(respuesta)).draw();
    })


    
}
const registrar = async()=>{
    let _idpedido = document.getElementById('idpedido').value
    let _preciopedido = document.getElementById('preciopedido').value
    let _fechapedido = document.getElementById('fechapedido').value
    let _descpedido = document.getElementById('descpedido').value
        let usuario = {
            idpedido:_idpedido,
            descpedido:_descpedido,
            preciopedido: _preciopedido,

            fechapedido: _fechapedido,
            productospedido: "Salchichón, Harinapan",
            clientepedido: "Conejitas al despacho"

        }

        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(usuario),//Convertir el objeto _usuario  a un JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
        .then(json => {
            //alert(json.msg)//Mensaje que retorna la API
            console.log(json)
            if (json.msg) {
                Swal.fire({
                    title: json.msg,
                    icon: 'success',
                    showCancelButton: false, // Evita que aparezca el botón "Cancelar"
                    confirmButtonText: 'OK',
                }).then((result) => {
                    if (result.isConfirmed) {
                        // El usuario hizo clic en "OK"
                        window.location.href = 'pedidos.html'; // Redireccionar después del clic en OK
                    }
                });
            }
        })
            }
  
    
    const eliminar = (id) =>{

        let usuario = {
             _id: id
         }

             Swal.fire({
                 title: '¿Estás seguro?',
                 text: 'Esta acción no se puede deshacer',
                 icon: 'warning',
                 showCancelButton: true,
                 confirmButtonText: 'Sí, eliminar',
                 cancelButtonText: 'Cancelar'
               }).then((result) => {
                 if (result.isConfirmed) {
                    fetch(`${url}?_id=${usuario._id}`,  {
                        method: 'DELETE',
                        mode: 'cors',
                        body: JSON.stringify(usuario),//Convertir el objeto _usuario  a un JSON
                        headers: {"Content-type": "application/json; charset=UTF-8"}
                    })
                    
                    
                    .then((resp) => resp.json())
                    .then(function (data) {
                        console.log('Usuario eliminado:', data);
                        listarDatos(); // Vuelve a cargar la lista después de eliminar
                    })

                   }})
                   .catch(function (error) {
                     // Maneja los errores
                     console.error('Error al eliminar usuario:', error);
                   })
       
                   
           
           // Maneja la respuesta después de eliminar el usuario, por ejemplo, actualizando la tabla
         


 };








    const actualizarPedido = async () => {

        let _id = document.getElementById('_id').value
        let _idpedido = document.getElementById('idpedido2').value
        let _descpedido = document.getElementById('descpedido2').value
        let _preciopedido = document.getElementById('preciopedido2').value
        let _fechapedido = document.getElementById('fechapedido2').value
    
        let usuario = {
            _id: _id,
            idpedido: _idpedido,
            descpedido: _descpedido,
            preciopedido: _preciopedido,
            fechapedido: _fechapedido,
            productospedido: "Salchicha, Perro",
            clientepedido: "Donde el cucho"
        }
    
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(usuario),//Convertir el objeto _usuario  a un JSON
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
            .then(json => {
                Swal.fire({
                    title: json.msg,
                    icon: 'success',
                    showCancelButton: false, // Evita que aparezca el botón "Cancelar"
                    confirmButtonText: 'OK',
                }).then((result) => {
                    if (result.isConfirmed) {
                        // El usuario hizo clic en "OK"
                        window.location.href = 'pedidos.html'; // Redireccionar después del clic en OK
                    }
                });
            })
    }

    function confirmarEliminacion() {
        return new Promise((resolve, reject) => {
          Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f6f6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo'
          }).then((result) => {
            if (result.isConfirmed) {
              resolve();
            } else {
              reject('La eliminación fue cancelada');
            }
          });
        });
      }

  
    function consultarPedido(busqueda) {
        let urlAPI = url;
        // Si se proporciona un parámetro de búsqueda, construye la URL de la API con ese parámetro
        if (busqueda) {
            urlAPI += `?_id=${encodeURIComponent(busqueda)}`;
        }
    
        fetch(urlAPI, {
            method: 'GET',
            mode: 'cors',
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then((resp) => resp.json())
            .then(function (data) {
                let usuario = data.pedidos[0]; // Suponiendo que obtienes un solo cliente
    
                // Llenar los campos del formulario con los datos del cliente
                document.getElementById('_id').value = usuario._id;
                document.getElementById('idpedido2').value = usuario.idpedido;
                document.getElementById('descpedido2').value = usuario.descpedido;
                document.getElementById('preciopedido2').value = usuario.preciopedido;
                document.getElementById('fechapedido2').value = usuario.fechapedido;
            })
            .catch(function (error) {
                console.error('Error al obtener los detalles del cliente:', error);
            });
    }
    