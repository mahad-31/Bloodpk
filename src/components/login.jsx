import React, { useState } from "react";

import "./login.css";
// import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";


function Login() {
   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    

   const handleSubmit= async(e)=>{
    e.preventDefault();
    try{
        await signInWithEmailAndPassword(auth, email, password);
        console.log("User Logged In");
        navigate("/user")
    }catch(err){
        console.log(err)
    }
   }

     // Form validation
   
    return (
        <div className="formbody">
        <div className="Container">
            <h2 className="Text">Login</h2>
            <form onSubmit={handleSubmit}>
                
                <input className= "inputfield"type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className="inputfield" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="Submit" type="submit">Login</button>
               
            </form>
        </div>
        </div>
    );
}

export default Login;
