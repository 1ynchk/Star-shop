import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import Header from './Header';
import MainPage from './MainPage/MainPage';
import ProductsPage from './ProductsPage/ProductsPage.js';
import Footer from './Footer.js';
import Popup from './User/authentication/Popup.js';

import { fetchIsUserLoginned } from '../store/queries/IsUserLoginned.js';
import { setIsLogin } from '../store/slices/UsersSlice.js';

export const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated')
        if (isAuthenticated) {
            dispatch(setIsLogin())
        }
        
        dispatch(fetchIsUserLoginned())
    }, [])
    
    return (
            <BrowserRouter>
            <Popup />
                <div className='container'>
                    <Header />
                    <div className='main_area'>
                    <Routes>
                            <Route exact path='/' element={<MainPage />} />
                            <Route path='/products' >
                                <Route path=':id' element={<ProductsPage />} />
                            </Route>
                    </Routes>
                    </div>
                </div>
                <Footer />
            </BrowserRouter>
    )
}