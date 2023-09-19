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
            <i class="fas fa-toggle-on toggle-icon "></i>
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
            if(json.msg){
                Swal.fire(
                    json.msg,
                    '',
                    'success'
                )
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
                if(json.msg){
                    Swal.fire(
                        json.msg,
                        '',
                        'success'
                    )
                }
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

