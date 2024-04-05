const stars = document.querySelectorAll('.star'); 

stars.forEach(function(star, ver_informacion) {
    star.addEventListener('click', function() {
        for (let i=0; i<=ver_informacion; i++) {
            stars[i].classList.add('checked');
        }
        for (let i=ver_informacion+1; i<stars.length; i++){
            stars[i].classList.remove('checked');
        }
    })
})