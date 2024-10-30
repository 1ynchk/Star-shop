import React from 'react';
import axios from 'axios';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation } from 'swiper/modules';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { fetchProducts } from '../../../store/queries/Product';
import { NavLink } from 'react-router-dom';


const SalesHits = (props) => {
    const products = useSelector(state => state.products.products);

    

    if (!products || products.length === 0) {
        return <div>Loading...</div>;
    } else {
        
        return (
            <Swiper
            modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={5}
                loop={true}
                navigation
                pagination
                slidesPerGroup={5}
            >
                {products.map(el => {return (
                    <SwiperSlide key={el.articul} className='swiper_card'>
                    <div className='product_card'>
                    <NavLink to={'/products/' + el.articul}>
                        <div className='product_card__img_container'>
                            <img className='product_card__img' src={el.img_url} alt='product card' />
                        </div>
                        <div className='product_card__title'>
                            {el.name}
                        </div>
                    </NavLink>
                        <div className='product_card__price_container'>
                            {el.discount ? 
                        [<div key={el.articul} className='product_card__price'>
                            {(toString(el.price * parseFloat(el.discount.value))).indexOf('.') ? 
                            (el.price * parseFloat(el.discount.value)) :
                            (el.price * parseFloat(el.discount.value)) + '.00'}
                            </div>, 
                        <div key={el.articul + 1} className='product_card__price crossed'>{el.price}</div>] : 
                            <div className='product_card__price'>{el.price}</div>}
                        </div>
                    
                        
                        <div className='product_card__btn_container'>
                            <button className='product_card__btn' onClick={() => console.log('sss')}>В корзину</button>
                        </div>
                    </div>
                </SwiperSlide>
                )
                    
                })}
                
            </Swiper>
        )
    }
    
    
}

export default SalesHits;