import React from 'react';
import SalesHits from './SalesHits.js';
import NewStuff from './NewStuff.js';

const MainBody = (props) => {
    return (
        <div className='mainbody'>
            <div className='mainbody_section'>
                <div className='mainbody_section__title'>Хиты продаж</div>
                <SalesHits />
            </div>
            <div className='mainbody_section'>
                <div className='mainbody_section__title'>Акции</div>
                <NewStuff />
            </div>
        </div>
    )
}

export default MainBody;