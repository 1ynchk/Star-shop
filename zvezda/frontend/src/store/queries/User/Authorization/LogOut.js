import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchLogOut = createAsyncThunk('users/fetchLogOut', async ({token}) => {

    const apiUser = axios.create({
        headers: {
            'X-CSRFToken': token
        }
    })

    const data = await apiUser.post('http://127.0.0.1:8000/api_users/users/logout/')

    return data.data
})