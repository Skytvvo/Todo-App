import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import "./Tasks.scss";
import SaveSVG from "../userInterface/save.svg"
import Task from "./Task";
import AddTaskForm from "./FormAddTaskList";

const Tasks=(
    {list,
        onEditTitle,
        onAddTask,
        withoutEmpty,
        onRemoveTask,
        onEditTask,
        onCompleteTask
    })=>{

    const [taskTitle,setTaskTitle] = useState(list.name);

    const titleHandler =(e)=>{
        setTaskTitle(e.target.value);
    };

    useEffect(()=>{
        setTaskTitle(list.name)
    },[list.name]);
    const onEdit=()=>{
      if(taskTitle){
          onEditTitle(list.id,taskTitle);
          axios.patch('http://localhost:3004/lists/'+list.id,{
              name:taskTitle
          }).catch(()=>{
              alert("Can't update list name");
          }); 
      }
    };

    return(
        <div className="tasks">
           <Link to={`/lists/${list.id}`}>
               <span className="tasks__title">
                   <input style={{color:list.color.hex}} onChange={titleHandler}
                          value={(taskTitle)}/>
                   <img onClick={onEdit} src={SaveSVG}  alt="Edit header"/>
               </span>
           </Link>
            <div className="tasks__items">
                {list.tasks && !list.tasks.length && !withoutEmpty &&<h2>List is empty</h2>
                }
                {
                    list.tasks&&list.tasks.map(task=>
                    <Task list={list}

                          key={task.id}
                          onEdit={onEditTask}
                          onRemove={onRemoveTask}
                          onComplete={onCompleteTask}
                          {...task}/>
                    )
                }

              <AddTaskForm key={list.id} list={list} onAddTask={onAddTask}/>

            </div>
        </div>
    );
};

export default Tasks