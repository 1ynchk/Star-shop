import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchExactProduct = createAsyncThunk('products/fetchExactProduct', async (param) => {
    const apiProducts = axios.create({
        baseURL: 'http://127.0.0.1:8000/api/products/',
        headers: {
            'type-query-product': 'exact',
            'articul': param
        }})

    const product = await apiProducts.get()
    return product.data
})