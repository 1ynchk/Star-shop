import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation } from 'swiper/modules';

import { NavLink } from 'react-router-dom';

const SalesHits = ({ products }) => {
    console.log(products)
    return (
        <Swiper
        modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={5}
            loop={true}
            navigation
            pagination
            slidesPerGroup={5}
            className='main_menu_swiper'
        >
            {products.map(el => {return (
                <SwiperSlide key={el.articul} className='swiper_card'>
                    <div className='product_card_wrapper'>
                    <div className='product_card'>
                <NavLink  to={{
                    pathname: '/products/' + el.articul,
                    search: '?t=' + el.type
                }}>
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
    
    


export default SalesHits;