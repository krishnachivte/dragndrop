import {makeAutoObservable, observable} from 'mobx';
// import { useMemo } from 'react';

export interface Item{
    id: string;
    data: string;
    category: string;
}
export type categoryType = 'entertainment' | 'shopping' | 'food' | 'electricals' ;
export interface obj{
    "food": Item[];
    "shopping": Item[];
    "entertainment": Item[];
    "electricals": Item[];
}

class TaskStore {
    tasks: obj = {
        "food": [],
        "shopping": [],
        "entertainment": [],
        "electricals": []
    };
    // const tasks = useMemo(() => computeExpensiveValue(this.tasks), [this.tasks]);
    
    ondata:any ={

    }
    docid:string = '';
    category:string='';
    checklength:boolean=true;
    constructor(){
        makeAutoObservable(this,{
            tasks: observable,
            category: observable,
            docid: observable,
            ondata: observable,
            checklength: observable,
            // handletasks: action,
        })
    }

    // handletasks(ind:string, toupdate: string){

    //     if(ind === 'food') this.tasks = {
    //         ...this.tasks,
    //         food:[...this.tasks.food,toupdate],
    //     }
    //     else if(ind === 'entertainment'){
    //         this.tasks = {
    //             ...this.tasks,
    //             entertainment:[...this.tasks.entertainment,toupdate],
    //         }
    //         console.log('krishna insiede strore ')
    //     } 
    //     else if(ind === 'electricals') this.tasks = {
    //         ...this.tasks,
    //         electricals:[...this.tasks.electricals,toupdate],
    //     }
    //     else if(ind === 'shopping') this.tasks = {
    //         ...this.tasks,
    //         shopping:[...this.tasks.shopping,toupdate],
    //     }
        
    //     console.log('inside store ',toJS(this.tasks),toupdate)
    // }
    
}

const store = new TaskStore();
export default store;

function computeExpensiveValue(tasks: obj): any {
    throw new Error('Function not implemented.');
}
