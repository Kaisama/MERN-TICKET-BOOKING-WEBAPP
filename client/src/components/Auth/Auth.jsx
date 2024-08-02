import React from 'react';
import AuthForm from './AuthForm';
import { sendUserAuthRequest } from '../../Api-Helpers/api-helpers';
import { useDispatch } from 'react-redux';
import { userActions } from '../../redux/store';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const dispatch = useDispatch();
const navigate=useNavigate();
  const onResReceived = (data) => {
    if (data && data.id) {
      dispatch(userActions.login());
      localStorage.setItem("userId", data.id);
      navigate('/');
    } else {
      console.error("User ID not found in response data");
    }
  };

  const getData = async (data) => {
    try {
      const response = await sendUserAuthRequest(data.input, data.signup);
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