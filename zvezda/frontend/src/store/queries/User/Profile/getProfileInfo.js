import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchProfileInfoGet = createAsyncThunk('profile/getchProfileInfo', async () => {
    const data = await axios.get('http://127.0.0.1:8000/api_users/users/profile_info')

    return data.data
})