import { useState, useEffect } from 'react';
import axios from "./Api";
import Notiflix from 'notiflix';

const Creator = (p) => {

    async function saveTask() {
        if (p.newTask == undefined || p.newTask.trim() == "") return;
        let data = {
            title: p.newTask.trim(),
            category: {
                id: p.currCat
            },
            time: new Date().toLocaleTimeString()
        };
        if (p.body != undefined && p.body.trim() != "") data["description"] = p.body.trim();

        if (p.option == "Save") {
            await axios.post("/todo", data).then(r => {
                Notiflix.Notify.success('Task Added !!!');
            });
        } else if (p.option == "Edit") {
            await axios.put(`/todo/${p.edit}`, data).then((r) => {
                Notiflix.Notify.success("Task Edited & Saved !!!");
            });
            p.setOption("Save");
        }
        p.setBody(""); p.setNewTask("");
        await updateCats();
    }

    async function clearAll() {
        await axios.delete(`/todo/0/${p.currCat}`).then((r) => {
            Notiflix.Notify.success('All tasks Deleted !!!');
            updateCats();
        });
    }

    async function clearAllCompleted() {
        await axios.delete(`/todo/0/${p.currCat}/true`).then((r) => {
            Notiflix.Notify.success('All Completed Tasks Deleted !!!');
            updateCats();
        });
    }

    async function updateCats(){
        await axios.get(`/todo/c/${p.currCat}`).then((r)=>{
            p.setTasks(...[r.data.map(e=>e)])
        });
    }

    return (

        <table>
            <tr>
                <td>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <td><input type="text" name="task" placeholder="Write your task here..." value={p.newTask} onChange={(e) => p.setNewTask(e.target.value)} required /></td>
                        <td><button className='btn' name="clear" onClick={saveTask}>{p.option} {p.option == "Save" ? <i className="fa-solid fa-plus"></i> : <i className="fa-solid fa-pen-to-square" onClick={() => editTask(e.ID, e.Title, e.Body)} ></i>}</button></td>
                    </form>
                </td>
                <td><button className='btn' onClick={clearAll}>Clear all tasks <i className="fa-solid fa-trash-arrow-up"></i></button></td>
                <td><button className='btn' onClick={clearAllCompleted}>Clear all completed tasks <i
                    className="fa-solid fa-circle-check"></i></button></td>
            </tr>
            <tr>
                <td colSpan={4}>
                    <input type="checkbox" id="toggle-input" value="selected" />
                    <label className="toggle-label" htmlFor="toggle-input">Add Description [Optional]</label>
                    <div className="toggle-content">
                        <div className="module">
                            <textarea name="body" id="body" cols="80" rows="6" value={p.body} onChange={(e) => p.setBody(e.target.value)}></textarea>
                        </div>
                    </div>
                </td>
            </tr><br />
        </table>

    )
}

export default Creator