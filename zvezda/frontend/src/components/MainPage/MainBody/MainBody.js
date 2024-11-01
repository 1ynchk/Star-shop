import React from 'react';

import SalesHits from './SalesHits.js';
import Sale from './Sale.js';
import Wholesale from './Wholesale.js';

import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../../store/queries/Product.js';
import { useEffect } from 'react';


const MainBody = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts())
    }, []);

    return (
        <div className='mainbody'>
            <div className='mainbody_section'>
                <div className='mainbody_section__title'>Хиты продаж</div>
                <SalesHits />
            </div>
            <div className='mainbody_section'>
                <div className='mainbody_section__title'>Акции</div>
                <Sale />
            </div>
            <div className='mainbody_section'>
                <Wholesale />
            </div>
        </div>
    )
}

export default MainBody;