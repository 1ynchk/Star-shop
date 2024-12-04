import React, { useEffect, useState } from 'react'

import password from '../../../../static/images/password.png'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfileInfo } from '../../../store/queries/User/getProfileInfo'
import { checkPassword } from '../../../../bll/Profile/ProfileSettings'

const Settings = () => {
    const [isChanged, setIsChange] = useState(false)
    const dispatch = useDispatch()

    let name = useSelector(state => state.profile.name)
    let surname = useSelector(state => state.profile.surname)
    const email = useSelector(state => state.profile.email)
    const password_1 = ''
    const password_2 = ''
    const error_ = useSelector(state => state.profile.error)

    useEffect(() => {
        dispatch(fetchProfileInfo())
    }, [])

    useEffect(() => {
        const button = document.getElementById('settings__button')
        if (isChanged) {
            button.classList.add('active')
        } else {
            button.classList.remove('active')
        }
    }, [isChanged])

    useEffect(() => {
        const name_field = document.getElementById('settings__name')
        const surname_field = document.getElementById('settings__surname')
        const email_field = document.getElementById('settings__email')

        name == undefined ? name = '' : name = name
        surname == undefined ? surname = '' : surname = surname
        
        name_field.value = name
        surname_field.value = surname
        email_field.value = email
    }, [name, surname, email])

    const showPassword = () => {
        const allPasswords = document.querySelectorAll('.settings__input.password')

        allPasswords.forEach(element => {
            if (element.type === 'password') {
                element.type = 'text'
            } else {
                element.type = 'password'
            }
        });
    }

    const fetchData = () => {
        const name = document.getElementById('settings__name')
        const surname = document.getElementById('settings__surname')
        const email = document.getElementById('settings__email')
        const password = document.getElementById('settings__password_1')
    }

    const formChanges = () => {
        const name_field = document.getElementById('settings__name').value
        const surname_field = document.getElementById('settings__surname').value
        const email_field = document.getElementById('settings__email').value
        const password_1_field = document.getElementById('settings__password_1').value
        const password_2_field = document.getElementById('settings__password_2').value

        name == undefined ? name = '' : name = name
        surname == undefined ? surname = '' : surname = surname

        console.log('hello')
        
        if (
            checkPassword() && (String(name) != name_field || String(surname) != surname_field || 
            email != email_field || password_1 != password_1_field || password_2 != password_2_field)) {
                setIsChange(true)
        } else {
            setIsChange(false)
        }
    }
    
    return (
        <div className='settings'>

            <div className='settings__title'>Личные данные</div>

            <div className='settings__subtitle'>Основная информация</div>
            <div className='settings__first_section'>
                <div className='settings__input_container'>
                    <label className='settings__label'>Фамилия</label>
                    <input 
                    onChange={() => formChanges()} 
                    id='settings__surname' 
                    className='settings__input' 
                    type='text' />
                </div>
                <div className='settings__input_container'>
                    <label className='settings__label'>Имя</label>
                    <input 
                    onChange={() => formChanges()} 
                    id='settings__name' 
                    className='settings__input' 
                    type='text' />
                </div>
                
                <div className='settings__input_container'>
                    <label className='settings__label'>Почта</label>
                    <input 
                    onChange={() => formChanges()} 
                    id='settings__email' 
                    className='settings__input' 
                    type='text' />
                </div>
            </div>

            <div className='settings__subtitle'>Пароль</div>
            <div className='settings__first_section'>
                <div className='settings__input_container'>
                    <label className='settings__label'>Пароль</label>
                    <input 
                        id='settings__password_1'
                        className='settings__input password' 
                        type='password' onChange={() => formChanges()} />
                    <img 
                        onClick={() => {showPassword()}} 
                        src={password} 
                        className='password__hide' 
                        alt='show password'/>
                </div>
                
                <div className='settings__input_container'>
                    <label className='settings__label'>Подтверждение пароля</label>
                    <input 
                        id='settings__password_2'
                        className='settings__input password' 
                        type='password' onChange={() => formChanges()} />
                    <img 
                        onClick={() => {showPassword()}} 
                        src={password} 
                        className='password__hide' 
                        alt='show password'/>
                </div>
                <button 
                    id='settings__button'
                    className='settings__button'
                    disabled={!isChanged}
                    onClick={() => {fetchData()}}>
                    Сохранить изменения
                </button>
            </div>
            
        </div>
    )
}

export default Settings