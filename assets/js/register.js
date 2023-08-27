const HOST = 'localhost';
const PORT = '3000';
const URL = `http://${HOST}:${PORT}`;

document.getElementById("register-form").addEventListener("submit", function(event){
    
    event.preventDefault()
    const nombreCompleto = document.getElementById('name').value;
    const edad = document.getElementById('age').value;
    const correo = document.getElementById('email').value;
    const contrasena = document.getElementById('password').value;
    const experiencia = document.getElementById('experience').value;

    const usuario = {
        nombreCompleto: nombreCompleto,
        edad: edad,
        correo: correo,
        contrasena: contrasena,
        experiencia: experiencia
    }

    fetch(`${URL}/motoristas/aplicar`,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(usuario)
    })
    .then((response)=>response.json())
    .then((result)=>{
        if(result.mensaje === 'Solicitud enviada con éxito.'){
            alert('¡Tu solicitud se ha enviado con éxito!');
            window.location.href = '../../index.html';
        }else{
            document.getElementById('error-cuenta').style.display = 'block';
        }
    })
});
