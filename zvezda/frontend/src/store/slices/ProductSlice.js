import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../queries/Product";

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: []
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder 
            .addCase(
                fetchProducts.fulfilled, (state, action) => {
                    state.products= action.payload.data
                }
            )
            
    }
    
});

export const { getProduct } = productSlice.actions;

export default productSlice.reducer;