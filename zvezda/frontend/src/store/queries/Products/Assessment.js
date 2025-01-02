import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

import { getCSRFToken } from "../../../../bll/cookie/GetCSRFToken";

export const fetchAssessment = createAsyncThunk('products/fetchAssessment', async ({assessment, id}) => {
    const token = getCSRFToken()

    const apiAssessment = axios.create({
        headers: {
            'X-CSRFToken' : token
        }
    })

    const data = await apiAssessment.post('http://127.0.0.1:8000/api/products/post-assessment/', 
    {'assessment': assessment, 'id': id})

    return data.data
})