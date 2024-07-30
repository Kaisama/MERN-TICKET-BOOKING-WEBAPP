import React from 'react'
import AuthForm from './AuthForm'
import { sendUserAuthRequest } from '../../Api-Helpers/api-helpers'
import { useDispatch } from 'react-redux'
import { userActions } from '../../redux/store'

const Auth = () => {
  const dispatch=useDispatch();
  const getData=(data)=>{
    console.log("users",data);
    sendUserAuthRequest(data.input,data.signup).then((res)=>console.log(res))
    .then(()=>dispatch(userActions.login()))
    .catch(err=>console.log(err))
  }
  return (
    <div><AuthForm onSubmit={getData} isAdmin={false} /></div>
  )
}

export default Auth