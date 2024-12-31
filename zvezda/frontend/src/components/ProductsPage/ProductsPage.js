import React from 'react';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {CSSTransition} from 'react-transition-group';

import { fetchExactProduct } from '../../store/queries/PreciseProduct';
import { clearAssessment } from '../../store/slices/ExactProductSlice';
import { fetchProductInfo } from '../../store/queries/ProductInfo';

import { cleareExactProduct } from '../../store/slices/ExactProductSlice';
import ProductReviews from './ProductsPageComponents/ProductReviews';
import ProductInfo from './ProductsPageComponents/ProductInfo';
import ReviewPopUp from './ProductsPageComponents/ReviewPopUp';

const ProductsPage = (props) => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const isLogined = useSelector(state => state.users.isLogin)
    const product = useSelector(state => state.exactProduct.exactProduct)
    const reviewPopUp = useSelector(state => state.exactProduct.reviewPopUp)

    useEffect(() => {
        dispatch(fetchExactProduct({ 'id': id, 'isLogined': isLogined }))
    }, [id]);

    useEffect(() => {
        if (isLogined) {
            dispatch(clearAssessment())
            dispatch(fetchProductInfo({'id': product.id}))
        }
    }, [product.id])

    useEffect(() => {
        return () => {
            dispatch(cleareExactProduct()); 
        };
    }, []);

    if (!product || product.length === 0) {
        return (
            <div>Loading...</div>
        )
    } else {
        return (
            <div className='productPage'>
                <ProductInfo
                    product={product}
                    name={product.name} 
                    img_url={product.img_url} 
                    description={product.description} 
                    price={product.price}
                    amount={product.amount}
                    good_rates={product.rate.good_rates}
                    bad_rates={product.rate.bad_rates}
                />
                <ProductReviews
                    id={product.id}
                />
                <CSSTransition
                    in={reviewPopUp}
                    timeout={300}
                    classNames='reviewPopUp'
                    unmountOnExit
                >
                    <ReviewPopUp product={product}/>
                </CSSTransition>

            </div>
            
        )
    } 
}

export default ProductsPage;