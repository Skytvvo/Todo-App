import React from "react";
import './styles/basic.scss';
import  Footer from  "./componets/Footer";
import Navigation from "./componets/TaskNavigationList";
import Alert from "./componets/Alert";
import {Route} from "react-router-dom";
import "./styles/NavigatorStyle.scss"

export default () => {
    return (

        <div className="window">
            <Navigation/>
            <Route exact path="/about">
            <Alert/>
            </Route>
            <Footer/>

        </div>
    )
}

