//const url = 'https://backendapi-2t9z.onrender.com/api/usuarios'
const url = 'https://rolesxd.onrender.com/api/usuario'

const listarDatos = async() => {
    let respuesta = ''
    let body = document.getElementById('contenidotabla')
    //url: Es la url de la api.
    //Al deslpegarla en el servidor colocar la api del servidor
        fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
    .then(function(data) {
        let listaUsuarios = data.permisos //Capturar el array devuelto por la api

        table.clear();

        console.log(listaUsuarios)


        datos = 
        listaUsuarios.map(function(usuario) {//Recorrer el array
            respuesta +=

            `<tr>
            <td>${usuario.idrol}</td>`+
            `<td>${usuario.nombrerol}</td>`+
            `<td>${usuario.descrol}</td>`+
            `<td>${usuario.permisosrol}</td>`+
            `<td>                                <i class="fa-solid fa-pen-to-square iconosRojos" onclick="window.location.href='ActualizarRoles.html?_id=${usuario._id}'"></i>
            <i class="fa-solid fa-trash iconosRojos"  onclick='eliminar("${usuario._id}")'></i>
            </td>`+

            `</tr>`
            body.innerHTML = respuesta
        })
        table.rows.add($(respuesta)).draw();
    })


    
}
const registrar = async()=>{
    let _idrol = document.getElementById('idrol').value
    let _nombrerol = document.getElementById('nombrerol').value
    let _descrol = document.getElementById('descrol').value
    let _permisosrol = document.getElementById('permisosrol').value
        let usuario = {
            idrol: _idrol,
            nombrerol: _nombrerol,
            descrol: _descrol,
            permisosrol: _permisosrol
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
                        window.location.href = 'gestionroles.html'; // Redireccionar después del clic en OK
                    }
                });
            }
        })
    }



    const actualizarrol = async()=>{
        let _id = document.getElementById('_id').value
        let _idrol = document.getElementById('idrol').value
        let _nombrerol = document.getElementById('nombrerol').value
        let _descrol = document.getElementById('descrol').value
        let _permisosrol = document.getElementById('permisosrol').value


        
            let usuarioActualizado = {
                _id: _id,
                idrol: _idrol,
                nombrerol: _nombrerol,
                descrol: _descrol,
                permisosrol: _permisosrol
            }
    
            fetch(url, {
                method: 'PUT',
                mode: 'cors',
                body: JSON.stringify(usuarioActualizado),
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
                            window.location.href = 'gestionroles.html'; // Redireccionar después del clic en OK
                        }
                    });
                }
            })
        }
    
   



  // Función para eliminar el recurso
function consultarRol(busqueda) {
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
            let usuario = data.permisos[0]; // Suponiendo que obtienes un solo cliente

            // Llenar los campos del formulario con los datos del cliente
            document.getElementById('_id').value = usuario._id;
            document.getElementById('idrol').value = usuario.idrol;
            document.getElementById('nombrerol').value = usuario.nombrerol;
            document.getElementById('descrol').value = usuario.descrol;
            document.getElementById('permisosrol').value = usuario.permisosrol;
        })
        .catch(function (error) {
            console.error('Error al obtener los detalles del cliente:', error);
        });
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
  











// if(document.querySelector('#btnRegistrar')){
//     document.querySelector('#btnRegistrar')
//     .addEventListener('click',registrar)
// }

// if(document.querySelector('#btnActualizar')){
//     document.querySelector('#btnActualizar')
// .addEventListener('click',actualizar)
// }

