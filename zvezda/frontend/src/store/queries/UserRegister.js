import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchUserDataRegister = createAsyncThunk('users/fetchUserDataRegister', async ({email, password, token}) => {
    
    const apiUser = axios.create({
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'type-post': 'register',
            'X-CSRFToken': token
        },
        
    })
    
    const data = await apiUser.post('http://127.0.0.1:8000/api/users/', {email, password})
    
    return data.data
})
