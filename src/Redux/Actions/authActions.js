// const { default: axios } = require("axios");
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const BACKEND_URL= import.meta.env.VITE_BACKEND_URL;

export const ADMIN_LOGIN_REQUEST= 'ADMIN_LOGIN_REQUEST';
export const ADMIN_LOGIN_SUCCESS= 'ADMIN_LOGIN_SUCCESS';
export const ADMIN_LOGIN_FAILURE= 'ADMIN_LOGIN_FAILURE';
export const LOGOUT= 'LOGOUT';


// const adminLoginRequest= ()=>({type: ADMIN_LOGIN_REQUEST });
export const adminLoginSuccess=(token, userData)=>({type: ADMIN_LOGIN_SUCCESS, payload: {token, userData}});
// const adminLoginFailure=()=>({type: ADMIN_LOGIN_FAILURE});

// const navigate= useNavigate()

export const login=(email, password, navigate)=> async(dispatch)=>{
    
    try {
        const response= await axios.post(`${BACKEND_URL}/user/login`, {email, password, role: 'admin'});
        const token= response.data.token;
        localStorage.setItem('aToken', token)

        const userData= jwtDecode(token)

        dispatch(adminLoginSuccess(token, userData))
        navigate('/')
        

    } catch (error) {
        console.log(error)
        alert(error.response.data.message)
    }
}

// Logout action
export const logout = (navigate) => {
    try {
        localStorage.removeItem('aToken');
        navigate('/auth')
        return { type: LOGOUT };

    } catch (error) {
        console.log(error)
        
    }
   
  };
// const verifyToken=()=>
