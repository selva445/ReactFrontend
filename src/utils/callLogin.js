import axios from "axios"
export const sendrequest=async (authtoken)=>{

    return await axios.post(`${process.env.REACT_APP_API}/auth/create-or-update-user` ,{} , {

     
      headers:{
        authtoken,
      },
    })

  }


  export const sendcurrentuserrequest=async (authtoken)=>{


    return await axios.post(`${process.env.REACT_APP_API}/auth/currentuser` ,{} , {

     
      headers:{
        authtoken,
      },
    })

  }

  export const sendcurrentadminrequest=async (authtoken)=>{


    return await axios.post(`${process.env.REACT_APP_API}/auth/currentadmin` ,{} , {

     
      headers:{
        authtoken,
      },
    })

  }