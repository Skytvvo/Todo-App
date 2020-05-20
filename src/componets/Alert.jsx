import React from "react";
import {Link} from "react-router-dom";
import "../styles/Alert.scss";
import AvatarIMG from "./images/avatar.jpg";


export default ()=>{

    const goToLink=(e)=>{
        window.location.href = e.target.childNodes[0].href;
    };

return(

    <div className="alert">

        <div className="alert__avatar">
            <img src={AvatarIMG} alt="avatar"/>
        <Link to={'/'}>
            <button className="alert__close">Close</button>
        </Link>
        </div>
        <div className="alert__contact">


                <span onClick={goToLink}><a href="https://github.com/Skytvvo">Github</a></span>
                <span onClick={goToLink}><a href="https://vk.com/skytvvo">VK</a></span>
                <span onClick={goToLink}><a href="https://www.facebook.com/ilya.kz">Facebook</a></span>


        </div>
    </div>
)
}