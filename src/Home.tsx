import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import React, { useState } from 'react'
import { categories } from './categories';
import Block from './Block';
import store, { categoryType, Item } from './store';


interface DragEvent<T = Element> extends React.MouseEvent<T, Event> {
    dataTransfer: DataTransfer;
}


 function Home() {
    const [listitems, setlistitems] = useState<Item[]>([]);
    const [item, setitem] = useState<string>('');
    const [categ, setcateg] = useState<string>('');
    const [successString, setsuccessString] = useState<string>('')
    // const [tasks, settasks] = useState<obj>({
    //     food: [],
    //     shopping: [],
    //     entertainment: [],
    //     electricals: []
    // })


    const handlesubmititem = (e: React.MouseEvent<HTMLElement>) => {
        if(!item.length && !categ.length){
            console.error('item and category cannot be empty',item,categ);  
        }else{
            setlistitems([...listitems, {
                id: ''+new Date().getTime(),
                data: item,
                category: categ
            }])
            setitem('');
            setcateg('')
        }
    }

    const onDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }
    const ondragstart = (e: DragEvent<HTMLElement> ,item:Item) => {
        e.dataTransfer.setData('item',''+item.id);
    }
    function ondrop(e:any){
        let id:string = e.dataTransfer.getData('item');
        let unmatched: Item= listitems[0];
        const filtereditems = listitems.filter(item => {
            if(item.id !== id ){
                return item;
            }else{
                unmatched = item;
            }
        })
        store.checklength = false;
        setlistitems(filtereditems)
        let ind:string = e.target.innerHTML;
        store.category = ind.replace(/[^a-z]/gi, '');
        const newTask:Item = {
            id: ''+new Date().getTime(),
            data: unmatched.data,
            category: ind.replace(/[^a-z]/gi, ''),
        }
        let something;
        let updatedarr:Item[] = [];

        if(ind.replace(/[^a-z]/gi, '') === "food"){
            something = toJS(store.tasks.food);
            updatedarr = [...something,newTask]
            store.tasks['food']=updatedarr
        }
        else if(ind.replace(/[^a-z]/gi, '') === 'entertainment'){
            something = toJS(store.tasks.entertainment);
            updatedarr = [...something,newTask]
            store.tasks['entertainment']=updatedarr
        }else if(ind.replace(/[^a-z]/gi, '') === 'electricals'){
            something = toJS(store.tasks.electricals);
            updatedarr = [...something,newTask]
            store.tasks['electricals']=updatedarr
        }else if(ind.replace(/[^a-z]/gi, '') === 'shopping'){
            something = toJS(store.tasks.shopping);
            updatedarr = [...something,newTask]
            store.tasks['shopping']=updatedarr
        }
        if(ind.length){
            setsuccessString('Successfully added item to '+ind+ ' category');
            setTimeout(() => {
                setsuccessString('');
            },5000)
        }
    }
    return (
        <div className='w-screen'>
            <div className='flex justify-start w-screen p-2 flex-col md:flex-row text-xs md:text-base bg-green-300'>
                <div className='flex-1 flex md:justify-center justify-start mt-4 md:mb-4'>
                            <input type='text' name='itemsValue' value={item}
                            placeholder="enter the item to be added"
                            className='mr-2 p-1 w-full md:w-1/2 border-2 rounded border-gray-500'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setitem(e.target.value);
                            }}
                            />
                            <select className='mr-2 border-2 border-gray-500 rounded'
                            value = {categ}
                            onChange={(e) => {
                                setcateg(e.target.value)
                            }}>
                                <option value=''>select one</option>
                                {categories.length !==0 && categories.map((item:categoryType) => (
                                    <option value={item} key={item}>{item}</option>
                                ))}
                                
                                
                            </select>
                            <button type='submit' value='button'
                            className='bg-blue-600 text-white rounded-sm p-1 min-w-max'
                            onClick={handlesubmititem}
                            >Add Item</button>
                </div>
                <div className='flex-1 flex md:justify-center justify-start my-4'>
                            <input type='text' name='itemsValue'
                            placeholder="enter the item to be added"
                            className='mr-3 p-1 w-full md:w-1/2 border-2 rounded border-gray-500' />
                            <button type='submit' value='button'
                            className='bg-blue-600 text-white rounded-sm p-1 min-w-max'>Add Category</button>
                </div>
            </div>



            <div className='flex justify-start w-screen p-2 flex-col md:flex-row text-xs md:text-base min-h-max'>
                <div className='flex-1'>
                    <p className='uppercase text-center font-bold font-serif'>List Items</p>
                    <ul className='w-full text-center mt-4 p-2'>
                    {listitems.length !==0  && listitems.map(item => (
                        <li key={item.id} className='p-2 border-2 border-blue-600 bg-black 
                        text-white mb-1 draggable' draggable
                        onDragStart={(e) => ondragstart(e,item)}>{item.data}</li>
                    ))}
                    </ul>
                </div>
                <Block successString={successString} onDragOver={onDragOver} ondrop={ondrop} />
            </div>
        </div>
    )
}

export default observer(Home)
