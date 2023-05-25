
function nuevo_gasto(){
    /* si bien siempre es buena practica usar nombres de variables descriptivos, para las ids
    que se encuentran a simple vista en el documento html preferi no hacerlas tan explicitas
    ya que me parecio mejor practica */


    let balance = parseInt(document.getElementById('gbcjs').innerText); /* 'gbcjs' = get balance con java script */
    let monto = parseInt(document.getElementsByClassName('nuevo-monto-entrada')[0].value);
    let resultado = balance - monto;
    let lateral = document.getElementsByClassName('lateral_contenido')[0];

    /* declaracion de datos para la nueva tarjeta */

    let tarjeta_titulo = document.getElementById('gtt').value; //gtt = get titulo tarjeta
    let tarjeta_descr = document.getElementById('gdt').value; //gtd = get descr tarjeta
    let tarjeta_monto = document.getElementById('gmt').value; //gmt = get monto tarjeta
    let tarjeta_date = new Date();
    let tarjeta_dia = tarjeta_date.getDay();
    let tarjeta_mes = tarjeta_date.getMonth();
    let tarjeta_anio = tarjeta_date.getFullYear();

    /* creacion y asignacion de valores de la nueva tarjeta */

    let nueva_tarjeta = document.createElement("div");
    nueva_tarjeta.className = "nueva-tarjeta";

    let nuevo_fecha = document.createElement("div");
    nuevo_fecha.className = "tarjeta-fecha";
    nuevo_fecha.innerHTML = tarjeta_dia + "/" + tarjeta_mes + "/" + tarjeta_anio; 

    let nuevo_titulo = document.createElement("div");
    nuevo_titulo.className = "tarjeta-titulo";
    nuevo_titulo.innerHTML = tarjeta_titulo;

    let nuevo_descr = document.createElement("div");
    nuevo_descr.className = "tarjeta-descr";
    nuevo_descr.innerHTML = tarjeta_descr;

    let nuevo_monto = document.createElement("div");
    nuevo_monto.className = "tarjeta-monto";
    nuevo_monto.innerHTML = "-$" + tarjeta_monto;

    /* appendear datos a la nueva tarjeta y esta ultima al panel lateral */

    nueva_tarjeta.append(nuevo_fecha);
    nueva_tarjeta.append(nuevo_titulo);
    nueva_tarjeta.append(nuevo_descr);
    nueva_tarjeta.append(nuevo_monto);

    lateral.appendChild(nueva_tarjeta);
    nueva_tarjeta.style.transform = "translateX(-200%)";
    setTimeout(function actualizar(){
        nueva_tarjeta.style.transform = "translateX(+0%)";
        elemento.innerHTML = contenido[id];
    },250);

    if( resultado < 0){
        alert("El balance no puede ser negativo! intente de nuevo.");
    }else{
        console.log(resultado);
        document.getElementById('gbcjs').innerText = resultado;
    }

    limpiar_campos();
}

function limpiar_campos(){
    document.getElementById('gtt').value = "";
    document.getElementById('gdt').value = "";
    document.getElementById('gmt').value = ""; 
}

function nuevo_ingreso(){
    let balance = parseInt(document.getElementById('gbjs').innerText);
    let monto = parseInt(document.getElementsByClassName('nuevo-monto-entrada')[0].value);
    let resultado = balance + monto;

    document.getElementById('gmjs').innerText = resultado;
}

function to_github(){
    window.location.href = "https://github.com/ignfer";
}

function ingresar_gasto(){
    const titulo = document.getElementsByClassName('new_tittle_input')[0].value;
    const cuerpo = document.getElementsByClassName('new_descr_input')[0].value;

    console.log(titulo + cuerpo);
}

function estado(id){
    let id_concatenada = "punto-" + id;
    const punto = document.getElementById(id_concatenada);
    const puntos = document.getElementsByClassName('punto-on');

    for (var i = 0; i < puntos.length; i++) {
        puntos[i].className = 'punto-off';
    }
    
    if(punto.className='punto-off'){
        punto.className = 'punto-on';
    }
}

function tendencias(){
    var contenido = [
    'Usualmente tus gastos incrementan hasta un 15% los fines de semanas',
    'Sueles ahorrar 5% mas en los primeros 15 dias del mes',
    'La categoria en la que mas gastas actualmente es: comida',
    'Tus gastos aumentan hasta un 50% cuando sales con amigos'];

    const elemento = document.getElementsByClassName('tendencias-mensaje')[0];

    let i = 0;
    showSlides();

    function showSlides() {
        elemento.style.transform = "translateX(-150%)";
        setTimeout(function actualizar(){
        elemento.style.transform = "translateX(+0%)";
        elemento.innerHTML = contenido[i];
        },1000);
        estado(i);

        i++;
        if (i >= 4){
            i = 0
        }
        setTimeout(showSlides, 4000);
    } 
}

