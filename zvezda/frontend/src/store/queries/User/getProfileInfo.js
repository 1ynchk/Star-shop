import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchProfileInfo = createAsyncThunk('fetch/getchProfileInfo', async () => {
    const data = await axios.get('http://127.0.0.1:8000/api/users/profile_info')

    return data.data
})