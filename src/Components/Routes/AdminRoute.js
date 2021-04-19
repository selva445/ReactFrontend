import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link
  } from "react-router-dom";
import { useDispatch,useSelector, } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

import React, { useEffect,useState } from "react";
import { sendcurrentadminrequest } from "../../utils/callLogin";
import { auth } from "../../firebase";
import AdminDashboard from "../../Pages/Admin/AdminDashboard";

export default function AdminRoute() {

    const[admin,SetAdmin]=useState(false)

    const admintoken=useSelector(state=>state.user)


    const adminapirequest=async()=>{
  
        const isadmin=await sendcurrentadminrequest(admintoken.token)

        if(isadmin.data.currentuser.role==="admin")
        {
            SetAdmin(true)
        }
       
    }

    useEffect(() => {
        
        adminapirequest()

        
    }, [])
    return (
        admin? <AdminDashboard></AdminDashboard> : <LoadingToRedirect redirecturl="/Login"> </LoadingToRedirect>
    )
}
