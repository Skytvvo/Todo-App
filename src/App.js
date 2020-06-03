import React, {useEffect, useState} from "react";
import './styles/basic.scss';
import  Footer from  "./componets/Footer";
import Navigation from "./componets/TaskNavigationList";
import Alert from "./componets/Alert";
import Authorization from "./componets/Authorization";
import {Route} from "react-router-dom";
import "./styles/NavigatorStyle.scss"
import axios from "axios";

export default () => {

    const [session,SetSession] = useState(false);
    useEffect(()=>{
        axios.get('http://localhost:3004/access').then(({data})=>{

            SetSession(data.access);
        });

    },[]);
    return (

        <div className="window">
            {session?
                <div>
                    <Route component={Navigation}/>
                    <Route exact path={"/about"} component={Alert}/>
                    <Route component={Footer}/>
                </div>
                :<Route>
                    <Authorization setSession={SetSession}/>
                </Route>
            }
        </div>
    )

}

