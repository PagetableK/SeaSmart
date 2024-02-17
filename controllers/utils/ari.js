/*
    Controlador que se utilizará en sitio privado de administrador
*/

//Declarar constante para asignar el contenido de la etiqueta main
const MAIN = document.querySelector('main');

MAIN.insertAdjacentHTML('beforebegin', `
<header>
<nav class="navbar fixed-top" style="background-color: #BCE7FD;">
<div class="container-fluid">
  <form class="d-flex" role="search">
    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
    <button class="btn btn-outline-success" type="submit">Search</button>
  </form>
  <img src="../../resources/img/logo.png" alt="Girl in a jacket" width="100" height="100">
</div>
</nav>
</header>
`);