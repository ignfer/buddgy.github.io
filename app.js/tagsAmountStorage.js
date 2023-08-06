export function save_tags_amounts(tags_amount_map){
    tags_amount_map.forEach((key,value)=>{
        localStorage.setItem(value,key)
    });
}