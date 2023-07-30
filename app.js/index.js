/* 
 /$$                      /$$$$$$                   
|__/                     /$$__  $$                  
 /$$  /$$$$$$  /$$$$$$$ | $$  \__//$$$$$$   /$$$$$$ 
| $$ /$$__  $$| $$__  $$| $$$$   /$$__  $$ /$$__  $$
| $$| $$  \ $$| $$  \ $$| $$_/  | $$$$$$$$| $$  \__/
| $$| $$  | $$| $$  | $$| $$    | $$_____/| $$      
| $$|  $$$$$$$| $$  | $$| $$    |  $$$$$$$| $$      
|__/ \____  $$|__/  |__/|__/     \_______/|__/      
     /$$  \ $$                                      
    |  $$$$$$/                                      
     \______/                                       
*/

window.addEventListener("load",start_carrousel);

const header_logo = document.getElementById('header-logo');
header_logo.addEventListener("click",to_github => window.location.href = "https://github.com/ignfer");

const balance_cfg = document.getElementById('balance-header-config');
balance_cfg.addEventListener("click",balance_modal);

function balance_modal(){
  console.log("hola-balance");
  saludar("pepe");
}

const new_card_send = document.getElementById("gasto");
new_card_send.addEventListener("click",nueva_tarjeta);

const tags = document.getElementsByClassName("tag");

for (let i = 0; i < tags.length; i++) {
  const element = tags[i];
  element.addEventListener("click",add_tag);
}

const tags_map = new Map();

/* @el monto que hay gastado en cada uno de los tags, cada posicion se corresponde con un tag unico */
let tags_monto = [0,0,0,0,0,0,0,0];
const MAX_AMOUNT = 999999;
//let indice_tarjeta = 0; /* variable global que lleva la cuenta de tarjetas generadas*/


/*
* this function is added to all the tag buttons on the 'new-card' panel
* when a tag is clicked it'll be highlighted and added to the 'tags_map'
* if the tag clicked was already highlighted, then it's removed from the 
* 'tags_map' and its opacity will be diminshed
* 
* also there is a little filter in wich only the 'n-tags' or the tags 
* which belong to the 'new-card' panel are afected, the tags on the side-panel
* are ignored
*/
function add_tag(){
  const index = this.dataset.index;
  const desc = this.dataset.desc;

  if(!tags_map.has(index)){
    tags_map.set(index,desc);
    const highlighted_tags = Array.from(document.getElementsByClassName('tag'));
    
    highlighted_tags.forEach((element)=>{
        if(element.id === 'n-tag' + index){
            element.style.opacity = '1';
        }
    });
  }else{
    tags_map.delete(index);
    const highlighted_tags = Array.from(document.getElementsByClassName('tag'));
    
    highlighted_tags.forEach((element)=>{
        if(element.id === 'n-tag' + index){
            element.style.opacity = '0.5';
        }
    });     
  }
}

function nueva_tarjeta(){
    /*
    @el parametro 'tipo' nos indica si la tarjeta pertenece a un gasto o a un ingreso ya que
    son muy pocas las cosas que cambian en cada caso y asi evitamos repetir codigo inecesario.

    @si bien siempre es buena practica usar nombres de variables descriptivos, para las ids
    que se encuentran a simple vista en el documento html preferi no hacerlas tan explicitas
    ya que me parecio mejor practica. 
    */

    let balance = parseInt(document.getElementById('gbcjs').innerText); /* 'gbcjs' = get balance con java script */
    let monto = parseInt(document.getElementsByClassName('nuevo-monto-entrada')[0].value);
    let empty = document.getElementById('if-empty');
    
    /* esconde el div que se muestra si no hay tarjetas aun */
    if(empty.checkVisibility()){
        empty.style.display = "none";
    }

    /* */
    if(monto < 0){
        alert("El monto ingresado no puede ser menor que 0!, intente nuevamente.")
        limpiar_campos();
        return;
    }

    if(isNaN(balance) || isNaN(monto)){
        alert('El titulo o el monto no pueden ser vacios!, intente nuevamente.');
        return;
    }
    
    let resultado = balance - monto;
    
    let lateral = document.getElementsByClassName('side-bar-content')[0];

    /* declaracion de datos para la nueva tarjeta */

    let tarjeta_titulo = document.getElementById('gtt').value; //gtt = get titulo tarjeta
    let tarjeta_descr = document.getElementById('gdt').value; //gtd = get descr tarjeta
    let tarjeta_monto = document.getElementById('gmt').value; //gmt = get monto tarjeta
    const tarjeta_date = new Date();
    let tarjeta_dia = tarjeta_date.getDate();
    let tarjeta_mes = tarjeta_date.getMonth();
    tarjeta_mes += 1;
    let tarjeta_anio = tarjeta_date.getFullYear();

    /* creacion y asignacion de valores de la nueva tarjeta */

    let nueva_tarjeta = document.createElement("div");
    nueva_tarjeta.className = "card";
    nueva_tarjeta.id = "tarjeta-" + indice_tarjeta;

    let nuevo_fecha = document.createElement("div");
    nuevo_fecha.className = "card-date";
    nuevo_fecha.innerHTML = tarjeta_dia + "/" + tarjeta_mes + "/" + tarjeta_anio; 

    let nuevo_titulo = document.createElement("div");
    nuevo_titulo.className = "card-tittle";
    nuevo_titulo.innerHTML = tarjeta_titulo;

    /* creacion de tags */
    let nuevo_tags = document.createElement("div");
    nuevo_tags.className = "card-tags";
    
    for (let i = 0; i < id_selected_tags.length; i++) {
        let tag_individual = document.createElement("div");
        /* 'solid-tag' hace referencia a todos aquellos tags a los que no se le cambiara
        su opacidad una vez terminada esta operacion, permite reutilizar estilos manteniendo
        el control individual de cada uno */
        tag_individual.className = "solid-tag";
        /* le asigna la id que se encuentre en la posicion i dentro del array
        de ids seleccionadas */
        tag_individual.id = "n-tag" + id_selected_tags[i];
        tag_individual.innerHTML = "<h5>" + tags_texto[id_selected_tags[i]] + "</h5>";
        nuevo_tags.appendChild(tag_individual);
    }

    let nuevo_descr = document.createElement("div");
    nuevo_descr.className = "card-descr";
    nuevo_descr.innerHTML = tarjeta_descr;

    let nuevo_monto = document.createElement("div");
    nuevo_monto.className = "card-amount";
    
    nuevo_monto.innerHTML = "-$" + tarjeta_monto;
    

    let nuevo_eliminar = document.createElement("div");
    nuevo_eliminar.className = "card-delete";

    let nuevo_boton_eliminar = document.createElement("button");
    nuevo_boton_eliminar.className = "btn-card-delete";
    nuevo_boton_eliminar.onclick = function(){remover_tarjeta(nueva_tarjeta.id)};
    nuevo_eliminar.append(nuevo_boton_eliminar);
    
    /* appendear datos a la nueva tarjeta y esta ultima al panel lateral */

    nueva_tarjeta.append(nuevo_fecha);
    nueva_tarjeta.append(nuevo_titulo);
    nueva_tarjeta.append(nuevo_tags);
    nueva_tarjeta.append(nuevo_descr);
    nueva_tarjeta.append(nuevo_monto);
    nueva_tarjeta.append(nuevo_eliminar);
    
    nueva_tarjeta.style.transform = 'translateX(-200%)';
    setTimeout(function actualizar(){
        nueva_tarjeta.style.transform = 'translateX(+0%)';
    },250);

    if(resultado < 0){
        alert('El balance no puede ser negativo! intente de nuevo.');
    }else if(resultado <= MAX_AMOUNT){
        /* inserta la nueva tarjeta al principio de la lista de nodos hijo de 'lateral'*/ 
        lateral.insertBefore(nueva_tarjeta, lateral.firstChild); 
        document.getElementById('gbcjs').innerText = resultado;
        calcular_monto(monto);
        actualizar_monto();
        actualizar_barras();
        indice_tarjeta += 1;
    }else if(resultado > MAX_AMOUNT){
        alert('El balance no puede superar el monto de $999,999 (actualmente ;) ).');
    }

    limpiar_campos();
}

/* @le suma a los 'tags_monto' involucrados en la transaccion, el monto que fue usado */
function calcular_monto(monto){
    id_selected_tags.forEach(element => {
        tags_monto[element] += monto;
    });
}

/* @actualiza uno a uno las distintas barras de gasto con su precio */
function actualizar_monto(){
    const montos_a_actualizar = document.getElementsByClassName('seccion-texto');
    for (let i = 0; i < montos_a_actualizar.length; i++) {
        const element = montos_a_actualizar[i];
        element.innerHTML = '$' + tags_monto[i];
    }  
}

/* @actualiza la altura de las barras de la grafica proporcionalmente 

@definir el o los valores maximos como el 90% (el 100% ocupa demasiado espacio),
hacerle regla de tres al resto de valores para sacar su altura en porcentaje.

*/
function actualizar_barras(){
    const barras_a_actualizar = document.getElementsByClassName('barra');
    let alturas = [];
    let maximo = 0;

    /* busco el maximo */
    tags_monto.forEach(element => {
        if(element >= maximo){
            maximo = element;
        }
    });

    if(maximo === 0){
        maximo = 1;
    }

    /* defino el porcentaje de cada valor relativo al maximo y asi su altura en barra*/
    tags_monto.forEach(element => {
        let altura_individual;
        altura_individual = parseInt((element * 100) / maximo);

        /* limito los rangos que puede representar una altura, no puede ser mayor que 90% ni menor que 1% principalmente
        por motivos esteticos */
        if(altura_individual > 90){
            altura_individual = 90;
        }else if(altura_individual < 1){
            altura_individual = 1;
        }
        alturas.push(altura_individual);
    });

    for (let i = 0; i < barras_a_actualizar.length; i++) {
        const element = barras_a_actualizar[i];
        element.style.height = alturas[i] + "%";
    } 
}

function limpiar_campos(){
    let reset_opacidad = document.getElementsByClassName('tag');
    for (let i = 0; i < reset_opacidad.length; i++) {
        const element = reset_opacidad[i];
        element.style.opacity = '0.5';
    }
    id_selected_tags = [];
    document.getElementById('gdt').value = '';
    document.getElementById('gtt').value = '';
    document.getElementById('gmt').value = '';
}

function estado(id){
    let id_concatenada = 'punto-' + id;
    const punto = document.getElementById(id_concatenada);
    const puntos = document.getElementsByClassName('punto-on');

    for (var i = 0; i < puntos.length; i++) {
        puntos[i].className = 'punto-off';
    }
    
    if(punto.className='punto-off'){
        punto.className = 'punto-on';
    }
}

function start_carrousel(){
    var contenido = [
    'Usualmente tus gastos incrementan hasta un 15% los fines de semanas',
    'Sueles ahorrar 5% mas en los primeros 15 dias del mes',
    'La categoria en la que mas gastas actualmente es: comida',
    'Tus gastos aumentan hasta un 50% cuando sales con amigos'];

    const elemento = document.getElementsByClassName('tendencias-mensaje')[0];

    let i = 0;
    showSlides();

    function showSlides() {
        elemento.style.transform = 'translateX(-150%)';
        setTimeout(function actualizar(){
        elemento.style.transform = 'translateX(+0%)';
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

function remover_tarjeta(id){
    limpiar_campos();
    const tarjeta = document.getElementById(id);
    const tags_a_actualizar = [];
    let monto;
    
    /* @recorro los hijos de la tarjeta eliminada para encontrar el monto que hay que 
    restar a las graficas y para saber a que tags pertenecen*/
    
    let hijos = tarjeta.childNodes;
    for (let i = 0; i < hijos.length; i++) {
        const element = hijos[i];
        /* una vez encontrado el div que contiene los tags, lo recorro y me guardo los ids de los 
        tags usados*/
        if(element.className === "card-tags"){
            let tags = element.childNodes;
            for (let j = 0; j < tags.length; j++) {
                const element = tags[j];
                id_selected_tags.push(element.id[5]);
            }
        }
        /* consigo el monto que tengo que restar */
        if(element.className === "card-amount"){
            if(element.innerText[0] === "-"){
                monto = element.innerText;
                monto = monto.slice(2);
            }
        }
    }

    calcular_monto(monto,1);
    actualizar_monto();
    actualizar_barras();

    tarjeta.style.transform = 'translateX(-200%)';
    setTimeout(function actualizar(){
        tarjeta.remove();
    },250);
    
    limpiar_campos();
}

