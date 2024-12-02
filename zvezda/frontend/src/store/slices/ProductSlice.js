import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../queries/Product";

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
                    console.log(state.products)
                }
            )
            .addCase(
                fetchProducts.rejected, (state) => {
                    console.log('Error')
                }
            )            
    }
    
});

export const { clearProducts } = productSlice.actions;

export default productSlice.reducer;