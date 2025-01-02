import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

import User from '../../../../bll/users/UserAuthorization';
import { setSignUp, setIsLogin } from '../../../store/slices/PopupSlice';
import { fetchUserDataRegister } from '../../../store/queries/User/Authorization/UserRegister';
import { getCSRFToken } from '../../../../bll/cookie/GetCSRFToken';

import profile_img from '../../../../static/images/profile_img.png'
import email from '../../../../static/images/email.png'
import pswrd_icon from '../../../../static/images/password.png'

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
        const name = document.getElementById('sign_in_name').value
        const surname = document.getElementById('sign_in_surname').value

        if (email.length > 0 && pswr1.length > 0 && 
            pswr2.length > 0 && surname.length > 0 && name.length > 0) {
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
            const name = document.getElementById('sign_in_name').value
            const surname = document.getElementById('sign_in_surname').value
            dispatch(setSignUp())
            const token = getCSRFToken()
            dispatch(fetchUserDataRegister({
                email: email,
                password: password, 
                token: token,
                name: name,
                surname: surname
            }))
        }
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
    <div>
        <div id='signup_section' className={`form_section_signup ${isSignUp ? 'show' : 'back'}`}>
                
        <form id='form_signin' className='form_signin'>
        
        
        <div className='popup__title'>Регистрация</div>
            <div className='popup__input_holder'>
                <div className='form_section__container'>
                    <input onKeyUp={() => inputOnKeyUp()} 
                    type='email'
                    id='email_signup' 
                    placeholder='Введите почту' 
                    className='login_input' />
                    <img src={email} alt='icon' className='form_section__icon' />
                </div>
                <div className='form_section__container'>
                    <input onKeyUp={() => inputOnKeyUp()} 
                    type='text' id='sign_in_name' 
                    placeholder='Введите имя' 
                    className='login_input' />
                    <img src={profile_img} alt='icon' className='form_section__icon' />
                </div>
                <div className='form_section__container'>
                    <input onKeyUp={() => inputOnKeyUp()} 
                    type='text' id='sign_in_surname' 
                    placeholder='Введите фамилию' 
                    className='login_input' />
                    <img src={profile_img} alt='icon' className='form_section__icon' />
                </div>
                <div className='form_section__container'>
                    <input onKeyUp={() => inputOnKeyUp()} 
                    type='password' 
                    id='password_1'
                    placeholder='Введите пароль' 
                    className='login_input password' />
                    <img 
                        src={pswrd_icon} 
                        alt='icon' 
                        className='form_section__icon password'
                        onClick={() => showPassword()} 

                        />
                </div>
                <div className='form_section__container'>
                    {/* <label className='login_title'>Подтвердите пароль</label> */}
                    <input onKeyUp={() => inputOnKeyUp()} 
                    type='password' 
                    id='password_2'
                    placeholder='Введите пароль' 
                    className='login_input password' />
                    <img 
                        src={pswrd_icon} 
                        alt='icon' 
                        className='form_section__icon password'
                        onClick={() => showPassword()} 
                    />
                </div>
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