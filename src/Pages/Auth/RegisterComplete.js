import React, { useState,useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useHistory } from 'react-router-dom'
import { sendrequest } from "../../utils/callLogin";
import { useDispatch, useSelector } from "react-redux";

export const RegisterComplete = (props) => {

    const [email,setEmail] =useState("")
    const [password,setPassword] =useState("")

    const history = useHistory()
    let dispatch = useDispatch();
    useEffect(() => {        
        const email =  window.localStorage.getItem("emailForRegistration") || 'admin@gmail.com';
        setEmail(email)
    }, [email,password])

    

    const handleSubmit=async (e) =>{
        e.preventDefault();
        // validation
        if (!email || !password) {
          toast.error("Email and password is required");
      
          return;
        }
    
        if (password.length < 6) {
          toast.error("Password must be at least 6 characters long");
          return;
        }
    
        try {
          const result = await auth.signInWithEmailLink(
            email,
            window.location.href
          );
          //   console.log("RESULT", result);
          if (result.user.emailVerified) {
            // remove user email fom local storage
            window.localStorage.removeItem("emailForRegistration");
            // get user id token
            let user = auth.currentUser;
            await user.updatePassword(password);
            const idTokenResult = await user.getIdTokenResult();
            // redux store
            sendrequest(idTokenResult.token).then( (res) =>{
        
              console.log(res)
              dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                  email: res.data.email,
                  name:res.data.name,
                  token: idTokenResult.token,
                  role:res.data.role,
                  _id:res.data._id
                },
              });
              history.push("/");
      
            })
            .catch(err=>{
      
              console.log(err)
            })
           
            console.log("user", user, "idTokenResult", idTokenResult);
            // redirect
            history.push("/")
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }

    }
    const Completeregform=()=>(
        <form onSubmit={handleSubmit}>
            <div className="form-group p-3">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" disabled={true} value={email} name="email" className="form-control"  id="exampleInputEmail1" 
                aria-describedby="emailHelp" placeholder="Enter email"      />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>        
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" autoFocus onChange={(e) => setPassword(e.target.value)} />
             </div>       
            <button type="submit" className="btn btn-primary btn-raised">Submit</button>
        </form>
    )
    return (
        <div className="Container">
            <div className="row justify-content-center align-items-center text-center p-3 ">
                <div className="col-lg-6 col-md-6 col-sm-6 bg-light">
                    <h3>Complete Registration Form</h3>
         
                    {Completeregform()}
                
                </div>
            </div>
        </div>
    )
}
