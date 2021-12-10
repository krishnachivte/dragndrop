import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { categories } from './categories';
import {db} from './firebase-config';
// import firestore  from '@firebase/firestore';
import {collection, DocumentData, getDocs, setDoc, doc} from 'firebase/firestore';
import store from './store';
import { toJS } from 'mobx';
import { checkingLength } from './Functions/checkLength';
import { observer } from 'mobx-react';



function Block(props:any) {
    const taskcollection = collection(db,'tasks');
    useEffect(() => {
        const getalldocs = async() => {
            try{
                await getDocs(taskcollection)
                .then(snapshot => {
                    const dummy: DocumentData[] = []
                    snapshot.forEach(doc => {
                        store.docid = doc.id;
                        const data = doc.data()
                        dummy.push(data)
                    })
                    store.ondata = dummy[0]
                    store.ondata={
                        food: [...store.ondata.food, ...store.tasks.food],
                        entertainment: [...store.ondata.entertainment, ...store.tasks.entertainment],
                        electricals: [...store.ondata.electricals, ...store.tasks.electricals],
                        shopping: [...store.ondata.shopping, ...store.tasks.shopping]
                    }
                });
            }catch(e){
                throw console.error('error in getting docs from firestore ',e);            
            }
            
        }
        getalldocs()
    }, []);

    const handleSaveChanges = async(e: React.MouseEvent<HTMLElement>) => {

        const docRef = doc(db, 'tasks', store.docid);   
        const payload ={
            food: [...store.ondata.food, ...store.tasks.food],
            entertainment: [...store.ondata.entertainment, ...store.tasks.entertainment],
            electricals: [...store.ondata.electricals, ...store.tasks.electricals],
            shopping: [...store.ondata.shopping, ...store.tasks.shopping]
        } 

        try{    
                await setDoc(docRef, payload);
                store.tasks = {
                    "food": [],
                    "shopping": [],
                    "entertainment": [],
                    "electricals": []
                } 
                store.checklength = true;
            
        }catch(e){
            console.log('errroe  ', e)
        }
        store.ondata={
            food: [...store.ondata.food, ...store.tasks.food],
            entertainment: [...store.ondata.entertainment, ...store.tasks.entertainment],
            electricals: [...store.ondata.electricals, ...store.tasks.electricals],
            shopping: [...store.ondata.shopping, ...store.tasks.shopping]
        }

    }

    return (
        <div className='flex-1'>
        <p className='uppercase text-center font-bold font-serif'>catergories</p>
        {props.successString.length !== 0  && <div className='p-2 bg-green-500 text-white'>{props.successString}</div>}

            <div className='w-full flex mt-2 p-2 flex-wrap'>
            {categories.length !==0  && categories.map(item => (
                <Link to={`/details/${item}`}
                key={item} className='p-2 border-2 m-2 border-blue-600 bg-gray-500 
                        text-white mb-1 flex-1 rounded-lg text-center droppable md:font-mono
                        text-lg' 
                >
                    <div  
                        onDragOver={props.onDragOver}
                        onDrop={props.ondrop}
                        style={{minWidth:'150px',minHeight:'150px'}}>  {item}
                            </div>

                </Link> 
                
            ))}
            </div>
            <button type='submit' className={`w-full p-2 bg-red-200
            cursor-pointer uppercase font-bold text-white rounded-2xl ${!checkingLength(store.tasks) && 'hover:bg-red-600' }`}
            onClick={handleSaveChanges} 
            disabled = {store.checklength}
            >
                Save Changes
            </button>

    </div>
    )
}

export default observer(Block);
