import React, {Component} from "react";
import "../styles/Footer.scss"
import {Link} from "react-router-dom";

class Footer extends Component{
    render() {
        return(
          <div className="footer">
              <Link to={'/about'}>
              <div className="footer__btn">
                  More info
              </div>
              </Link>
          </div>
        );
    }
}

export default Footer