import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import like from '../../../../static/images/like.png'
import dislike from '../../../../static/images/dislike.png'
import { ProductBBL } from '../../../../bll/productPage/ProductPage';
import { setIsLogin, setIsOpen } from '../../../store/slices/PopupSlice';
import { setDislike, setLike } from '../../../store/slices/ExactProductSlice';
import { fetchAssessment } from '../../../store/queries/Assessment';

const ProductInfo = ({product, name, img_url, description, price, good_rates, bad_rates, amount}) => {
    const dispatch = useDispatch()
    const isLogined = useSelector(state => state.users.isLogin)
    const isLike = useSelector(state => state.exactProduct.isLike)
    const isDislike = useSelector(state => state.exactProduct.isDislike)
    const [isChanged, setChange] = useState(false)

    useEffect(() => {
        const btn_dislike = document.getElementById('dislike_btn')
        const btn_like = document.getElementById('like_btn')

        if(isDislike && isLike) {
            dispatch(setLike(false))
            dispatch(setDislike(false))
        } else {
            isDislike ? btn_dislike.classList.add('active') : btn_dislike.classList.remove('active')
            isLike ? btn_like.classList.add('active') : btn_like.classList.remove('active')
        } 
        if (isLike && !isDislike && isChanged) {
            dispatch(fetchAssessment({'assessment': true, 'id': product.id}))
            setChange(true)
        } 
        if (!isLike && isDislike && isChanged) {
            dispatch(fetchAssessment({'assessment': false, 'id': product.id}));
            setChange(true);
        }
        if (!isLike && !isDislike && isChanged ) {
            dispatch(fetchAssessment({'assessment': null, 'id': product.id}))
        }
       
    }, [isDislike, isLike])

    return (
        <div className='product'>
                <div className='product_section'>
                    <div className='product__title'>{name}</div>
                    <div className='product__info'>
                        <div className='product__photo_container'>
                            <img src={img_url} alt='product photo' className='product__photo'/>
                        </div>
    
                        <div className='product__description_section'>
                            <div className='product__description'>
                                <div className='product__description_title'>Описание</div>
                                <div className='product__description_values'>{description}</div>
                            </div>
                            <div className='product__rate'>
                                <div className='rate_value'>{ProductBBL.rate_circle(good_rates, bad_rates)}</div>
                                <div className='rate_buttons_section'>
                                    <button className='rate__reduce' title='Не нравится'>
                                        <img 
                                        alt='rate img' 
                                        src={dislike} 
                                        className='rate_img dislike' 
                                        id='dislike_btn'
                                        onClick={isLogined? () => {
                                            dispatch(setDislike())
                                            setChange(true)} 
                                            : () => dispatch(setIsOpen())}/>
                                    </button>
                                    <button className='rate__increase' title='Нравится'>
                                        <img 
                                        alt='rate img' 
                                        src={like} 
                                        className='rate_img like'
                                        id='like_btn'
                                        onClick={isLogined ? () => {
                                            dispatch(setLike())
                                            setChange(true)} : () => dispatch(setIsOpen())}/>
                                    </button>
                                </div>
                            </div>
                        </div>
    
                        <div className='product__buying_section'>
                            <div className='product__price'>{ProductBBL.Discount(product)}</div>
                            <div className='product__status'>
                                {ProductBBL.availabilityStatus(amount)}
                            </div>
                            <div className='product__add_to_cart_container'>
                                <button className='product__add_to_cart'>
                                    ДОБАВИТЬ В КОРЗИНУ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default ProductInfo;