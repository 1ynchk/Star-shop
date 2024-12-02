import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation } from 'swiper/modules';

import { NavLink } from 'react-router-dom';
import { ProductBBL } from '../../../../bll/productPage/ProductPage';

const Sale = ({products}) => {

    if (!products || products.length === 0) {
        return <div>Loading...</div>;
    } else {
        const newArray = products.filter(el => el.discount != null);
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
                {newArray.map(el => {
                    return (
                    <SwiperSlide key={el.articul} className='swiper_card'>
                        <div className='product_card_wrapper'>
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
                                {ProductBBL.Discount(el)}
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
    
    
}

export default Sale;