import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { getCSRFToken } from "../../../bll/GetCSRFToken";

export const fetchAssessment = createAsyncThunk('products/fetchAssessment', async ({assessment, id}) => {
    const token = getCSRFToken()
    const apiAssessment = axios.create({
        headers: {
            'type-post' : 'assessment',
            'X-CSRFToken' : token
        }
    })

    const data = await apiAssessment.post('http://127.0.0.1:8000/api/products/', {'assessment': assessment, 'id': id})

    return data.data
})