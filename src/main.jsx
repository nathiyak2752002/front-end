import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import Store from './Redux/store/Store.js';
import toast, { Toaster } from 'react-hot-toast';
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>,
)
