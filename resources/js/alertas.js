var botones_editar_subcategoria = document.querySelectorAll('.btn.btn-success.editar');
botones_editar_subcategoria.forEach(function(boton){
    boton.addEventListener('click', function(){
        var modal = new bootstrap.Modal(document.getElementById('editModal_subCategoria'));
        modal.show();
    })
})


var botones_editar_subcategoria = document.querySelectorAll('.btn.btn-success.editar');
botones_editar_subcategoria.forEach(function(boton){
    boton.addEventListener('click', function(){
        var modal = new bootstrap.Modal(document.getElementById('editModal_categoria'));
        modal.show();
    })
})
