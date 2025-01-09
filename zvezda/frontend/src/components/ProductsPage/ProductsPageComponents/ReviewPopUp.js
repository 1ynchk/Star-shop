import React from 'react'

import { ReviewValidation } from './../../../../bll/react-components/product-page/review-validation';

const ReviewPopUp = ({product}) => {

    const {
        isFilled, 
        symbolsCount,
        fetchReview, 
        onChangeInput, 
        showReviewPopUp} = ReviewValidation('add', product.id)

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
                    <div className='reviewAdd__review_container'>
                        <div className='reviewAdd__review_title'>Впечатление от продукта:</div>
                        <div className='reviewAdd__count_words'>{symbolsCount}/300 символов</div>
                    </div>
                    
                </div>

                    <textarea 
                        id='reviewAddInput'
                        className='reviewAdd__input'
                        onChange={() => onChangeInput()} />
                    <button 
                        id='reviewAdd_button'
                        disabled={!isFilled}
                        className='reviewAdd__button'
                        onClick={() => fetchReview()}>
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