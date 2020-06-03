import React, {useEffect, useState} from "react";
import "./Authorization.scss";
import axios from "axios";

export default ({setSession})=>{

    const [password,setPassword] = useState('');
    const [login,setLogin] = useState('');
    const [serverResponse,setServerResponse] = useState(null);
    const [enterState,setEnterState] = useState(true);

    const handleLogin = (e)=>{
        setLogin(e.target.value);
    };

    const handlePassword = (e)=>{
        setPassword(e.target.value);
    };

    useEffect(()=>{
        axios.get('http://localhost:3004/access').then(({data})=>{
            setServerResponse(data);
        })
    },[]);

    const logIn = (event)=>{
        if(!(login && password))
        {
            alert("Enter password and login");
            event.preventDefault();
            return;
        }

        if(password===serverResponse.password&& login===serverResponse.login)
        {
         setEnterState(true);
            axios.patch(`http://localhost:3004/access`,{
                "access": 1
            }).catch(()=>{
                alert("Something went wrong...");
            });
         setSession(true)
        }
        else
        {
            setEnterState(false);
        }
        event.preventDefault();
    };
    return(
        <div className="authorization">
            {enterState?<span className="authorization__ok">Welcome!</span>:
            <span className="authorization__error">Incorrect password</span>}
            <form className="authorization__form" onSubmit={logIn}>
                <input type="text"
                       value={login}
                       onChange={handleLogin} placeholder="login" className="authorization__form-login"/>
                <input type="password"
                       autoComplete={"on"}
                       value={password}
                       onChange={handlePassword}
                       placeholder="password"
                       className="authorization__form-password"/>
                       <div>
                       <button type={"submit"}  className="authorization__form-button">
                           {enterState?"Login":"Try again"}
                       </button>
                    </div>
            </form>
        </div>
    )
};
