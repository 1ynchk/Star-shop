import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

import { getCSRFToken } from "../../../../bll/cookie/GetCSRFToken";

export const fetchProductInfo = createAsyncThunk('products/fetchProductInfo', async ({id}) => {
    const token = getCSRFToken()
    
    const apiProduct = axios.create({
        baseURL: 'http://127.0.0.1:8000/api_products/products/get-assessment/',
        headers: {
            'X-CSRFToken': token,
        }
    })

    const data = await apiProduct.get('http://127.0.0.1:8000/api_products/products/get-assessment/', 
    {params: {'id': id}})

    return data.data
})