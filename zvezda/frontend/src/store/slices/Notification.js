import { buildCreateSlice, createSlice } from "@reduxjs/toolkit";

import { fetchPostUserReview } from "../queries/PostUserReview";

const NotificationSlice = createSlice(
    {
        name: notification,

        initialState: {
            productReview: null
        },

        reducers: {
            
        },
         
        extraReducers: (builder) => {
            builder
                .addCase(
                    fetchPostUserReview.fulfilled, (state, action) => {
                        state.productReview = true
                    }
                )
                .addCase(
                    fetchPostUserReview.rejected, (state, action) => {
                        state.productReview = false
                    }
                )
        }
    }
)