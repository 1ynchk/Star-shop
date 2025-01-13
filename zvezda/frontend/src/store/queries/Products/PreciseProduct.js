import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchExactProduct = createAsyncThunk('products/fetchExactProduct', async ({id, type}) => {
    console.log('hello')
    const product = await axios.get('http://127.0.0.1:8000/api_products/products/exact-product/', 
    {params: {'articul': id, 'type': type}})
    return product.data
})