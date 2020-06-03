import React, {useState} from "react";
import CloseSVG from "../userInterface/close.svg";
import SaveSVG from "../userInterface/save.svg";
const Task=({id,text,onRemove,onEdit,list,onComplete,completed})=>{
    const [taskText,setTaskText] = useState(text);

    const onChangeTask= e =>{
      setTaskText(e.target.value);
    };
    const onChangeCheckbox = e =>{
        onComplete(list.id,id,e.target.checked);
    };


    return(
        <div key={id} className="tasks__items-row">
            <div className="checkbox">
                <input id={id} onChange={onChangeCheckbox} type="checkbox" checked={completed}/>
                <label htmlFor={id}><svg height="8pt" viewBox="0 -46 417.81333 417" fill="#ffffff"  xmlns="http://www.w3.org/2000/svg">
                    <path d="m159.988281 318.582031c-3.988281 4.011719-9.429687 6.25-15.082031 6.25s-11.09375-2.238281-15.082031-6.25l-120.449219-120.46875c-12.5-12.5-12.5-32.769531 0-45.246093l15.082031-15.085938c12.503907-12.5 32.75-12.5 45.25 0l75.199219 75.203125 203.199219-203.203125c12.503906-12.5 32.769531-12.5 45.25 0l15.082031 15.085938c12.5 12.5 12.5 32.765624 0 45.246093zm0 0"/></svg>
                </label>
            </div>
            <textarea  onChange={onChangeTask} value={taskText}/>
            <div className="tasks__items-row-actions">
                <div onClick={()=>onEdit(list.id,id,taskText)}>
                    <img  src={SaveSVG} alt="edit task"/>
                </div>
                <div onClick={()=>onRemove(list.id,id)}>
                    <img  src={CloseSVG} alt="cancel editing"/>
                </div>
            </div>
        </div>
    )
};

export default Task;