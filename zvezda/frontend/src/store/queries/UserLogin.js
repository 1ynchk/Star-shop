import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchUserDataLogin = createAsyncThunk('users/fetchUserDataLogin', async ({email, password}) => {
    function getCSRFToken() {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'csrftoken') return value;
        }
        return null;
    }

    const token = getCSRFToken()
    
    const apiUser = axios.create({
        headers : {
            'Content-Type' : 'application/json',
            'Accept': 'application/json',
            'type-post': 'login',
            'X-CSRFToken': token
        }
    })

    const data = await apiUser.post('http://127.0.0.1:8000/api/users/', {email, password})

    return data.data
})