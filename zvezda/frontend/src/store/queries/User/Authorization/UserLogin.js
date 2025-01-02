import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

import { getCSRFToken } from "../../../../../bll/cookie/GetCSRFToken";

export const fetchUserDataLogin = createAsyncThunk('users/fetchUserDataLogin', async ({email, password}) => {

    const token = getCSRFToken()
    
    const apiUser = axios.create({
        headers : {
            'Content-Type' : 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': token
        }
    })

    const data = await apiUser.post('http://127.0.0.1:8000/api_users/users/login/', {email, password})

    return data.data
})