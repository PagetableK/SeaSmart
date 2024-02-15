/*
    Controlador que se utilizará en sitio privado de administrador
*/

//Declarar constante para asignar el contenido de la etiqueta main
const MAIN = document.querySelector('main');

MAIN.insertAdjacentHTML('beforebegin', `
<header>
<nav class="navbar fixed-top" style="background-color: #BCE7FD;">
<div class="container-fluid mt-5">
<div class="row">
<div class="col">
  <img src="../../resources/img/Logo1.png" width="100px" height="100px col">
  </div>
  <div class="col">
  <form class="d-flex col" role="search">
    <button class="btn btn-outline-success m-1" type="submit">Calificaciones</button>
    <button class="btn btn-outline-success m-1" type="submit">Pedidos</button>
    <button class="btn btn-outline-success m-1" type="submit">Productos</button>
    <button class="btn btn-outline-success m-1" type="submit">Sub-categorías</button>
    <button class="btn btn-outline-success m-1" type="submit">Categorías</button>
  </form>
  </div>
  <div class="col">
  <img src="../../resources/img/user.png" width="50px" height="50px" class="m-5 col">
  </div>
  </div>
</div>
</nav>
</header>
`);