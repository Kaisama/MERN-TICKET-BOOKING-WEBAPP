import React from 'react'
import AuthForm from '../Auth/AuthForm'
import { sendAdminAuthRequest } from '../../Api-Helpers/api-helpers';
import { useDispatch } from 'react-redux';
import { adminActions } from '../../redux/store';

const Admin = () => {
  const dispatch=useDispatch();
  const onResReceived=(data)=>{
    console.log(data);
    dispatch(adminActions.login());
    localStorage.setItem("userId",data.id)
    localStorage.setItem("token",data.token)
  }
  const getData = (data) => {
    console.log("admins",data);
    sendAdminAuthRequest(data.input)
      .then(onResReceived)
      .catch((err) => console.log("Authentication failed:", err));
  };
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true}/>
    </div>
  )
}

export default Admin