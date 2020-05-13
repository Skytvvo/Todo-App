import React, {useState,useEffect} from "react";
import axios from "axios";
import Svg from "../userInterface/add.svg";
import List from "../TasksList";
import "./ButtonAddStyle.scss";
import Badge from "./Badge/index";
import CloseSVG from "../userInterface/close.svg"


const AddListButton=({colors,onAdd})=>{

    const [visiblePopup,setVisible]=useState(false);
    const [selectedColor,selectColor]=useState(3);
    const [inputValue,setInputValue]=useState('');
    const [isLoading,setLoading]=useState(false);
    useEffect(()=>{
        if(Array.isArray(colors))
            selectColor(colors[0].id);
    },[colors]);
    const onClose = ()=>{
        setVisible(false);
        setInputValue("");
        selectColor(colors[0].id);
    };

    const addList=()=>{
      if(!inputValue){
          alert("Enter name of list");
          return;
      }
      setLoading(true);
        axios
            .post('http://localhost:3004/lists', {
                name: inputValue,
                colorId: selectedColor
            })
            .then(({ data }) => {
                const color = colors.filter(c => c.id === selectedColor)[0];
                const listObj = { ...data, color ,tasks:[] };
                onAdd(listObj);
                onClose();
            }).finally(()=>{
            setLoading(false);
        });
    };

    return(
        <div className="add-list">
             <List onClick={()=>setVisible(true)} items={[
                {
                    className:"list__add-button",
                    icon: (<img  className="svg" src={Svg} alt="List icon"/>),
                    name:"Add list"
                }
            ]}/>
            {visiblePopup &&
            <div className="add-list__popup">
                <img    onClick={onClose}
                    className="add-list__popup-closer-btn"
                        alt="close button"
                        src={CloseSVG}/>
                <input type="text"
                       placeholder="Name of list"
                       className="field"
                       onChange={e=>setInputValue(e.target.value)}/>

                <div className="add-list__popup-colors">
                    {
                        colors.map(color=>

                            <Badge onClick={()=>selectColor(color.id)}
                                   key={color.id}
                                   color={color.name}
                                   className={selectedColor===color.id?'active':null}
                            />
                        )
                    }
                </div>

                <button onClick={addList} className="button">
                    {isLoading?"Adding":"Add list"}
                </button>
            </div>
            }
            </div>

    );
};
export default AddListButton