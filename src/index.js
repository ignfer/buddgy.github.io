function to_github(){
    window.location.href = "https://github.com/ignfer";
}

function ingresar_gasto(){
    const titulo = document.getElementsByClassName('new_tittle_input')[0].value;
    const cuerpo = document.getElementsByClassName('new_descr_input')[0].value;

    console.log(titulo + cuerpo);
}


