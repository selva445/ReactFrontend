import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";


export const Register = () => {


    const [email,setEmail] =useState("")

    const eventchange=e=>{

        setEmail(e.target.value)
    }

    const handleSubmit=async (e) =>{
        e.preventDefault();
        const config = {
          url:process.env.REACT_APP_REDIRECT_URL ,
          handleCodeInApp: true,
        };
    
        await auth.sendSignInLinkToEmail(email, config);
        toast.success(
          `Email is sent to ${email}. Click the link to complete your registration.`
        );
        // save user email in local storage
        window.localStorage.setItem("emailForRegistration", email);
        // clear state
        setEmail("");

    }
    const regform=()=>(
        <form onSubmit={handleSubmit}>
            <div className="form-group p-3">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" name="email" className="form-control" autoFocus id="exampleInputEmail1" 
                aria-describedby="emailHelp" placeholder="Enter email" onChange={eventchange}/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>           
            <button type="submit" className="btn btn-primary btn-raised">Submit</button>
        </form>
    )
    return (
        <div className="Container">
            <div className="row justify-content-center align-items-center text-center p-3 ">
                <div className="col-lg-6 col-md-6 col-sm-6 bg-light">
                    <h3>Registration Form</h3>
         
                    {regform()}
                
                </div>
            </div>
        </div>
    )
}
