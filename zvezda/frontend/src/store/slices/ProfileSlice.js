import { createSlice } from "@reduxjs/toolkit";
import { fetchProfileInfo } from "../queries/User/getProfileInfo";

const ProfileSlice = createSlice(
    {
        name: 'profile',

        initialState: {
            name: '',
            surname: '',
            email: '',
            error: false 
        },

        reducers: {
            nullProfileInfo(state, action) {
                state.name = ''
                state.surname = ''
                state.email = ''
            }
        },

        extraReducers: (builder) => {
            builder 
                .addCase(
                    fetchProfileInfo.fulfilled, (state, action) => {
                        state.name = action.payload.data.name
                        state.surname = action.payload.data.surname
                        state.email = action.payload.data.email
                    }
                )
                .addCase(
                    fetchProfileInfo.rejected, (state, action) => {
                        state.error = true
                    }
                )
        }
    }
)

export default ProfileSlice.reducer