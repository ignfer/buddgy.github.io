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


/* handlers start */
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

/* handlers end*/

/* variable declaration start */
const tags_map = new Map();
const tags_amount_map = new Map();
tags_amount_map.set("Comida",0);
tags_amount_map.set("Trabajo",0);
tags_amount_map.set("Ocio",0);
tags_amount_map.set("Casa",0);
tags_amount_map.set("Electrodomestico",0);
tags_amount_map.set("Servicio",0);
tags_amount_map.set("Subscripcion",0);
tags_amount_map.set("Vestimenta",0);
const MAX_AMOUNT = 999999;
//let indice_tarjeta = 0; /* variable global que lleva la cuenta de tarjetas generadas*/

/* variable declaration end*/

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
  let current_balance = parseInt(document.querySelector('#balance-total').innerText);
  const amount = parseInt(document.querySelector('#new-card-amount').value);
  const empty = document.querySelector('#if-empty');
  const lateral = document.querySelector('.side-bar-content');
  
  /*controls start*/

  /* hides the div if there is no cards availables to show*/
  if(empty.checkVisibility()){
    empty.style.display = "none";
  }

  let final_result;

  if(amount < 0){
    alert("El monto ingresado no puede ser menor que 0!, intente nuevamente.")
    clear_fields();
    return;
  }else if(isNaN(current_balance) || isNaN(amount)){
    alert('El titulo o el monto no pueden ser vacios!, intente nuevamente.');
    return;
  }else{
    final_result = current_balance - amount;
  }

  /*controls ends*/

  /* declaracion de datos para la nueva tarjeta */

  const new_card_tittle = document.querySelector('#new-card-tittle').value;

  let new_card_desc = document.querySelector('#new-card-tittle').value;

  const new_card_date = new Date();
  const new_card_day = new_card_date.getDate();
  let new_card_month = new_card_date.getMonth();
  new_card_month += 1;
  const new_card_year = new_card_date.getFullYear();

  /* creacion y asignacion de valores de la nueva tarjeta */

  const template_card = document.createElement('div');
  template_card.className = 'card';
  template_card.id = 'card-' + this.dataset.index;

  const template_tittle = document.createElement('div');
  template_tittle.className = 'card-tittle';
  template_tittle.innerHTML = new_card_tittle;

  const template_date = document.createElement('div');
  template_date.className = 'card-date';
  template_date.innerHTML = `${new_card_day}/${new_card_month}/${new_card_year}`;

  /* creacion de tags */
  const template_tags = document.createElement('div');
  template_tags.className = 'card-tags';
  
  tags_map.forEach((value,key)=>{
    const template_individual_tag = document.createElement('div');
    template_individual_tag.className = 'solid-tag';
    template_individual_tag.id = 'n-tag' + key;
    template_individual_tag.innerHTML = '<h5>' + value + "</h5>";
    template_individual_tag.setAttribute('desc',value);
    template_tags.appendChild(template_individual_tag);
  });

  const template_desc = document.createElement('div');
  template_desc.className = 'card-desc';
  template_desc.innerHTML = new_card_desc;

  const template_amount = document.createElement('div');
  template_amount.className = 'card-amount';
  
  template_amount.innerHTML = `-$ ${amount}`;
  

  const template_delete = document.createElement('div');
  template_delete.className = 'card-delete';

  const template_delete_btn = document.createElement('button');
  template_delete_btn.className = 'btn-card-delete';
  template_delete_btn.addEventListener("click",delete_card);
  template_delete_btn.setAttribute('data-id',this.dataset.index);
  template_delete.append(template_delete_btn);
  
  /* appendear datos a la nueva tarjeta y esta ultima al panel lateral */

  template_card.append(template_date);
  template_card.append(template_tittle);
  template_card.append(template_tags);
  template_card.append(template_desc);
  template_card.append(template_amount);
  template_card.append(template_delete);
  
  template_card.style.transform = 'translateX(-200%)';
  setTimeout(function actualizar(){
    template_card.style.transform = 'translateX(+0%)';
  },250);

  if(final_result < 0){
    alert('El balance no puede ser negativo! intente de nuevo.');
  }else if(final_result <= MAX_AMOUNT){
    lateral.insertBefore(template_card, lateral.firstChild); 
    document.getElementById('balance-total').innerText = final_result;
    calculate_amount(amount);
    update_amount();
    update_graphs();
    let int_index = parseInt(this.dataset.index);
    int_index += 1;
    this.dataset.index = int_index; 
  }else if(final_result > MAX_AMOUNT){
    alert('El balance no puede superar el monto de $999,999 (actualmente ;) ).');
  }

  clear_fields();
}

/* @le suma a los 'tags_monto' involucrados en la transaccion, el monto que fue usado */
function calculate_amount(amount){
  tags_map.forEach((key)=>{
    if(tags_amount_map.has(key)){
      let current_amount = tags_amount_map.get(key);
      let total_amount = current_amount += amount;
      tags_amount_map.set(key,total_amount);
    }else{
      tags_amount_map.set(key,amount);
    }
  });
}

/* @actualiza uno a uno las distintas barras de gasto con su precio */
function update_amount(){
  const graph_text_to_update = document.getElementsByClassName('seccion-texto');
    for (let i = 0; i < graph_text_to_update.length; i++) {
      const element = graph_text_to_update[i];
      let amount;
      if(tags_amount_map.has(element.dataset.tag)){
        amount = tags_amount_map.get(element.dataset.tag);
      }
      element.innerHTML = '$' + amount;
    }
}

/* @actualiza la altura de las barras de la grafica proporcionalmente 

@definir el o los valores maxs como el 90% (el 100% ocupa demasiado espacio),
hacerle regla de tres al resto de valores para sacar su altura en porcentaje.

*/
function update_graphs(){
  const graphs_to_update = document.getElementsByClassName('barra');
  let heights = [];
  let max = 0;

  /* search for the biggest amount of all the tags*/
  tags_amount_map.forEach(value => {
    if(value >= max){
        max = value;
    }
  });

  if(max === 0){max = 1;}

  /* defino el porcentaje de cada valor relativo al max y asi su altura en barra*/
  tags_amount_map.forEach(value => {
    let individual_height;
    individual_height = parseInt((value * 100) / max);

    /* limito los rangos que puede representar una altura, no puede ser mayor que 90% ni menor que 1% principalmente
    por motivos esteticos */
    if(individual_height > 90){
        individual_height = 90;
    }else if(individual_height < 1){
        individual_height = 1;
    }
    heights.push(individual_height);
  });

  for (let i = 0; i < graphs_to_update.length; i++) {
    const element = graphs_to_update[i];
    element.style.height = heights[i] + "%";
  }
}

function clear_fields(){
  let reset_opacity = Array.from(document.getElementsByClassName('tag'));
  reset_opacity.forEach((element)=>{
    element.style.opacity = '0.5';
  });

  document.querySelector('#new-card-tittle').value = '';
  document.querySelector('#new-card-desc').value = '';
  document.querySelector('#new-card-amount').value = '';
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

function delete_card(){
  clear_fields();
  const card = document.querySelector(`#card-${this.dataset.id}`);
  const tags_to_update = [];
  let amount;
  let tags;
  
  //find the tag container
  //find each individual tag desc
  //find the amount
  //update the amount of each individual tag

  calculate_amount(amount,1);
  update_amount();
  update_graphs();

  card.style.transform = 'translateX(-200%)';
  setTimeout(function actualizar(){
      card.remove();
  },250);
  
  clear_fields();
}

