import React from 'react';

import photo_1 from '../../../../static/images/wholesale_1.jpg'
import photo_2 from '../../../../static/images/wholesale_2.jpg'

const Wholesale = (props) => {
    return (
        <div className='announcement_section'>
            <div className='announcment'>
                <img src={photo_1} alt='announcment image' className='announcment_image' />
                
            </div>
            <div className='announcment'>
                <img src={photo_2} alt='announcment image' className='announcment_image' />
                
            </div>
        </div>
    )
}

export default Wholesale;