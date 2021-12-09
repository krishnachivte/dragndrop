import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react'
import { useParams } from 'react-router';
import store, { Item } from './store';
// import { useParams } from 'react-router'

function Details(props:any) {
    const urlobject = useParams();
    let category:string | undefined = urlobject.id ;
    if(category){
        store.category = category;
    }

    console.log('category ',category, toJS(store.tasks),toJS(store.ondata));
    category = category && category.replace(/[^a-z]/gi, '')
    const iterate:Item[] =  category === "food" ? store.ondata.food 
                    : category === "electricals" ? store.ondata.electricals
                    : category === "entertainment" ? store.ondata.entertainment
                    : store.ondata.shopping
    
    return (
        <div className='w-full p-2 flex flex-col items-center'>
            <p className='uppercase text-center font-bold font-serif my-2'>List Items of {category}</p>
            <ul className='w-full md:w-2/3 items-center'>
                {iterate && iterate.length > 0 && iterate.map((task) => (
                    <li key={task.id} className='p-2 border-2 border-blue-600 bg-black 
                    text-white mb-1 draggable'>{task.data}</li>
                )) }
                <li></li>
            </ul>
        </div>
    )
}

export default observer(Details)
