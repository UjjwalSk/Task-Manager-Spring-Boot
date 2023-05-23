import {React,useState,useEffect} from 'react';
import axios from './Api';
import Notiflix from 'notiflix';


const Display = (p) => {
    
    const [categories,setCategories] = useState([]);
    const [flag,setFlag] = useState(false);
    const [newCat,setNewCat] = useState("");

    useEffect(() => {
        (async ()=>{
            Notiflix.Confirm.init({
                width: '50%',
                titleFontSize: '35px',
                titleMaxLength: 34,
                messageColor: '#1e1e1e',
                messageFontSize: '25px',
                messageMaxLength: 110,
                buttonsFontSize: '20px',
                buttonsMaxLength: 12,
                okButtonBackground: 'red',
            });
            await axios.delete("/categories/deleteUnused").then((r)=>console.log(r));
            await updateCategories();
        })();
    },[]);

    async function updateCats(){
        await axios.get(`/todo/c/${p.currCat}`).then((r)=>{
            p.setTasks(...[r.data.map(e=>e)])
            if(p.tasks.length==1){
                deleteCategory(p.tasks[0].category.id);
            }
        });
    }

    async function updateCategories(){
        await axios.get("/categories").then((r)=>{
            setCategories(r.data);
            p.setCurrCat(r.data[0].id);
        });
        setFlag(false);
    }

    useEffect(()=>{
        updateCats();
    },[p.currCat]);

    async function createNewCat(){
        if (newCat == undefined || newCat.trim() == "") return;
        await axios.post(`/categories`,{name:newCat.trim()}).then(r=>{
            Notiflix.Notify.success('Category Added !!!');
            setNewCat("");
        });;
        await updateCategories();
    }
    
    async function deleteCategory(i){
        await axios.delete(`/categories/${i}`).then((r)=>{
            Notiflix.Notify.success("Category Deleted !!!");
        });
        await updateCategories();
    }

    async function deleteTask(i){

        await axios.delete(`/todo/${i}`).then((r)=>{
            Notiflix.Notify.success("Task Deleted !!!");
        });

        await updateCats();
        
        // Deleting category if no task of current category
        
        // if(p.tasks.length==1){
        //     console.log(p.tasks)
        //     await deleteCategory(p.tasks.category.id);
        // }

    }

    async function editTask(i,title,body){
        p.setOption("Edit");
        p.setNewTask(title);
        p.setBody(body);
        p.setEdit(i);
    }

    async function updateStatus(i,t,b,st){
        await axios.put(`/todo/${i}/${!st}`,{}).then((r)=>{
            Notiflix.Notify.success("Status Updated !!!");
            updateCats();
        });
    }
    var cnt = 1;

    return (
        <div className="container lines">
        <div className="text">
            <div className="tabs">
            {
                categories.map((e,i)=>{
                    return (
                    <>
                        <input id={`tab-${i}`} key={i} type="radio" className="tab tab-selector" name="tab" value={e.id} onChange={(e)=>{p.setCurrCat(e.target.value);setFlag(false)}} checked={p.currCat==e.id}/>
                        <label htmlFor={`tab-${i}`} key={i+10} className="tab tab-primary">{e.name}</label>
                    </>
                    );
                })
            }
            <button id="createNew" className={flag&&"focus"} onClick={()=>{setFlag(true);p.setCurrCat(-1)}}>+</button>
            </div>
            {flag && 
                <>
                    <input type="text" value={newCat} onChange={(e)=>setNewCat(e.target.value)} placeholder='Create a new Category' required/>
                    <button className='btn' onClick={createNewCat}>Add</button>

                </>}
            <br/>
            {
                p.tasks.map((e,i)=>{
                    return (
                    <>
                        <span key={i} className="dragObj">
                            <button onClick={()=>updateStatus(e.id,e.title,e.description,e.status)}>
                                    {`${i+1}. ${e.title}`}
                            </button>
                            {
                                !e.status?
                                <>
                                    <i className="fa-solid fa-pen-to-square text-green mark yellow" 
                                        onClick={()=>editTask(e.id,e.title,e.description)}
                                    ></i>
                                    <i
                                        className="fa-solid fa-trash mark red"
                                        onClick={() => deleteTask(e.id)}
                                    ></i>
                                    {
                                        e.description && <i className="fa-solid fa-eye mark" onClick={()=>{
                                                
                                            Notiflix.Confirm.show(
                                            `Task: ${e.title}`,
                                            `${e.description}`,
                                            'Close'
                                          )}}></i>
                                    }
                                </> : <i className="fa-solid fa-check fa-lg mark green"></i>

                            }
                        </span><br/>
                    </>
                    );
                })
            }
        </div>
        </div> 
        )
}

export default Display