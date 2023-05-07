function to_github(){
    window.location.href = "https://github.com/ignfer";
}

function main_height(){
    const max_height = 1500;
    const altura_header = 60; //altura en px del header
    let altura = document.documentElement.clientHeight; //altura inicial de los elementos
    let new_altura = altura -= altura_header; //resultado de restarle el alto del header
    const main_element = document.getElementsByClassName('main')[0]; //elemento 'main'
    const main_area_element = document.getElementsByClassName('main_area')[0]; //elemento 'main_area'

    if(altura < max_height){
        main_element.style.height = new_altura +'px';
        main_area_element.style.height = new_altura +'px';
    }
}