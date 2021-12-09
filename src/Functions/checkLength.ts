import {obj} from '../store';
export function checkingLength(item:obj){
    if(item.food.length) return false;
    else if(item.entertainment.length) return false;
    else if(item.electricals.length) return false;
    else if(item.shopping.length) return false;
    else return true;
}