function to_github(){
    window.location.href = "https://github.com/ignfer";
}

function main_height(){
    let altura = document.documentElement.clientHeight;
    let altura2 = altura -= 60;
    const main_element = document.getElementsByClassName('main')[0];

    if(altura < 1500){
        main_element.style.height = altura2 +'px';
        console.log("nueva altura = " + altura2 + "/" + altura);
    }
}