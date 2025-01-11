import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import like from '../../../../static/images/like.png'
import dislike from '../../../../static/images/dislike.png'
import { ProductBBL } from '../../../../bll/productPage/ProductPage';
import { setIsOpen } from '../../../store/slices/PopupSlice';

import { RateSystem } from '../../../../bll/react-components/product-page/rate_system';

const ProductInfo = ({product, name, img_url, description, amount, rate}) => {
    
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
                                <div className='rate_value'>
                                    {ProductBBL.rate_circle(rate)}
                                </div>
                                <RateSection product={product} />
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

const RateSection = ({product}) => {
    const dispatch = useDispatch()
    const isLogined = useSelector(state => state.users.isLogin)
    const assessment = useSelector(state => state.exactProduct.assessment)

    const {changeDislike, setChange, changeLike, setLike, setDislike} = RateSystem('product', null, product.id)
    
    useEffect(() => {

        if (assessment != null) {
            switch (true) {
                case assessment === true:

                    setLike(true)
                    break
                case assessment === false:

                    setDislike(true)
                    break
            }
        }
    }, [assessment])

    return (
        <div className='rate_buttons_section'>
            <button className='rate__reduce' title='Не нравится'>
                <img 
                alt='rate img' 
                src={dislike} 
                className='rate_img dislike' 
                id='dislike_btn'
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
                id='like_btn'
                onClick={isLogined ? () => {
                    changeLike()
                    setChange(true)} : () => dispatch(setIsOpen())}/>
            </button>
        </div>
    )
}

export default ProductInfo;