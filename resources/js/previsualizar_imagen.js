const defaultFile = '../../resources/img/image.png';

const file = document.getElementById( 'foto' );
const img = document.getElementById('img');
file.addEventListener( 'change', e => {
  if(e.target.files [0] ) {
    const reader = new FileReader( );
    reader.onload = function( e ) {
      img.src = e.target.result;
    }
    reader.readAsDataURL(e.target.files[0])
  }else{
    img.src = defaultFile;
  }
} );

const defaultFile1 = '../../resources/img/image.png';

const file1 = document.getElementById( 'fotou' );
const img1 = document.getElementById('imge');
file.addEventListener( 'change', e => {
  if(e.target.files [0] ) {
    const reader = new FileReader( );
    reader.onload = function( e ) {
      img.src = e.target.result;
    }
    reader.readAsDataURL(e.target.files[0])
  }else{
    img.src = defaultFile;
  }
} );