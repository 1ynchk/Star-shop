import { buildCreateSlice, createSlice } from "@reduxjs/toolkit";

import { fetchPostUserReview } from "../queries/Reviews/PostUserReview";

import cross from '../../../static/images/cross.png'
import arrow from '../../../static/images/arrow_in_circle.png'
import warn from '../../../static/images/warning.png'

const NotificationSlice = createSlice(
    {
        name: 'notification',

        initialState: {
            content: '',
            level: '',
            image: '',
            
            notification: false
            
        },

        reducers: {
            setFalseNotification(state, actions) {
                state.notification = false
            },
            setTrueNotification(state, actions) {
                state.notification = true
               
            },
            setNullAtributes(state, actions) {
                state.level = '',
                state.image = '',
                state.content = ''
            }
        },
         
        extraReducers: (builder) => {
            builder
                .addCase(
                    fetchPostUserReview.fulfilled, (state, action) => {
                        state.level = 'green'
                        state.image = arrow
                        state.content = 'Комментарий оставлен!'
                        state.notification = true
                    }
                )
                
                .addCase(
                    fetchPostUserReview.rejected, (state, action) => {
                        const err = action.error.message.slice(-3)

                        if (err == '406') {
                            state.level = 'yellow'
                            state.image = warn
                            state.content = 'Вы уже оставляли комментарий у этого продукта.'
                            state.notification = true

                        } else {
                            state.level = 'red'
                            state.image = cross 
                            state.content = 'Ой, что-то пошло не так...'

                            state.notification = true
                        }

                    }
                )

        }
    }
)

export const { setFalseNotification, setTrueNotification, setNullAtributes } = NotificationSlice.actions

export default NotificationSlice.reducer