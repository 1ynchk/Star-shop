import React, { useEffect, useState } from 'react';

import { setSignUp, setIsLogin, setIsOpen } from '../../../store/slices/PopupSlice';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUserDataLogin } from '../../../store/queries/UserLogin';

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

    return (
        <div className={`form_section_login ${isSignUp ? 'show' : 'back'}`}>
                    
                    <form id='form_login' className='form_signin'>
                        <div className='form_section__container'>
                            <label className='login_title'>Логин</label>
                            <input 
                            id='email_login' 
                            placeholder='Введите логин' 
                            className='login_input'
                            onKeyUp={inputOnKeyUp}
                            />
                        </div>
                        <div className='form_section__container'>
                            <label className='login_title'>Пароль</label>
                            <input 
                            id='password_login' 
                            placeholder='Введите пароль' 
                            className='login_input' 
                            onKeyUp={inputOnKeyUp}
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
    )
}

export default Login;