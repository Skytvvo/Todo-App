import React,{useState} from "react";
import axios from "axios";
import AddSvg from "../userInterface/add.svg";
import "./Tasks.scss";

const AddTaskForm = ({list,onAddTask})=>{
    const [visibleForm,setVisibleForm]=useState(false);
    const [inputValue,setInputValue]=useState("");
    const [isLoading,setIsLoading] = useState(false);

    const ToggleFormVisible=()=>{
        setVisibleForm(!visibleForm);
        setInputValue("");
    };

    const addTask = ()=>{
        if(inputValue===""){
            alert("Enter task text");
            return;
        }

        const obj = {
            "listId":list.id,
            "text": inputValue,
            "completed":false
        };
        setIsLoading(true);
        axios.post(`http://localhost:3004/tasks`,obj).then(({data})=>{

            onAddTask(list.id,data);
            ToggleFormVisible();
        }).catch(()=>{
            alert("Error in adding process");
        }).finally(()=>{
            setIsLoading(false);
        });

    };

    return(
        <div className="tasks__form">
            {!visibleForm ?
                <div onClick={ToggleFormVisible} className="tasks__form-new">
                <img src={AddSvg} alt="add task form"/>
                <span>New task</span>
            </div>
            :
            <div className="tasks__form-block">
                <input type="text"
                       placeholder="Task text"
                       className="field" onChange={e=>setInputValue(e.target.value)}/>
                <button disabled={isLoading} onClick={addTask} className="button button--green">
                    {isLoading?"Adding...":"Add task"}
                </button>
                <button  onClick={ToggleFormVisible} className="button button--red">
                    Cancel
                </button>
            </div>}
        </div>
    )
};

export default AddTaskForm;