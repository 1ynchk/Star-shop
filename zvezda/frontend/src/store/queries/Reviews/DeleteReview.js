import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { getCSRFToken } from "../../../../bll/cookie/GetCSRFToken";

export const fetchDeleteReview = createAsyncThunk('reviews/fetchDeleteReview', async({ product_id, review_id }) => {

    const token = getCSRFToken()   

    const apiDelete = axios.create(
        {
            headers: {
                'X-CSRFToken': token
            }
        }
    )

    const data = await apiDelete.delete(
        'http://127.0.0.1:8000/api_products/products/reviews/delete-review/', {'data': {product_id, review_id}})

    return data.data
    }
)