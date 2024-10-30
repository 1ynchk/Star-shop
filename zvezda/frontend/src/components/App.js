import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';


import { Header } from './Header';
import MainPage from './MainPage/MainPage';
import ProductsPage from './ProductsPage/ProductsPage.js';
import store from '../store/store.js';

export default class App extends Component {
    constructor(props) {
        super(props)
    };

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div className='container'>
                        <Header />

                        <Routes>
                            <Route exact path='/' element={<MainPage />} />
                            <Route path='/products' >
                                <Route path=':id' element={<ProductsPage />} />
                            </Route>
                        </Routes>

                    </div>
                </BrowserRouter>
            </Provider> 
            
            
        )
    }
};

const appDiv = document.getElementById("app");
const root = createRoot(appDiv)
root.render(<App />)