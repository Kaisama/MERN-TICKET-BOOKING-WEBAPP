import React from 'react'
import AuthForm from '../Auth/AuthForm'
import { sendAdminAuthRequest } from '../../Api-Helpers/api-helpers';
import { useDispatch } from 'react-redux';
import { adminActions } from '../../redux/store';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const onResReceived=(data)=>{
    dispatch(adminActions.login());
    localStorage.setItem("adminId",data.id)
    localStorage.setItem("token",data.token)
    navigate("/admin-profile");
  }
  const getData = (data) => {
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