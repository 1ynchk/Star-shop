import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../queries/Products/Product";

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: null
    },

    reducers: {
        clearProducts(state, action) {
            state.products = null
        }        
    },
    
    extraReducers: (builder) => {
        builder 
            .addCase(
                fetchProducts.fulfilled, (state, action) => {
                    state.products = action.payload.data
                }
            )
            .addCase(
                fetchProducts.rejected, (state) => {
                }
            )            
    }
    
});

export const { clearProducts } = productSlice.actions;

export default productSlice.reducer;