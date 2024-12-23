import { createSlice } from "@reduxjs/toolkit";
import { fetchProfileInfoGet } from "../queries/User/getProfileInfo";
import { fetchProfileInfoPost } from "../queries/User/postProfileInfo";

const ProfileSlice = createSlice(
    {
        name: 'profile',

        initialState: {
            name: '',
            surname: '',
            email: '',
            isChanged: false,
            error: false,
            notification: false
        },

        reducers: {
            nullProfileInfo(state, action) {
                state.name = ''
                state.surname = ''
                state.email = ''
            },
            setIsChange(state, action) {
                state.isChanged = action.payload
            },
            setFalseNotification(state, action) {
                state.notification = false
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
                        state.notification = true
                        state.name = action.payload.data.first_name
                        state.surname = action.payload.data.last_name
                        state.email = action.payload.data.email
                    }
                )
        }
    }
)

export const { setIsChange, setFalseNotification } = ProfileSlice.actions

export default ProfileSlice.reducer