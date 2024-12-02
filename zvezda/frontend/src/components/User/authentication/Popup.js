import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {CSSTransition} from 'react-transition-group';

import { setIsLogin, setIsOpen, setSignUp } from '../../../store/slices/PopupSlice';
import { setInitialStatus } from '../../../store/slices/UsersSlice';
import Authorizate from './Authorizate';
import Loading from '../../Loading';
import Login from './Login';

import arrow_in_circle from '../../../../static/images/arrow_in_circle.png'
import cross_in_circle from '../../../../static/images/cross_in_circle.png'

const Popup = () => {
    const dispatch = useDispatch()

    const statusIsRegistred = useSelector(state => state.users.statusRegistred)

    const isOpen = useSelector(state => state.popup.isOpen)
    const isSignUp = useSelector(state => state.popup.isSignUp)
    const isLogin = useSelector(state => state.popup.isLogin)
    const isUserLogined = useSelector(state => state.users.isLogin)
    const statusLogin = useSelector(state => state.users.statusLogin)

    if (isOpen) {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        const body = document.querySelector('body')
        body.style.overflowY = 'hidden'
        body.style.paddingRight = `${scrollbarWidth}px`
    } else {
        const body = document.querySelector('body')
        body.style.overflow = '';
        body.style.paddingRight = '';
    }

    useEffect(() => {
        if (isUserLogined && statusLogin === 'succesfuly') {
            dispatch(setIsOpen())
        }
    }, [statusLogin])

    return (
        <CSSTransition
            in={isOpen}
            timeout={300}
            classNames="popup-transition"
            unmountOnExit>

            <div className={`popup-overlay ${isOpen ? 'oppened' : ""}`}
            onClick={() => {
                dispatch(setIsOpen());
                dispatch(setInitialStatus())
            }}>
                
            <div className={`popup-content ${isSignUp ? 'signup' : 'login'}`} onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={() => {
                dispatch(setIsOpen());
                dispatch(setInitialStatus())}}>×</button>

                <CSSTransition
                    in={isLogin}
                    classNames='login_transition'
                    unmountOnExit
                    timeout={100}
                >
                    <Login />
                </CSSTransition>

                <CSSTransition
                    in={statusLogin === 'pending'}
                    classNames='loading_transition'
                    unmountOnExit
                    timeout={300}
                >
                    <Loading />
                </CSSTransition>

                <CSSTransition
                    in={statusLogin === 'incorrect_data'}
                    classNames='registrated_transition'
                    unmountOnExit
                    timeout={300}
                >
                    <div className='confirmed_signingup_wrapper'>
                        <div className='confirmed_signingup_image_container'>
                            <img 
                            className='confirmed_signingup_image' 
                            alt='confirmed signing up' 
                            src={cross_in_circle} />
                        </div>
                        <div className='confirmed_signingup_wrapper_title'>Данные были введены неправильно</div>
                        <div className='sign_btn_section'>
                            <button className='sign_btn active' onClick={() => {
                                dispatch(setInitialStatus())
                                dispatch(setIsLogin())
                                }}>Войти</button>
                        </div>
                    </div>
                </CSSTransition>
                
                <CSSTransition 
                    unmountOnExit
                    classNames='signup_transition'
                    in={isSignUp}
                    timeout={100}
                    >
                    <Authorizate />
                </CSSTransition>

                <CSSTransition
                    in={statusIsRegistred === 'succesfuly'}
                    classNames='registrated_transition'
                    unmountOnExit
                    timeout={300}
                >
                    <div className='confirmed_signingup_wrapper'>
                        <div className='confirmed_signingup_image_container'>
                            <img 
                            className='confirmed_signingup_image' 
                            alt='confirmed signing up' 
                            src={arrow_in_circle} />
                        </div>
                        <div className='confirmed_signingup_wrapper_title'>Регистрация прошла успешно!</div>
                        <div className='sign_btn_section'>
                            <button className='sign_btn active' onClick={() => {
                                dispatch(setInitialStatus())
                                dispatch(setIsLogin())
                                }}>Войти</button>
                        </div>
                    </div>
                </CSSTransition>

                <CSSTransition
                    in={statusIsRegistred === 'such_user_exist'}
                    timeout={300}
                    unmountOnExit
                    classNames='registrated_transition'
                >
                    <div className='confirmed_signingup_wrapper'>
                        <div className='confirmed_signingup_image_container'>
                            <img 
                            className='confirmed_signingup_image' 
                            alt='confirmed signing up' 
                            src={cross_in_circle} />
                        </div>
                        <div className='confirmed_signingup_wrapper_title'>Пользователь с такой почтой уже существует!</div>
                        <div className='sign_btn_section'>
                            <button className='sign_btn active' onClick={() => {
                                dispatch(setInitialStatus())
                                dispatch(setSignUp())
                                }}>Регистрация</button>
                        </div>
                    </div>

                </CSSTransition>
                
            </div>
        </div>
        </CSSTransition>
    )
}

export default Popup;