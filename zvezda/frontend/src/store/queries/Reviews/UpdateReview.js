import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { getCSRFToken } from "../../../../bll/cookie/GetCSRFToken";

export const fetchUpdateReview = createAsyncThunk('products/fetchUpdateReview', 
    async ({value, review_id}) => {

    const token = getCSRFToken()

    const data = await axios.put('http://127.0.0.1:8000/api_products/products/reviews/update-review/',
        null,
        {params : {value, review_id}, headers: {'X-CSRFToken': token}})

    return data.data
})