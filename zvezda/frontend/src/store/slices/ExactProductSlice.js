import { createSlice } from "@reduxjs/toolkit";

import { fetchExactProduct } from "../queries/Products/PreciseProduct";
import { fetchAssessment } from "../queries/Products/Assessment";
import { fetchProductInfo } from "../queries/Products/ProductInfo";
import { fetchReviewsRates } from "../queries/Reviews/GetReviewsRates";
import { fetchPostUserReview } from "../queries/Reviews/PostUserReview"; 
import { fetchDeleteReview } from "../queries/Reviews/DeleteReview";

const exactProductSlice = createSlice(
    {
        name: 'exactProduct',

        initialState: {
            exactProduct: "",
            reviews: [],
            isLike: false,
            isDislike: false,
            rate: 0,
            reviewPopUp: false
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
            setReviewPopUp(state, action) {
                if (state.reviewPopUp) {
                    state.reviewPopUp = false
                } else {
                    state.reviewPopUp = true
                }
            }
        },

        extraReducers: (builder) => {
            builder 
                .addCase(
                    fetchExactProduct.fulfilled, (state, action) => { 

                        for (const j in action.payload.reviews) {
                            for (const i in action.payload.assessments) {
                                if (action.payload.reviews[j].id == action.payload.assessments[i].review) {
                                    action.payload.reviews[j].assessments = action.payload.assessments[i]
                                }
                            }
                        }
                        console.log(action.payload.data)
                        state.exactProduct = action.payload.data
                        state.reviews = action.payload.reviews
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
                .addCase(
                    fetchReviewsRates.fulfilled, (state, action) => {

                    }
                )
                .addCase(
                    fetchPostUserReview.fulfilled, (state, action) => {

                        state.reviews = [action.payload.data, ...state.reviews]
                    }
                )
                
                .addCase(
                    fetchDeleteReview.fulfilled, (state, action) => {
                        state.reviews = state.reviews.filter(el => el.id != action.payload.data.id)
                    }
                )
        }
    }
)

export const { 
    cleareExactProduct, 
    setDislike, 
    setLike, 
    clearAssessment, 
    setReviewPopUp } = exactProductSlice.actions;

export default exactProductSlice.reducer;