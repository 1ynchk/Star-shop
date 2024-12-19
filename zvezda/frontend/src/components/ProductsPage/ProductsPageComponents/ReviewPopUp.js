import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setReviewPopUp } from '../../../store/slices/ExactProductSlice'

const ReviewPopUp = ({product}) => {

    const [isFilled, setIsFilled] = useState(false)
    const dispatch = useDispatch()

    const showReviewPopUp = () => {
        dispatch(setReviewPopUp())
    }

    const onChangeInput = () => {
        const reviewValue = document.getElementById('reviewAddInput')
        const button = document.getElementById('reviewAdd_button')

        if (reviewValue.value.length < 300) {
            button.classList.remove('active')
            setIsFilled(false)
        } else {
            button.classList.add('active')
            setIsFilled(true)
        }
    }
    
    return (
        <div className='reviewAdd'>
            <div onClick={() => showReviewPopUp()} className='reviewAdd__overlay'></div>
            <div className='reviewAdd__container'>
                <div className='reviewAdd__title'>Оставить отзыв</div>

                <div className='reviewAdd__sections'>
                    <div className='reviewAdd__product_section'>
                        <div className='reviewAdd__image_container'>
                            <img src={product.img_url} alt='product' className='reviewAdd__image' />
                        </div>
                    <div className='reviewAdd__name'>{product.name}</div>
                </div>

                    </div>

                <div className='reviewAdd__review'>
                        <div className='reviewAdd__review_title'>Впечатление от продукта:</div>
                        <textarea 
                            id='reviewAddInput'
                            type='text' 
                            className='reviewAdd__input'
                            onChange={() => onChangeInput()}/>
                </div>

                <button 
                    id='reviewAdd_button'
                    disabled={!isFilled}
                    className='reviewAdd__button'>
                    Отправить отзыв
                </button>

                <div 
                    onClick={() => showReviewPopUp()} 
                    className='reviewAdd__cross'>X</div>
            </div>
                        
        </div>
    )
}

export default ReviewPopUp