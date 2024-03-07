document.getElementById('celda-agregar-eliminar').innerHTML =`<button type="button" class="btn btn-success">
<img src="../../resources/img/lapiz.png"
    alt="lapizEditar" width="30px">
</button>
<button type="button" class="btn btn-danger">
<img src="../../resources/img/eliminar.png"
    alt="lapizEditar" width="30px">
</button>`;

document.getElementById('fila-producto').setAttribute("data-bs-target", "#modal");
document.getElementById('fila-producto').setAttribute("data-bs-toggle", "modal");