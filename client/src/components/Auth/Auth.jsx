import React from 'react';
import AuthForm from './AuthForm';
import { sendUserAuthRequest } from '../../Api-Helpers/api-helpers';
import { useDispatch } from 'react-redux';
import { userActions } from '../../redux/store';

const Auth = () => {
  const dispatch = useDispatch();

  const onResReceived = (data) => {
    console.log("Response data received:", data);
    if (data && data.id) {
      console.log("User ID found:", data.id);
      dispatch(userActions.login());
      localStorage.setItem("userId", data.id);
    } else {
      console.error("User ID not found in response data");
    }
  };

  const getData = async (data) => {
    try {
      console.log("Sending user auth request with data:", data);
      const response = await sendUserAuthRequest(data.input, data.signup);
      console.log("Response from sendUserAuthRequest:", response);
      onResReceived(response);
    } catch (err) {
      console.error("Authentication failed:", err);
    }
  };

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false} />
    </div>
  );
};

export default Auth;