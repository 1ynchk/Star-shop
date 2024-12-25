import { createSlice } from "@reduxjs/toolkit";
import {fetchUserDataRegister} from "../queries/UserRegister";
import { fetchUserDataLogin } from "../queries/UserLogin";
import { fetchIsUserLoginned } from "../queries/IsUserLoginned";
import { fetchLogOut } from "../queries/Logout";

const UsersSlice = createSlice(
    {
        name: 'users',

        initialState: {
            statusRegistred: '',
            statusLogin: '',
            isLogin: false,
        },

        reducers: {
            setInitialStatus(state, action) {
                state.statusRegistred = ''
                state.statusLogin = ''
            },

            setIsLogin(state, action) {
                if (state.isLogin === true) {
                    state.isLogin = false
                } else {
                    state.isLogin = true
                }
            }
        },

        extraReducers: (builder) => {
            builder
                .addCase(
                    fetchIsUserLoginned.fulfilled, (state, action) => {
                        if (action.payload.authenticated) {
                            localStorage.setItem('isAuthenticated', 'true')
                            localStorage.setItem('avatar', action.payload.avatar)
                            localStorage.setItem('user_id', action.payload.user_id)
                            state.isLogin = true
                        } else {
                            localStorage.clear()
                        }
                    }
                )
                .addCase(
                    fetchIsUserLoginned.rejected, (state, action) => {
                        localStorage.removeItem('isAuthenticated')
                        state.isLogin = true
                    }
                )
            
                .addCase(
                    fetchUserDataRegister.fulfilled, (state, action) => {
                        state.statusRegistred = 'succesfuly'
                    }
                )
                .addCase(
                    fetchUserDataRegister.rejected, (state, action) => {
                        state.statusRegistred = 'such_user_exist'
                    }
                )
                .addCase(
                    fetchUserDataRegister.pending, (state, action) => {
                        state.statusRegistred = 'pending'
                    }
                )

                .addCase(
                    fetchUserDataLogin.fulfilled, (state, action) => {
                        state.isLogin = true
                        state.statusLogin = 'succesfuly'
                        location.reload()
                    }
                )
                .addCase(
                    fetchUserDataLogin.pending, (state, action) => {
                        state.statusLogin = 'pending'
                    }
                )
                .addCase(
                    fetchUserDataLogin.rejected, (state, action) => {
                        state.statusLogin = 'incorrect_data'
                    }
                )

                .addCase(
                    fetchLogOut.fulfilled, (state, action) => {
                        state.isLogin = false
                        localStorage.clear()
                        location.reload()
                    }
                )
        }
    }
)

export const { setInitialStatus, setIsLogin } = UsersSlice.actions;

export default UsersSlice.reducer;