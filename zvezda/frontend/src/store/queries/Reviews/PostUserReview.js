import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

import { getCSRFToken } from "../../../../bll/cookie/GetCSRFToken";

export const fetchPostUserReview = createAsyncThunk('products/fetchPostUserReview', async ({value, product_id}) => {
    const token = getCSRFToken()

    const apiPostUserReview = axios.create(
        {
            headers: {
                'X-CSRFToken': token
            }
        }
    )

    const data = await apiPostUserReview.post('http://127.0.0.1:8000/api/products/reviews/', 
        {'product_id': product_id, 'value': value})

    return data.data
})