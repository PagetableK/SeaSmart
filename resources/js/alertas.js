var botones_editar_subcategoria = document.querySelectorAll('.btn.btn-success');
botones_editar_subcategoria.forEach(function(boton){
    boton.addEventListener('click', function(){
        var modal = new bootstrap.Modal(document.getElementById('editModal_subCategoria'));
        modal.show();
    })
})


var botones_editar_categoria = document.querySelectorAll('.btn.btn-success.editar');
botones_editar_categoria.forEach(function(boton){
    boton.addEventListener('click', function(){
        var modal = new bootstrap.Modal(document.getElementById('editModal_categoria'));
        modal.show();
    })
})


var botones_editar_color = document.querySelectorAll('.btn.btn-success');
botones_editar_color.forEach(function(boton){
    boton.addEventListener('click', function(){
        var modal = new bootstrap.Modal(document.getElementById('editModal_color'));
        modal.show();
    })
})


var botones_editar_talla = document.querySelectorAll('.btn.btn-success');
botones_editar_talla.forEach(function(boton){
    boton.addEventListener('click', function(){
        var modal = new bootstrap.Modal(document.getElementById('editModal_talla'));
        modal.show();
    })
})