
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { fetchReviewsRates } from './../../../src/store/queries/Reviews/GetReviewsRates';

export const RateSystem = (type, id, product_id) => {

    const dispatch = useDispatch()

    const [isLike, setLike] = useState(false)
    const [isDislike, setDislike] = useState(false)
    const [isChanged, setChange] = useState(false)

    useEffect(() => {
        const btn_dislike_id = 'dislike_btn_review_' + id
        const btn_like_id = 'like_btn_review_' + id
        const btn_dislike = document.getElementById(btn_dislike_id)
        const btn_like = document.getElementById(btn_like_id)

        if(isDislike && isLike) {
            setLike(false)
            setDislike(false)
        } else {
            isDislike ? btn_dislike.classList.add('active') : btn_dislike.classList.remove('active')
            isLike ? btn_like.classList.add('active') : btn_like.classList.remove('active')
        } 
        if (isLike && !isDislike && isChanged) {
            dispatch(fetchReviewsRates({'assessment': true, 'id': id, 'id_product': product_id}))
            setChange(true)
        } 
        if (!isLike && isDislike && isChanged) {
            dispatch(fetchReviewsRates({'assessment': false, 'id': id, 'id_product': product_id}))
            setChange(true);
        }
        if (!isLike && !isDislike && isChanged ) {
            dispatch(fetchReviewsRates({'assessment': null, 'id': id, 'id_product': product_id}))
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