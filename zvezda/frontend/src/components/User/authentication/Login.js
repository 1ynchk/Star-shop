import React, { useEffect, useState } from 'react';

import { setSignUp, setIsLogin, setIsOpen } from '../../../store/slices/PopupSlice';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUserDataLogin } from '../../../store/queries/User/Authorization/UserLogin';

import pswrd_icon from '../../../../static/images/password.png'
import email from '../../../../static/images/email.png';


const Login = () => {
    const [isInput, setIsInput] = useState(true)
    const isSignUp = useSelector(state => state.popup.isSignUp)
    const isLogin = useSelector(state => state.users.isLogin)
    const statusLogin = useSelector(state => state.users.statusLogin)
    const dispatch = useDispatch()

    useEffect(() => {
        const btn = document.getElementById('sign_btn')

        if (isInput) {
            btn.classList.remove('active')
        } else {
            btn.classList.add('active')
        }

    }, [isInput])

    const inputOnKeyUp = () => {
        const email = document.getElementById('email_login').value
        const password = document.getElementById('password_login').value

        if (email.length > 0 && password.length > 0) {
            setIsInput(false)
        } else {
            setIsInput(true)
        }
    }

    const validateData = () => {
        const email = document.getElementById('email_login').value
        const password = document.getElementById('password_login').value

        dispatch(fetchUserDataLogin({email: email, password: password}))
        dispatch(setIsLogin())
    }

    const showPassword = () => {
        const allPasswords = document.querySelectorAll('.login_input.password')

        allPasswords.forEach(element => {
            if (element.type === 'password') {
                element.type = 'text'
            } else {
                element.type = 'password'
            }
        })
    }

    return (
        <div className={`form_section_login ${isSignUp ? 'show' : 'back'}`}>
            <div className='popup__title'>Авторизация</div>
                
            <div className='popup__login_holder'>
                <form id='form_login' className='form_signin'>
                    <div className='form_section__container'>
                        <input 
                        id='email_login' 
                        placeholder='Введите почту' 
                        className='login_input'
                        onKeyUp={inputOnKeyUp}
                        />
                        <img src={email} alt='icon' className='form_section__icon' />
                    </div>
                    <div className='form_section__container'>
                        <input 
                        id='password_login' 
                        placeholder='Введите пароль' 
                        type='password'
                        className='login_input password' 
                        onKeyUp={inputOnKeyUp}
                        />
                        <img 
                                src={pswrd_icon} 
                                alt='icon' 
                                className='form_section__icon password'
                                onClick={() => showPassword()} 
                            />
                    </div>
                </form>
                
                <div className='button_section'>
                    <div>
                        <button 
                            id='sign_btn'
                            className='sign_btn'
                            disabled={isInput} 
                            onClick={() => validateData()}>
                        Войти</button>
                    </div>
                    <div className='register_section'>
                        <div>Нет аккаунта?</div>
                        <button 
                        className='register_section__btn' 
                        onClick={() => {dispatch(setSignUp()); dispatch(setIsLogin())}}>Зарегистрироваться</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;