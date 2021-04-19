import React, { useState,useEffect } from "react";
import UserNav from '../../Components/Nav/UserNav'
import { auth } from "../../firebase";
import { toast } from "react-toastify";
export default function Password() {

    const[password,SetPassword] =useState("")
    const [loading, setLoading] = useState(false);

    const handlechange=(e)=>{

        SetPassword(e.target.value)
  
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // console.log(password);
    
        await auth.currentUser
          .updatePassword(password)
          .then(() => {
            setLoading(false);
            SetPassword("");
            toast.success("Password updated");
          })
          .catch((err) => {
            setLoading(false);
            toast.error(err.message);
          });
      };

    return (
        <div className="container-fluid">
            
            <div className="row">
            <div className="col-lg-2 col-md-2 col-sm-2 justify-content-center align-items-center text-center">

                <UserNav></UserNav>

            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 mr-auto justify-content-center align-items-center text-center">

  
                <form >
                    {loading ? (
                        <h4 className="text-danger">Loading..</h4>
                    ) : (
                        <h4>Password Update</h4>
                    )}
                    <div className="form-group p-3">
                        <label for="exampleInputEmail1">Password</label>
                        <input type="password" name="password" className="form-control" autoFocus id="Password" 
                        aria-describedby="Password" placeholder="Update your Password" value={password} onChange={handlechange}/>                        
                    </div>           
                    <button type="submit" className="btn btn-primary btn-raised" onClick={handleSubmit} disabled={password.length<6}>Submit</button>
                </form>
            </div>
            </div>
        </div>
    )
}
