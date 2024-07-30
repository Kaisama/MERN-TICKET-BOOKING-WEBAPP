import React from 'react'
import AuthForm from '../Auth/AuthForm'
import { sendAdminAuthRequest } from '../../Api-Helpers/api-helpers';
import { useDispatch } from 'react-redux';
import { adminActions } from '../../redux/store';

const Admin = () => {
  const dispatch=useDispatch();
  const getData = (data) => {
    console.log("admins",data);
    sendAdminAuthRequest(data.input)
      .then((res) => console.log(res))
      .then(()=>dispatch(adminActions.login()))
      .catch((err) => console.log("Authentication failed:", err));
  };
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true}/>
    </div>
  )
}

export default Admin