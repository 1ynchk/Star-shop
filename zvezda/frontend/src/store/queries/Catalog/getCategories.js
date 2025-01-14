import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchGetCategories = createAsyncThunk('fetch/fetchGetCategories', async () => {
    const data = await axios.get('http://127.0.0.1:8000/api_products/catalog/get-categories')

    return data.data
})