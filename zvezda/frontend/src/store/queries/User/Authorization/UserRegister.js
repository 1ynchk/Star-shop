import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchUserDataRegister = createAsyncThunk('users/fetchUserDataRegister', 
    async ({email, password, token, name, surname}) => {
    
    const apiUser = axios.create({
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': token
        },
    })
    
    const data = await apiUser.post('http://127.0.0.1:8000/api_users/users/registration/', 
    {email, password, name, surname})
    
    return data.data
})
