import React,{Component} from "react";
import './styles/basic.scss';
import  Footer from  "./componets/Footer";
import Navigation from "./componets/TaskNavigationList";

import "./styles/NavigatorStyle.scss"
class App extends Component{


    render() {

        return(

            <div className="window">

                <Navigation />
                <Footer/>
            </div>
        );
    }

}
export default App