import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css'
import App from './App';
import './normalize.css'
import './bootstrap.min.css'
import './index.css';


//redux staff
import {Provider} from 'react-redux'
import store from './redux/store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover/>
       
       <App />
    </Provider>
   
  </React.StrictMode>,
  document.getElementById('root')
);

