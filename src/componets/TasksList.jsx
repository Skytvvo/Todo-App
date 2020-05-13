import React from "react";
import classNames from "classnames";
import Badge from "./AddList/Badge/index";
import CloseSvg from "./userInterface/close.svg";

import axios from "axios";

const List=({items,isRemovable,onClick,onRemove,onClickItem,activeItem})=>{

    const removeList =(item)=>{
      if(window.confirm('Are you sure?')){
          axios.delete('http://localhost:3004/lists/'+item.id).then(()=>{
              onRemove(item.id);
          });
      }
    };

return(
    <ul className="list" onClick={onClick}>
        {
            items.map((item,index)=>(
                    <li key={index}
                        onClick={onClickItem? ()=>onClickItem(item):null}
                        className={classNames(item.className,{active:item.active?item.active:  activeItem &&  activeItem.id === item.id})}>
                        <i>{item.icon?item.icon:(<Badge color={item.color.name}/>)}</i>

                        <span>{item.name}{item.tasks&&item.tasks.length>0 && ` (${item.tasks.length})`}</span>
                        {isRemovable&&<img
                            className="list__remove-icon"
                            src={CloseSvg} alt="remove icon"
                            onClick={()=>removeList(item)}
                        />}
                </li>
            ))
        }
    </ul>
)
};

export default List;