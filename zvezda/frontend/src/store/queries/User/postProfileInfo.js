import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

import { getCSRFToken } from "../../../../bll/GetCSRFToken";

export const fetchProfileInfoPost = createAsyncThunk('profile/fetchProfileInfoPost', async (request_data) => {
    const token = getCSRFToken()

    const apiData = axios.create(
        {
            headers: {
                'X-CSRFToken': token
            }
        }
    )
    
    const data = await apiData.post('http://127.0.0.1:8000/api/users/profile_info', request_data)

    return data.data
})