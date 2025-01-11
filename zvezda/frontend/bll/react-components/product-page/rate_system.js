
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { fetchReviewsRates } from './../../../src/store/queries/Reviews/GetReviewsRates';
import { fetchAssessment } from './../../../src/store/queries/Products/Assessment';

export const RateSystem = (type, id, product_id) => {

    const dispatch = useDispatch()

    const [isLike, setLike] = useState(false)
    const [isDislike, setDislike] = useState(false)
    const [isChanged, setChange] = useState(false)

    const dispatchFunc = (type_request, assessment) => {
        switch (true) {
            case type_request == 'review' && assessment == true:
                dispatch(fetchReviewsRates({'assessment': true, 'id': id, 'id_product': product_id}))
                break
            case type_request == 'review' && assessment == false: 
                dispatch(fetchReviewsRates({'assessment': false, 'id': id, 'id_product': product_id}))
                break
            case type_request == 'review' && assessment == null: 
                dispatch(fetchReviewsRates({'assessment': null, 'id': id, 'id_product': product_id}))
                break
            case type_request == 'product' && assessment == true:
                dispatch(fetchAssessment({'assessment': true, 'id': product_id}))
                break
            case type_request == 'product' && assessment == false:
                dispatch(fetchAssessment({'assessment': false, 'id': product_id}))
                break
            case type_request == 'product' && assessment == null:
                dispatch(fetchAssessment({'assessment': null, 'id': product_id}))
                break
        }
    }

    const getButtons = () => {
        if (type == 'review') {
            const btn_dislike_id = 'dislike_btn_review_' + id
            const btn_like_id = 'like_btn_review_' + id
            const btn_dislike = document.getElementById(btn_dislike_id)
            const btn_like = document.getElementById(btn_like_id)
            return [btn_dislike, btn_like]
        }

        if (type == 'product') {
            const btn_dislike = document.getElementById('dislike_btn')
            const btn_like = document.getElementById('like_btn')
            return [btn_dislike, btn_like]
        }
    }
    
    useEffect(() => {
        
        const [btn_dislike, btn_like] = getButtons(type)

        if(isDislike && isLike) {
            setLike(false)
            setDislike(false)
        } else {
            isDislike ? btn_dislike.classList.add('active') : btn_dislike.classList.remove('active')
            isLike ? btn_like.classList.add('active') : btn_like.classList.remove('active')
        }
        if (isLike && !isDislike && isChanged) {
            dispatchFunc(type, true)
            setChange(true)
        } 
        if (!isLike && isDislike && isChanged) {
            dispatchFunc(type, false)
            setChange(true);
        }
        if (!isLike && !isDislike && isChanged ) {
            dispatchFunc(type, null)
        }
       
    }, [isDislike, isLike])

    const changeDislike = () => {
        if (isDislike) {
            setDislike(false)
        } else {
            setDislike(true)
        }
    }

    const changeLike = () => {
        if (isLike) {
            setLike(false)
        } else {
            setLike(true)
        }
    }

    return {
        changeDislike,
        setChange,
        changeLike,
        setLike,
        setDislike
    }
}