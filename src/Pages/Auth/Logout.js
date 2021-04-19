import React from 'react'

import firebase from "firebase"
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'

export default function Logout() {
    const dispatch = useDispatch();
    const history = useHistory()
    const handlelogout=()=>{

        firebase.auth().signOut()

        dispatch({
            type: "LOGOUT",
            payload:null
           
          });

          history.push("/Login")
    }

    return (
        <div className="Container">
            <div className="row justify-content-center align-items-center text-center p-3 ">
                <div className="col-lg-6 col-md-6 col-sm-6 ">
                 
                    <button onClick={handlelogout}>Logout</button>
                  
                
                </div>
            </div>
        </div>
    )
}
