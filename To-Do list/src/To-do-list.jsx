import React from 'react'
import { useState } from 'react';




function todo(){

  
     const [tasks, setTasks] = useState([]);
     const [inputValue, setInputValue] = useState('');    
    const addTask = () => {
       if (inputValue.trim() !== '') {  
              setTasks([...tasks, inputValue]);
              setInputValue('');
         }
    }
    
    const removeTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    }


 
    return (
        <div className="todo">
        <h1>To-Do List</h1>       
        <ul>
            {tasks.map((task, index) => (<p key={index}> {task} </p>  ))}
        </ul>      
        <input type="text"  value={inputValue}  onChange={(e) => setInputValue(e.target.value)}  placeholder="Type your task here..."   />
        <button onClick={addTask}>Add </button>           
        <button onClick={() => removeTask(tasks.length - 1)}>Remove</button>        
         </div>
    );
}


export default todo;