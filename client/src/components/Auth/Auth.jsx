import React from 'react'
import AuthForm from './AuthForm'
import { sendUserAuthRequest } from '../../Api-Helpers/api-helpers'

const Auth = () => {
  const getData=(data)=>{
    console.log(data);
    sendUserAuthRequest(data.input,data.signup).then((res)=>console.log(res)).catch(err=>console.log(err))
  }
  return (
    <div><AuthForm onSubmit={getData} isAdmin={false} /></div>
  )
}

export default Auth