import React from 'react';
import axios from 'axios';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation } from 'swiper/modules';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { fetchProducts } from '../../../store/queries/Product';


const NewStuff = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const products = useSelector(state => state.products.products);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchProducts())
    //         .then(() => setIsLoading(false)) 
    //         .catch(() => setIsLoading(false));
    // }, []);

    if (!products || products.length === 0) {
        return <div>Loading...</div>;
    } else {
        return (
        
            <Swiper
            modules={[Navigation]}
                slidesPerView={5}
                loop={true}
                navigation
                pagination
                slidesPerGroup={5}
            >
                {products.map(el => {return (
                    <SwiperSlide key={el.slug} className='swiper_card'>
                        <div className='product_card'>
                            <div className='product_card__img_container'>
                                <img className='product_card__img' src={el.img_url} alt='product card' />
                            </div>
                            <div className='product_card__title'>
                                {el.name}
                            </div>
                            <div className='product_card__price'>
                                {el.price}
                            </div>
                            <div className='product_card__btn_container'>
                                <button className='product_card__btn'>В корзину</button>
                            </div>
                        </div>
                    </SwiperSlide>
                )
                    
                })}
                
            </Swiper>
        )
    }
    
    
}

export default NewStuff;