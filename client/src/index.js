import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import axios from 'axios';
import {Provider} from 'react-redux';
import { store } from './redux/store';
const root = ReactDOM.createRoot(document.getElementById('root'));
axios.defaults.baseURL="https://mern-ticket-booking-webapp.onrender.com";
root.render(
  <Provider store={store}>
  <BrowserRouter>
        <App />
  </BrowserRouter>
  </Provider> 
);


