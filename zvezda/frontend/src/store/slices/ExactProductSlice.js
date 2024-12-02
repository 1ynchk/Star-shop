import { createSlice } from "@reduxjs/toolkit";

import { fetchExactProduct } from "../queries/PreciseProduct";
import { fetchAssessment } from "../queries/Assessment";
import { fetchProductInfo } from "../queries/ProductInfo";

const exactProductSlice = createSlice(
    {
        name: 'exactProduct',

        initialState: {
            exactProduct: "",
            isLike: false,
            isDislike: false,
            rate: 0
        },

        reducers: {
            cleareExactProduct(state, action) {
                state.exactProduct = ""
            },

            clearAssessment(state, action) {
                state.isLike = false
                state.isDislike = false
            },

            setLike(state, action) {
                if (state.isLike) {
                    state.isLike = false
                } else {
                    state.isLike = true
                } 
            },
            setDislike(state, action) {
                if (state.isDislike) {
                    state.isDislike = false
                } else {
                    state.isDislike = true
                } 
            },
        },

        extraReducers: (builder) => {
            builder 
                .addCase(
                    fetchExactProduct.fulfilled, (state, action) => {
                        state.exactProduct = action.payload.data
                    }
                )
                .addCase(
                    fetchAssessment.fulfilled, (state, action) => {

                    }
                )
                .addCase(
                    fetchProductInfo.fulfilled, (state, action) => {
                        if (action.payload.data === true) {
                            state.isLike = true
                        } else if (action.payload.data === false) {
                            state.isDislike = true
                        }
                    }
                )
        }
    }
)

export const { cleareExactProduct, setDislike, setLike, clearAssessment } = exactProductSlice.actions;

export default exactProductSlice.reducer;