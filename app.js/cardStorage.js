/*
* In this file you will find the functions related to store and render things on the
* local storage of the browser, doing this, we prevent from losing data when the user
* refresh the page. 
* Of course is not fancy but for a small-scale project like this I think is enough to
* add some persistency to the data, our main interest is to save cards and amounts of
* each individual tag and the total balance
*/

import { delete_card } from "./index.js";

export function save_card(_id,_year,_month,_day,_tittle,_desc,_tags_map,_amount){
  let array_tags = array_from_map(_tags_map);
  let map_to_object = Object.fromEntries(_tags_map);
  
  let card_obj = {
    id: _id,
    year: _year,
    month: _month,
    day: _day,
    tittle: _tittle,
    desc: _desc,
    tags: map_to_object,
    amount: _amount
  };

  localStorage.setItem(_id,(JSON.stringify(card_obj)));
}

/*
* Render all the deserialized JSON cards located on the localstorage
* on the html
*/
export function load_cards(){
  for (let i = 0; i < localStorage.length; i++) {
    if(localStorage.getItem(i) !== null){
      let deserialized_card = JSON.parse(localStorage.getItem(i));
      
      let current_balance = parseInt(document.querySelector('#balance-total').innerText);
      const amount = parseInt(document.querySelector('#new-card-amount').value);
      const empty = document.querySelector('#if-empty');
      const lateral = document.querySelector('.side-bar-content');

      /* id template */
      const template_card = document.createElement('div');
      template_card.className = 'card';
      template_card.id = 'card-' + deserialized_card.id;

      /* tittle template */
      const template_tittle = document.createElement('div');
      template_tittle.className = 'card-tittle';
      template_tittle.innerHTML = deserialized_card.tittle;

      /* date template */
      const template_date = document.createElement('div');
      template_date.className = 'card-date';
      template_date.innerHTML = `${deserialized_card.day}/${deserialized_card.month}/${deserialized_card.year}`;
      
      /* tags template */
      const template_tags = document.createElement('div');
      template_tags.className = 'card-tags';

      /*
      * given the deserialized_card.tags form, we create a map object again
      * once created we iterate through it creating the tags for each card
      */
      let object_to_map = new Map(Object.entries(deserialized_card.tags));

      object_to_map.forEach((value,key)=>{
        const template_individual_tag = document.createElement('div'); //creates a tag div
        template_individual_tag.className = 'solid-tag';
        template_individual_tag.id = 'n-tag' + key; //sets the id of the div using the map key
        template_individual_tag.innerHTML = '<h5>' + value + "</h5>"; //sets the content of the div using the map value
        template_individual_tag.setAttribute('data-desc',value);
        template_tags.appendChild(template_individual_tag);
      });

      /* description template */
      const template_desc = document.createElement('div');
      template_desc.className = 'card-desc';
      template_desc.innerHTML = deserialized_card.desc;

      /* amount template */
      const template_amount = document.createElement('div');
      template_amount.className = 'card-amount';
      template_amount.innerHTML = `-$ ${deserialized_card.amount}`;

      /* delete card template */
      const template_delete = document.createElement('div');
      template_delete.className = 'card-delete';

      const template_delete_btn = document.createElement('button');
      template_delete_btn.className = 'btn-card-delete';
      template_delete_btn.addEventListener("click",delete_card);
      template_delete_btn.setAttribute('data-id',deserialized_card.id);
      template_delete.append(template_delete_btn);

      /*
      * append the templates to the new card and then append the
      * new card to the side panel
      */

      template_card.append(template_date);
      template_card.append(template_tittle);
      template_card.append(template_tags);
      template_card.append(template_desc);
      template_card.append(template_amount);
      template_card.append(template_delete);
      lateral.insertBefore(template_card, lateral.firstChild);

      /* hides the div if there is no cards availables to show*/
      if(empty.checkVisibility()){
        empty.style.display = "none";
      }
    }
  }
}

/*
* Used to "parse" the 'tags_map' to an array making it usable to save it
* as JSON on the local storage
*/
function array_from_map(map){
  let array = [];
  map.forEach((key,value)=>{
    array.push(value);
  });
  return array;
}