import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

import { getCSRFToken } from "../../../bll/GetCSRFToken";

export const fetchProductInfo = createAsyncThunk('products/fetchProductInfo', async ({id}) => {

    const token = getCSRFToken()
    
    const apiProduct = axios.create({
        headers: {
            'X-CSRFToken': token,
            'type-post': 'getAssessment'
        }
    })

    const data = await apiProduct.post('http://127.0.0.1:8000/api/products/', {'id': id} )

    return data.data
})