const HOST = 'localhost';
const PORT = '3000';
const URL = `http://${HOST}:${PORT}`;

document.getElementById("login-form").addEventListener("submit", function(event){
    
    event.preventDefault()
    const correo = document.getElementById('email').value;
    const contrasena = document.getElementById('password').value;

    const motorista = {
        correo: correo,
        contrasena: contrasena
    }

    fetch(`${URL}/motoristas/login`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(motorista)
    })
    .then((response)=>response.json())
    .then((result)=>{
        if(result.mensaje === 'Inicio de sesión exitoso.'){
            localStorage.setItem('usuario-actual', JSON.stringify(result));
            window.location.href = "../../main.html";
        }else{
            document.getElementById('error-cuenta').style.display = 'block';
        }
    })
});