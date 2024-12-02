import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const apiProducts = axios.create({
        baseURL: 'http://127.0.0.1:8000/api/products/',
        headers: {
            'type-query-product': 'main-page',
        }})

    const product = await apiProducts.get()
    return product.data
})