import React from 'react';

import SalesHits from './SalesHits.js';
import Sale from './Sale.js';
import Wholesale from './Wholesale.js';
import Loading from '../../Loading.js';

import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../store/queries/Product.js';
import { useEffect } from 'react';

import { clearProducts } from '../../../store/slices/ProductSlice.js';

const MainBody = (props) => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products)

    useEffect(() => {
        if (products === null) {
            dispatch(fetchProducts());
        }
    }, [products, dispatch]);

    useEffect(() => {
        return () => {
            dispatch(clearProducts()); 
        };
    }, [dispatch]);
    

    
        return (
            
            <div className='mainbody'>
                

                <div className='mainbody_section'>
                    <div className='mainbody_section__title'>Хиты продаж</div>
                    {!products || products.length === 0 ? <Loading /> : <SalesHits products={products} />}
                </div>
                <div className='mainbody_section'>
                    <div className='mainbody_section__title'>Акции</div>
                    {!products || products.length === 0 ? <Loading /> : <Sale products={products} />}
                </div>
                <div className='mainbody_section'>
                    <Wholesale />
                </div>
            </div>
        )
    
    
}

export default MainBody;