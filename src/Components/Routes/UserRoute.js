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
import { sendcurrentuserrequest } from "../../utils/callLogin";
import { auth } from "../../firebase";
const PrivateRoute = ({ children, ...rest }) =>{
    const dispatch = useDispatch();
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user) {
            const idTokenResult = await user.getIdTokenResult();
       
    
            sendcurrentuserrequest(idTokenResult.token)
              .then((res) => {
          
                const currentuser=res.data.currentuser
                dispatch({
                  type: "LOGGED_IN_USER",
                  payload: {
                    name: currentuser.name,
                    email:currentuser.email,
                    token: idTokenResult.token,
                    role:currentuser.role,
                    _id: currentuser._id,
                  },
                });
              })
              .catch((err) => console.log(err));
          }
        });
        // cleanup
        return () => unsubscribe();
      }, []);

    let auth1 = useSelector(state=>state.user)
    return (
        <Route
        {...rest}
        render={({ location }) =>
        auth1 ? (
            children
          ) : (
                <LoadingToRedirect redirecturl="/Login"/>
            //  <Redirect to="/Login"></Redirect>
          )
        }
      />
    );
  }

  export default PrivateRoute