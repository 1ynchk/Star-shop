import { createSlice } from "@reduxjs/toolkit";
import { fetchProfileInfoGet } from "../queries/User/Profile/getProfileInfo";
import { fetchProfileInfoPost } from "../queries/User/Profile/postProfileInfo";

const ProfileSlice = createSlice(
    {
        name: 'profile',

        initialState: {
            name: '',
            surname: '',
            email: '',
            isChanged: false,
            error: false
        },

        reducers: {
            nullProfileInfo(state, action) {
                state.name = ''
                state.surname = ''
                state.email = ''
            },
            setIsChange(state, action) {
                state.isChanged = action.payload
            }            
        },

        extraReducers: (builder) => {
            builder 
                .addCase(
                    fetchProfileInfoGet.fulfilled, (state, action) => {
                        state.name = action.payload.data.first_name
                        state.surname = action.payload.data.last_name
                        state.email = action.payload.data.email
                    }
                )
                .addCase(
                    fetchProfileInfoGet.rejected, (state, action) => {
                        state.error = true
                    }
                )
                .addCase(
                    fetchProfileInfoPost.fulfilled, (state, action) => {
                        state.isChanged = false
                        state.name = action.payload.data.first_name
                        state.surname = action.payload.data.last_name
                        state.email = action.payload.data.email
                    }
                )
        }
    }
)

export const { setIsChange } = ProfileSlice.actions

export default ProfileSlice.reducer