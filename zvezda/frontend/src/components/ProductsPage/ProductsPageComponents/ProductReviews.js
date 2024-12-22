import React, { useEffect, useState } from 'react'
import { setReviewPopUp } from '../../../store/slices/ExactProductSlice'
import { useDispatch, useSelector } from 'react-redux'

import photo from '../../../../static/images/reviewsWrite.png'
import { ProductBBL } from '../../../../bll/productPage/ProductPage'
import { fetchReviewsRates } from '../../../store/queries/GetReviewsRates'

import like from '../../../../static/images/like.png'
import dislike from '../../../../static/images/dislike.png'

const UserReview = ({ id, product_id, date_publish, avatar, last_name, first_name, value }) => {

    // const [isBigReview, setIsBigReview] = useState(false)
    const dispatch = useDispatch()
    const isLogined = useSelector(state => state.users.isLogin)
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

    return (
        <div className='userReview'>
                <img src={avatar} alt='user' className='userReview__image' />

            <div className='userReview__section'>
                
                <div className='userReview__name'>{first_name + " " + last_name}</div>
                
                <div className='userReview__review'>
                    <div className='userReview__value'>{value}</div>
                </div>
                
                <div className='userReview__info'>
                    <div className='rate_buttons_section_review'>
                        <button className='rate__reduce' title='Не нравится'>
                            <img 
                            alt='rate img' 
                            src={dislike} 
                            className='rate_img dislike' 
                            id={'dislike_btn_review_' + id}
                            onClick={isLogined? () => {
                                changeDislike()
                                setChange(true)} 
                                : () => dispatch(setIsOpen())}/>
                        </button>
                        <button className='rate__increase' title='Нравится'>
                            <img 
                            alt='rate img' 
                            src={like} 
                            className='rate_img like'
                            id={'like_btn_review_' + id}
                            onClick={isLogined ? () => {
                                changeLike()
                                setChange(true)} : () => dispatch(setIsOpen())}/>
                        </button>
                        </div>
                    <div className='userReview__delimiter'></div>
                    {ProductBBL.defineDate(date_publish)}
                </div>
            </div>
        </div>
    )
}

const ProductReviews = ({ id, reviews, assessments }) => {
    const dispatch = useDispatch()

    console.log(reviews, assessments)

    const showReviewPopUp = () => {
        dispatch(setReviewPopUp())
    }

    return (
        <div className='productReview'>
            <div className='productReview__write_section'>
                <div className='productReview__title'>Отзывы:</div>
                <div className='productReview__write_container'>
                    <div className='productReview__write_subcontainer'>
                        <div className='productReview__subtitle'>Купили этот товар? Поделитесь вашем мнением!</div>
                        <button 
                            onClick={() => showReviewPopUp()} 
                            className='productReview__button'>Написать отзыв</button>
                    </div>
                    <div className='productReview__image_container'>
                        <img src={photo} alt='cat' className='productReview__image' />
                    </div>
                </div>
            </div>
            <div className='productReview__container'>
                {reviews.map(el => {return <UserReview 
                    product_id={id}
                    key={el.id}
                    id={el.id}
                    value={el.value}
                    avatar={el.user_id.avatar}
                    first_name={el.user_id.first_name}
                    last_name={el.user_id.last_name}
                    date_publish={el.date_publish}
                    />})}
            </div>
        </div>
    )
}

export default ProductReviews