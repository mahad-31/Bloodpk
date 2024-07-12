import React, { useState } from "react";
import { auth,db } from "../firebase";
import { setDoc,doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import "./login.css";

import { createUserWithEmailAndPassword } from "firebase/auth";


function Register() {
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
 

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            await createUserWithEmailAndPassword(auth, email, password);
            const user=auth.currentUser;
            console.log("User Created")

            if(user){
                await setDoc(doc(db,"users",user.uid),{
                    email:user.email,
                    
                    
                })
                navigate("/login")
                console.log("User Data Saved")
            }
        }catch(err){
            console.log(err)
        }


    }
        
    return (
        <div className="formbody">
        <div className="Container">
            <h2 className="Text">Register</h2>
            <form onSubmit={handleSubmit}>
               
                <input className= "inputfield"type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input className= "inputfield"type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
               
                <button className="Submit"type="submit">Register</button>
                <p className="Text1">Already have an account? <a href="/Login">Login</a></p>
                
                
            </form>
        </div>
        </div>
    );
}

export default Register;
