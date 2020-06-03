import React, {useState} from "react";
import "./ShowListButton.scss";
import ForwardSVG from "../userInterface/forward.svg";
import BackSVG from "../userInterface/back.svg";
import ExitSVG from "../userInterface/logout.svg"
import axios from "axios";
export default ()=>{

    const [show,setShow] = useState(true);

    const toggleSidebar = ()=>{
    const sidebar  = document.querySelector('.todo__sidebar');
    if(show){
        setShow(!show);
        sidebar.style.display = "none";
        sidebar.nextSibling.style.width = "100%";
        if(window.outerWidth >= 900)
        sidebar.nextSibling.style.paddingRight = "0px";

    }
    if(!show){
        setShow(!show);
        sidebar.style.display = 'block';
        if(window.outerWidth >= 900)
        {
            sidebar.nextSibling.style.paddingRight = "60px";
            sidebar.nextSibling.style.width = "80%";
        }
     }
    };

    const logOut = ()=>{
        axios.patch(`http://localhost:3004/access`,{
            "access": 0
        }).catch(()=>{
            alert("Something went wrong...");
        });
        window.location.reload();
    };

    return(
        <div className="showListButton">
            <img className="toggle__show" onClick={toggleSidebar} src={show?BackSVG:ForwardSVG} alt="showing list button"/>
            <img  className="toggle__exit" onClick={logOut} src={ExitSVG} alt={"logout"}/>
        </div>
    )
}