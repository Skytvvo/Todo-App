import React, {Component} from "react";

class Footer extends Component{

    render() {
        return(
          <div className="footer">
              <div className="footer_about">
                  <ul className="footer_list">
                      <li className="footer_list_item">
                          <a href="/">ss</a>
                      </li>
                      <li className="footer_list_item">
                          <a href="/">link</a>
                      </li>
                      <li className="footer_list_item">
                          <a href="/">link</a>
                      </li>
                      <li className="footer_list_item">
                          <a href="/">link</a>
                      </li>
                  </ul>
              </div>
              <div className="footer_contacts">
                <ul className="footer_list">
                    <li className="footer_list_item">Manager</li>
                    <li className="footer_list_item">Admin</li>
                    <li className="footer_list_item">Blogger</li>
                    <li className="footer_list_item">Forum</li>
                </ul>
              </div>
              <div className="footer_developers">
                  <p>Developed by Sky2</p>
                  <p><a href="https://github.com/Skytvvo">github.com/Skytvvo</a></p>
              </div>
          </div>
        );
    }
}

export default Footer