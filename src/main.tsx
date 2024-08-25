import React from 'react'
import ReactDOM from 'react-dom/client'
import {ToastContainer} from 'react-toastify'
import App from './app'
import './index.css'
import {AuthProvider} from "@context/userContext";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <App/>
            <ToastContainer/>
        </AuthProvider>
    </React.StrictMode>
)
