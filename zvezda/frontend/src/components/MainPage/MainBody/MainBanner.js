import Banner_1 from '../../../../static/images/BannerImages/banner_1.jpg'
import Banner_2 from '../../../../static/images/BannerImages/banner_2.jpg'
import Banner_3 from '../../../../static/images/BannerImages/banner_3.jpg'
import Banner_4 from '../../../../static/images/BannerImages/banner_4.jpg'

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';

function MainBanner(props) {
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            loop={true}
            navigation
            pagination
            autoplay={10}
        >
                <SwiperSlide className='slider_container'>
                    <img className="banner_photo" src={Banner_1} alt='banner_photo'/>
                    </SwiperSlide>
                <SwiperSlide className='slider_container'>
                    <img className="banner_photo" src={Banner_2} alt='banner_photo'/>
                    </SwiperSlide>
                <SwiperSlide className='slider_container'>
                    <img className="banner_photo" src={Banner_3} alt='banner_photo'/>
                    </SwiperSlide>
                <SwiperSlide className='slider_container'>
                    <img className="banner_photo" src={Banner_4} alt='banner_photo'/>
                    </SwiperSlide>
            
        </Swiper>
    );
}

export default MainBanner;