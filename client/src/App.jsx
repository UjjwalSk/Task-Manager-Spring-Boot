import {useState,useEffect} from 'react';
import axios from 'axios';
import reactLogo from './assets/react.svg'
import Creator from './Components/Creator'
import Display from './Components/Display'
import './App.css'

function App() {

  const [tasks,setTasks] = useState([]);
  const [currCat,setCurrCat] = useState("");
  const [newTask,setNewTask] = useState("");
  const [body,setBody] = useState();
  const [option,setOption] = useState("Save");
  const [edit,setEdit] = useState(0); 

  const CreatorProps = {
    currCat:currCat,
    newTask:newTask,
    body:body,
    option:option,
    edit:edit,
    setNewTask:setNewTask,
    setTasks:setTasks,
    setBody:setBody,
    setOption:setOption
  };

  const DisplayProps = {
    tasks:tasks,
    currCat:currCat,
    option:option,
    setTasks:setTasks,
    setCurrCat:setCurrCat,
    setNewTask:setNewTask,
    setBody:setBody,
    setOption:setOption,
    setEdit:setEdit,
  };
  
  return (
    <div className="paper">
        <p className='date'>○ {new Date().toLocaleDateString()}</p>
        <p className="date logout">Log Out</p>
        <p id="heading">Your Personal Task Manager</p>
        <Creator {...CreatorProps}/>
        <Display {...DisplayProps} />
      </div>
  )
}

export default App
