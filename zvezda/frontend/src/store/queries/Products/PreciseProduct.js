import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchExactProduct = createAsyncThunk('products/fetchExactProduct', async ({id, isLogined}) => {
    const apiProducts = axios.create({
        baseURL: 'http://127.0.0.1:8000/api/products/exact-product/',
        headers: {
            'articul': id,
            'isLogined': isLogined
        }})

    const product = await apiProducts.get()
    return product.data
})