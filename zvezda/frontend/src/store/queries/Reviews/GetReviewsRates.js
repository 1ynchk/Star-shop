import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

import { getCSRFToken } from "../../../../bll/cookie/GetCSRFToken";

export const fetchReviewsRates = createAsyncThunk('products/fetchReviewsRates', async ({ id, assessment, id_product}) => {
    const token = getCSRFToken()

    const apiAssessment = axios.create(
        {
            headers: {
                'X-CSRFToken' : token
            }
        }
    )

    const data = await apiAssessment.post('http://127.0.0.1:8000/api/products/reviews/assessment/', {
        'id_review': id, 
        'assessment': assessment,
        'id_product': id_product
    })

    return data.data
})