import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import "./Tasks.scss";
import EditSVG from "../userInterface/049-edit.svg";
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
    const onEdit=()=>{
      const newTitle=window.prompt("List name",list.name);
      if(newTitle){
          onEditTitle(list.id,newTitle);
          axios.patch('http://localhost:3004/lists/'+list.id,{
              name:newTitle
          }).catch(()=>{
              alert("Can't update list name");
          }); 
      }
    };



    return(
        <div className="tasks">
           <Link to={`/lists/${list.id}`}>
               <h2 style={{color:list.color.hex}} className="tasks__title">{list.name}
                   <img onClick={onEdit} src={EditSVG}  alt="Edit header"/>
               </h2>
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