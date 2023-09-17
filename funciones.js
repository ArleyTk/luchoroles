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
        datos = 
        listaUsuarios.map(function(usuario) {//Recorrer el array
            respuesta +=

            `<tr>
            <td>${usuario.idrol}</td>`+
            `<td>${usuario.nombrerol}</td>`+
            `<td>${usuario.descrol}</td>`+
            `<td>${usuario.permisosrol}</td>`+
            `<td>                                <i class="fa-solid fa-pen-to-square iconosRojos" onclick="window.location.href='ActualizarRoles.html?idrol=${usuario._id}'"></i>
            <i class="fas fa-toggle-on toggle-icon "></i>
            <i class="fa-solid fa-trash iconosRojos"  onclick='eliminar("${usuario._id}")'></i>
            </td>`+

            `</tr>`
            body.innerHTML = respuesta
        })

        datos =
  listaUsuarios.map(function (usuario) {
    respuesta +=
      `<tr>
        <td>${usuario.idrol}</td>`+
        `<td>${usuario.nombrerol}</td>`+
        `<td>${usuario.descrol}</td>`+
        `<td>${usuario.permisosrol}</td>`+
        `<td>
          <i class="fa-solid fa-pen-to-square iconosRojos" onclick="window.location.href='ActualizarRoles.html'"></i>
          <i class="fas fa-toggle-on toggle-icon "></i>
          <i class="fa-solid fa-trash iconosRojos"  onclick='eliminar("${usuario._id}")'></i>
        </td>`+
      `</tr>`;
    body.innerHTML = respuesta;
  });

    })


    
}
const registrar = async()=>{
    let _idrol = document.getElementById('idrol').value
    let _nombrerol = document.getElementById('nombrerol').value
    let _descrol = document.getElementById('descrol').value
        let usuario = {
            idrol:_idrol,
            nombrerol: _nombrerol,
            descrol:_descrol,
            permisosrol: "TeamoXimena"
        }

        fetch(url,  {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(usuario),//Convertir el objeto _usuario  a un JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
        .then(json => {
            //alert(json.msg)//Mensaje que retorna la API
            console.log(json)
            if(json.msg){
                Swal.fire(
                    json.msg,
                    '',
                    'success'
                )
            }
        })
    }


const editar= (usuario)=>{
    document.getElementById('idrol').value = ''
    document.getElementById('nombrerol').value = ''
    document.getElementById('descrol').value = ''
    document.getElementById('permisosrol').value = ''

    document.getElementById('idrol').value = usuario.idrol
    document.getElementById('nombrerol').value = usuario.nombrerol
    document.getElementById('descrol').value = usuario.descrol
    document.getElementById('permisosrol').value = usuario.permisosrol
}

const actualizar = (id)=>{
    let _idrol = document.getElementById('idrol').value
    let _nombrerol = document.getElementById('nombrerol').value
    let _descrol = document.getElementById('descrol').value


    let usuario = {
        idrol:_idrol,
        nombrerol: _nombrerol,
        descrol:_descrol,
        permisosrol: "TeamoXimena2"
    }

        fetch(url,  {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(usuario),//Convertir el objeto _usuario  a un JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
        .then(json => {
            alert(json.msg)//Mensaje que retorna la API
        })
    }
   


const eliminar = (id) =>{

           let usuario = {
                _id: id
            }
           fetch(`${url}?_id=${usuario._id}`,  {
                method: 'DELETE',
                mode: 'cors',
                body: JSON.stringify(usuario),//Convertir el objeto _usuario  a un JSON
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            
            
            .then((resp) => resp.json())
            .then(function (data) {
              // Maneja la respuesta después de eliminar el usuario, por ejemplo, actualizando la tabla
              console.log('Usuario eliminado:', data);
              listarDatos(); // Vuelve a cargar la lista después de eliminar
            })
            .catch(function (error) {
              // Maneja los errores
              console.error('Error al eliminar usuario:', error);
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

