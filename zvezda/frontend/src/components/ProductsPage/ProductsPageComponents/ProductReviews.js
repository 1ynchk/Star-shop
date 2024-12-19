import React from 'react'
import { setReviewPopUp } from '../../../store/slices/ExactProductSlice'
import { useDispatch } from 'react-redux'

import photo from '../../../../static/images/reviewsWrite.png'

const ProductReviews = ({ id }) => {
    const dispatch = useDispatch()

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
        </div>
    )
}

export default ProductReviews