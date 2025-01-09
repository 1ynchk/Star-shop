
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setReviewPopUp } from '../../../src/store/slices/ExactProductSlice'
import { fetchPostUserReview } from './../../../src/store/queries/Reviews/PostUserReview';
import { fetchUpdateReview } from './../../../src/store/queries/Reviews/UpdateReview';

export const ReviewValidation = (type, product_id, review_id) => {

    const [isFilled, setIsFilled] = useState(false)
    const [symbolsCount, setSymbolsCount] = useState(0)
    const dispatch = useDispatch()

    const getButtons = (type) => {

        if (type === 'add') {
            const reviewValue = document.getElementById('reviewAddInput')
            const button = document.getElementById('reviewAdd_button')
            return [reviewValue, button]
        }

        if (type == 'update') {
            const reviewId = 'userReview__change_' + review_id
            const reviewValue = document.getElementById(reviewId)
            const buttonId = 'userReview__change_btn_' + review_id
            const button = document.getElementById(buttonId)
            return [reviewValue, button]
        }
    }

    const onChangeInput = () => {
        const [reviewValue, button] = getButtons(type)

        setSymbolsCount(reviewValue.value.length)

        if (reviewValue.value.length < 300) {
            if (type == 'update') {
                button.textContent = reviewValue.value.length + '/300'
            }
            button.classList.remove('active')
            setIsFilled(false)
        } else {
            button.classList.add('active')
            setIsFilled(true)
            if (type == 'update') {
                button.textContent = 'Сохранить'
            }
        }
    }

    const showReviewPopUp = () => {
            dispatch(setReviewPopUp())
        }

    const fetchReview = () => {

        if (type === 'add') {
            const value = document.getElementById('reviewAddInput').value

            dispatch(fetchPostUserReview({'product_id': product_id, 'value': value}))
            showReviewPopUp()
        }

        if (type === 'update') {
            const reviewId = 'userReview__change_' + review_id
            const value = document.getElementById(reviewId).value

            dispatch(fetchUpdateReview({'review_id': review_id, 'value': value}))
        }
    }

    return {isFilled, symbolsCount, fetchReview, onChangeInput, showReviewPopUp}
}