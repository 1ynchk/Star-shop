import React from 'react';

import MainBanner from './MainBody/MainBanner';
import MainBody from './MainBody/MainBody.js';

const MainPage = (props) => {
    
    return (
        <div>
            <div className='banner_wrapper'>
                <MainBanner />
            </div>
            <MainBody />
        </div>
    )
}

export default MainPage;
