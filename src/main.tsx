import React from 'react'
import ReactDOM from 'react-dom/client'
import {ToastContainer} from 'react-toastify'
import App from './app'
import './index.css'
import {AuthProvider} from "@context/userContext";
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({})
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
            <ToastContainer/>
        </AuthProvider>
    </React.StrictMode>
)
