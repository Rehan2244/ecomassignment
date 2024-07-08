import { useNavigate } from "react-router-dom"

export const getUserData=()=>{
    return JSON.parse(localStorage.getItem('user'))
}

export const saveUserData=(data)=>{
    localStorage.setItem('user',JSON.stringify(data))
}

export const saveToken=(token)=>{
    localStorage.setItem('token',token)
}
export const getToken=()=>{
    return localStorage.getItem('token');
}
export const logout=()=>{
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    window.location.reload();
    console.log('Hello world')
}

export const loginHeader={
    "x-auth-token":localStorage.getItem('token')
}