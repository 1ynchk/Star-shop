import { createSlice } from "@reduxjs/toolkit";

import { fetchExactProduct } from "../queries/Products/PreciseProduct";
import { fetchAssessment } from "../queries/Products/Assessment";
import { fetchProductInfo } from "../queries/Products/ProductInfo";
import { fetchReviewsRates } from "../queries/Reviews/GetReviewsRates";
import { fetchPostUserReview } from "../queries/Reviews/PostUserReview"; 
import { fetchDeleteReview } from "../queries/Reviews/DeleteReview";
import { fetchUpdateReview } from './../queries/Reviews/UpdateReview';

import { GetUID } from "../../../bll/cookie/GetUID";

const exactProductSlice = createSlice(
    {
        name: 'exactProduct',

        initialState: {
            exactProduct: "",
            reviews: [],
            assessment: null,
            reviewPopUp: false,
            rate: []
        },

        reducers: {
            cleareExactProduct(state, action) {
                state.exactProduct = ""
            },

            clearAssessment(state, action) {
                state.assessment = null
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
                        state.exactProduct = action.payload.data
                        state.reviews = action.payload.reviews.sort((a, b) => {
                            if (a.user_id.id === GetUID() && b.user_id.id !== GetUID()) {
                                return 0 
                            }
                            if (b.user_id.id === GetUID() && a.user_id.id !== GetUID()) {
                                return 2 
                            }
                            return 1
                        })
                        state.rate = action.payload.data.rate
                    }
                )
                .addCase(
                    fetchAssessment.fulfilled, (state, action) => {
                    let assessment = action.payload.assessment
                        for (let i in state.rate) {
                            if (state.rate[i].user == GetUID()) {
                                    state.rate[i].user_rate = assessment
                                    }   
                                }
                    }
                )    
                .addCase(
                    fetchProductInfo.fulfilled, (state, action) => {
                        if (action.payload.data === true) {
                            state.assessment = true
                        } else if (action.payload.data === false) {
                            state.assessment = false
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
                .addCase(
                    fetchUpdateReview.fulfilled, (state, action) => {
                        for (const i in state.reviews) {
                            if (state.reviews[i].id == action.payload.data.id) {
                                state.reviews[i].value = action.payload.data.value
                            }
                        }
                    }
                )
        }
    }
)

export const { 
    cleareExactProduct, 
    clearAssessment, 
    setReviewPopUp } = exactProductSlice.actions;

export default exactProductSlice.reducer;