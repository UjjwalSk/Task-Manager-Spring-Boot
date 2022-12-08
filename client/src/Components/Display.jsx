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
            await axios.get(`/api/tasks/c/all/c`).then(async(r)=>
            { r.data.response.map(async (e)=>{
                    await deleteCategory(e.CatID);
                });
                }
            );
            await updateCategories();
        })();
    },[]);

    async function updateCats(){
        await axios.get(`/api/tasks/c/${p.currCat}`).then((r)=>
            p.setTasks(...[r.data.response.map(e=>e)])
        );
    }

    async function updateCategories(){
        await axios.get("/api/tasks/c/all").then((r)=>{
            setCategories(r.data.response);
            p.setCurrCat(r.data.response[0].CatID);
        });
        setFlag(false);
    }

    useEffect(()=>{
        updateCats();
    },[p.currCat,p.tasks]);

    async function createNewCat(){
        await axios.post(`/api/tasks/c`,{categoryName:newCat.trim()}).then(r=>{
            Notiflix.Notify.success('Category Added !!!');
            setNewCat("");
        });;
        await updateCategories();
    }
    
    async function deleteCategory(i){
        await axios.delete(`/api/tasks/c/${i}`).then((r)=>{
            Notiflix.Notify.success("Category Deleted !!!");
        });
        await updateCategories();
    }

    async function deleteTask(i){

        await axios.delete(`/api/tasks/${i}`).then((r)=>{
            Notiflix.Notify.success("Task Deleted !!!");
        });

        // Deleting category if no task of current category
        if(p.tasks.length<2 && p.tasks[0].CatID!=1){
            await deleteCategory(p.tasks[0].CatID);
        }

    }

    async function editTask(i,title,body){
        p.setOption("Edit");
        p.setNewTask(title);
        p.setBody(body);
        p.setEdit(i);
    }

    async function updateStatus(i,t,b,st){
        await axios.put(`/api/tasks/${i}`,{
            title:t,
            body:b,
            status:st==0?1:0,
        }).then((r)=>{
            Notiflix.Notify.success("Status Updated !!!");
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
                        <input id={`tab-${i}`} key={i} type="radio" className="tab tab-selector" name="tab" value={e.CatID} onChange={(e)=>{p.setCurrCat(e.target.value);setFlag(false)}} checked={p.currCat==e.CatID}/>
                        <label htmlFor={`tab-${i}`} key={i+10} className="tab tab-primary">{e.CategoryName}</label>
                    </>
                    );
                })
            }
            <button id="createNew" className={flag&&"focus"} onClick={()=>{setFlag(true);p.setCurrCat(-1)}}>+</button>
            </div>
            {flag && <><input type="text" value={newCat} onChange={(e)=>setNewCat(e.target.value)} placeholder='Create a new Category' required/><button className='btn' onClick={createNewCat}>Add</button></>}
            <br/>
            {
                p.tasks.map((e,i)=>{
                    return (
                    <>
                        <span key={i} className="dragObj">
                            <button onClick={()=>updateStatus(e.ID,e.Title,e.Body,e.Status)}>
                                    {`${i+1}. ${e.Title}`}
                            </button>
                            {
                                e.Status==0?
                                <>
                                    <i className="fa-solid fa-pen-to-square text-green mark yellow" 
                                        onClick={()=>editTask(e.ID,e.Title,e.Body)}
                                    ></i>
                                    <i
                                        className="fa-solid fa-trash mark red"
                                        onClick={() => deleteTask(e.ID)}
                                    ></i>
                                    {
                                        e.Body && <i className="fa-solid fa-eye mark" onClick={()=>{
                                                
                                            Notiflix.Confirm.show(
                                            `Task: ${e.Title}`,
                                            `${e.Body}`,
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