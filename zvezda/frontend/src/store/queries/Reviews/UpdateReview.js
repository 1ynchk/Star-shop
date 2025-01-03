import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUpdateReview = createAsyncThunk('products/fetchUpdateReview', 
    async ({value, review_id}) => {

    const data = await axios.put('http://127.0.0.1:8000/api_products/products/reviews/update-review/', 
    {params : {value, review_id}})

    return data.data
})