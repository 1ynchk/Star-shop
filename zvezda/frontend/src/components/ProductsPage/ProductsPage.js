import React from 'react';

import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { fetchExactProduct } from '../../store/queries/PreciseProduct';
import { clearAssessment } from '../../store/slices/ExactProductSlice';
import { fetchProductInfo } from '../../store/queries/ProductInfo';

import { cleareExactProduct } from '../../store/slices/ExactProductSlice';
import ProductInfo from './ProductsPageComponents/ProductInfo';

const ProductsPage = (props) => {
    const { id } = useParams();
    const dispatch = useDispatch()
    const isLogined = useSelector(state => state.users.isLogin)
    const product = useSelector(state => state.exactProduct.exactProduct)

    console.log(product)

    useEffect(() => {
        dispatch(fetchExactProduct(id))
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
        )
    } 
}

export default ProductsPage;