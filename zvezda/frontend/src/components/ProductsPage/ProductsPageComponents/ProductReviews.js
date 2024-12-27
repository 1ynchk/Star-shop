import React from 'react'
import { setReviewPopUp } from '../../../store/slices/ExactProductSlice'
import { useDispatch, useSelector } from 'react-redux'

import photo from '../../../../static/images/reviewsWrite.png'
import UserReview from './UserReviews';

import list from '../../../../static/images/list.png'

const EmptyReviews = () => {
    return (
        <div className='emptyReview'>
            <div className='emptyReview__image_container'>
                <img alt='list' src={list} className='emptyReview__image' />
            </div>
            <div className='emptyReview__title'>Еще нет отзывов. Поделитесь вашим мнением первым!</div>
            <div className='emptyReview__circle first'></div>
            <div className='emptyReview__circle second'></div>
        </div>
    )
}

const ProductReviews = ({ id }) => {
    const dispatch = useDispatch()
    const reviews = useSelector(state => state.exactProduct.reviews)

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
                {reviews.length == 0 ?
                    <EmptyReviews/>
                    :
                reviews.map(el => {
                    return <UserReview 
                    assessment={el.assessments}
                    product_id={id}
                    key={el.id}
                    id={el.id}
                    value={el.value}
                    avatar={el.user_id.avatar}
                    first_name={el.user_id.first_name}
                    last_name={el.user_id.last_name}
                    date_publish={el.date_publish}
                    />})
                }
            </div>
        </div>
    )
}

export default ProductReviews