import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchIsUserLoginned = createAsyncThunk('users/fetchIsUserLoginned', async () => {
    const data = await axios.get('http://127.0.0.1:8000/api_users/users/check-authenticated/')

    return data.data
})