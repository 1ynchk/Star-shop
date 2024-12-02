import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import Loading from '../../Loading';

import User from '../../../../bll/users/UserAuthorization';
import { setSignUp, setIsLogin } from '../../../store/slices/PopupSlice';
import { fetchUserDataRegister } from '../../../store/queries/UserRegister';
import { getCSRFToken } from '../../../../bll/GetCSRFToken';

const Authorizate = () => {
    const [isInput, setIsInput] = useState(true)
    const isSignUp = useSelector(state => state.popup.isSignUp)
    const dispatch = useDispatch()

    useEffect(() => {
        const btn = document.getElementById('signup_btn')

        if (isInput) {
            btn.classList.remove('active')
        } else {
            btn.classList.add('active')
        }

    }, [isInput])

    const inputOnKeyUp = () => {
        const email = document.getElementById('email_signup').value
        const pswr1 = document.getElementById('password_1').value
        const pswr2 = document.getElementById('password_2').value

        if (email.length > 0 && pswr1.length > 0 && pswr2.length > 0) {
            setIsInput(false)
        } else {
            setIsInput(true)
        }
    }

    const validateData = () => {
        if (User.correlateEmail() && User.correlateUsersPassword()) {
            const section = document.getElementById('signup_section')
            section.classList.remove('show')
            section.classList.add('back')

            const email = document.getElementById('email_signup').value
            const password = document.getElementById('password_1').value
            dispatch(setSignUp())
            const token = getCSRFToken()
            dispatch(fetchUserDataRegister({email: email, password: password, token: token}))
            
        }
    }

    return (
    <div>
        <div id='signup_section' className={`form_section_signup ${isSignUp ? 'show' : 'back'}`}>
                    
        <form id='form_signin' className='form_signin'>
            <div className='form_section__container'>
                <label className='login_title'>Введите почту</label>
                <input onKeyUp={() => inputOnKeyUp()} 
                id='email_signup' 
                placeholder='Введите почту' 
                className='login_input' />
            </div>
            <div className='form_section__container'>
                <label className='login_title'>Введите пароль</label>
                <input onKeyUp={() => inputOnKeyUp()} 
                type='password' id='password_1' 
                placeholder='Введите пароль' 
                className='login_input' />
            </div>
            <div className='form_section__container'>
                <label className='login_title'>Подтвердите пароль</label>
                <input onKeyUp={() => inputOnKeyUp()} type='password' id='password_2' placeholder='Введите пароль' className='login_input' />
            </div>
        </form>
        
        <div className='button_section'>
            <div>
                <button 
                id='signup_btn' 
                disabled={isInput} 
                onClick={() => validateData()} 
                className='sign_btn'>Зарегистрироваться</button>
                </div>
            <div className='register_section'>
                <div>Есть аккаунт?</div>
                <button 
                className='register_section__btn' 
                onClick={() => {dispatch(setSignUp()); dispatch(setIsLogin())}}>Войти</button>
            </div>
        </div>
        </div>
    </div>

    )
}

export default Authorizate;