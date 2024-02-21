/*
    Controlador que se utilizará en sitio privado de administrador
*/

//Declarar constante para asignar el contenido de la etiqueta main
const MAIN = document.querySelector('main');

MAIN.insertAdjacentHTML('beforebegin', `
<header>
  <nav class="navbar fixed-top" style="background-color: #BCE7FD;">
    <div class="container justify-content-center">
      <div class="row">
        <div class="col">
          <img src="../../resources/img/Logo1.png" width="100px" height="100px col">
        </div>
        <div class="col">
          
        </div>
        <div class="col">
          <img src="../../resources/img/user.png" width="50px" height="50px" class="m-5 col">
        </div>
      </div>
    </div>
  </nav>
</header>
`);