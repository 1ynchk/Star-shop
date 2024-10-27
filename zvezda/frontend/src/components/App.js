import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";


import { Header } from './Header';
import MainPage from './MainPage/MainPage';

export default class App extends Component {
    constructor(props) {
        super(props)
    };

    render() {
        return (
            <BrowserRouter>
                <div className='container'>
                    <Header />

                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        
                    </Routes>
                    
                </div>
            </BrowserRouter>
            
        )
    }
};

const appDiv = document.getElementById("app");
const root = createRoot(appDiv)
root.render(<App />)