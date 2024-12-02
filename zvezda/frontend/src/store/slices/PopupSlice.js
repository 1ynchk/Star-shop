import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice(
    {
        name: 'popup',

        initialState: {
            isOpen: false,
            isLogin: true,
            isSignUp: false,
        },

        reducers: {
            setIsOpen(state) {
                if (state.isOpen === true) {
                    state.isOpen = false
                    
                    state.isSignUp = false
                    state.isLogin = true
                } else {
                    state.isOpen = true
                }
            }, 

            setSignUp(state) {
                if (state.isSignUp === true) {
                    state.isSignUp = false
                } else {
                    state.isSignUp = true
                }
            },

            setIsLogin(state) {
                if (state.isLogin === true) {
                    state.isLogin = false
                } else {
                    state.isLogin = true
                }
            }
        }
    }
)

export const {setIsOpen, setSignUp, setIsLogin} = popupSlice.actions;

export default popupSlice.reducer;