import React, { useEffect } from 'react'

import password from '../../../../static/images/password.png'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfileInfoGet } from '../../../store/queries/User/Profile/getProfileInfo'
import { fetchProfileInfoPost } from '../../../store/queries/User/Profile/postProfileInfo'
import { checkPassword, checkName, checkSurname, correlateEmail } from '../../../../bll/Profile/ProfileSettings'
import { setIsChange } from '../../../store/slices/ProfileSlice'

const Settings = () => {
    const dispatch = useDispatch()
    const isChanged = useSelector(state => state.profile.isChanged)

    let name = useSelector(state => state.profile.name)
    name == undefined ? name = '' : name = name
    let surname = useSelector(state => state.profile.surname)
    surname == undefined ? surname = '' : surname = surname
    const email = useSelector(state => state.profile.email)
    const password_1 = ''
    const password_2 = ''
    const error_ = useSelector(state => state.profile.error)

    useEffect(() => {
        dispatch(fetchProfileInfoGet())
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

    const fetchData = () => {
        const name_field = document.getElementById('settings__name').value
        const surname_field = document.getElementById('settings__surname').value
        const email_field = document.getElementById('settings__email').value
        const password_field = document.getElementById('settings__password_1').value

        var data = {}

        name_field === name ? '' : data.first_name = name_field
        surname_field === surname ? '' : data.last_name = surname_field
        email_field === email ? '' : data.email = email_field
        password_field.length === 0 ? '' : data.password = password_field

        dispatch(fetchProfileInfoPost(data))
    }

    const showPassword = () => {
        const allPasswords = document.querySelectorAll('.settings__input.password')

        allPasswords.forEach(element => {
            if (element.type === 'password') {
                element.type = 'text'
            } else {
                element.type = 'password'
            }
        })
    }

    const formChangesPassword = () => {
        
        if (checkPassword(password_1, password_2)) {
                dispatch(setIsChange(true))
        } else {
            dispatch(setIsChange(false))
        }
    }

    const formChangesName = () => {

        if (checkName(name)) {
            dispatch(setIsChange(true))
        } else {
            dispatch(setIsChange(false))
        }
    }

    const formChangesSurname = () => {

        if (checkSurname(surname)) {
            dispatch(setIsChange(true))
        } else {
            dispatch(setIsChange(false))
        }
    }

    const formChangesEmail = () => {

        if (correlateEmail(email)) {
            dispatch(setIsChange(true))
        } else {
            dispatch(setIsChange(false))
        }
    }

    return (
        <div id='settings' className='settings'>
            <div className='settings__title'>Личные данные</div>
            <div className='settings__subtitle'>Основная информация</div>
            <div className='settings__first_section'>
                <div 
                    id='container_surname'
                    className='settings__input_container'>
                    <label className='settings__label'>Фамилия  
                        <span className='settings__span'> *</span></label>
                    <input 
                    onChange={() => formChangesSurname()} 
                    id='settings__surname' 
                    className='settings__input surname' 
                    type='text' />
                    <div id='warning_empty_surname' className='settings__warning surname empty'>
                        Поле "Фамилия" не должно быть пустым
                    </div>
                    <div id='warning_length_surname' className='settings__warning surname length'>
                        Поле "Фамилия" должно быть длинее 2 символов
                    </div>
                </div>
                <div id='container_name' className='settings__input_container'>
                    <label className='settings__label'>Имя
                        <span className='settings__span'> *</span>
                    </label>
                    <input 
                    onChange={() => formChangesName()} 
                    id='settings__name' 
                    className='settings__input name' 
                    type='text' />
                    <div id='warning_empty_name' className='settings__warning name empty'>
                        Поле "Имя" не должно быть пустым
                    </div>
                    <div id='warning_length_name' className='settings__warning name length'>
                        Поле "Имя" должно быть длинее 2 символов
                    </div>
                </div>
                
                <div className='settings__input_container'>
                    <label className='settings__label'>Почта</label>
                    <input 
                    onChange={() => formChangesEmail()} 
                    id='settings__email' 
                    className='settings__input email' 
                    type='text' />
                    <div id='warning_empty_email' className='settings__warning email empty'>
                        Поле "Почта" не должно быть пустым
                    </div>
                    <div id='warning_incorrect_email' className='settings__warning email incorrect'>
                        Поле "Почта" должно быть корректным
                    </div>
                </div>
            </div>

            <div className='settings__subtitle'>Пароль</div>
            <div className='settings__first_section'>
                <div className='settings__input_container'>
                    <label className='settings__label'>Пароль</label>
                    <input 
                        id='settings__password_1'
                        className='settings__input password' 
                        type='password' onChange={() => formChangesPassword()} />
                    <img 
                        onClick={() => {showPassword()}} 
                        src={password} 
                        className='password__hide' 
                        alt='show password'/>
                </div>
                
                <div id='container_password' className='settings__input_container'>
                    <label className='settings__label'>Подтверждение пароля</label>
                    <input 
                        id='settings__password_2'
                        className='settings__input password' 
                        type='password' onChange={() => formChangesPassword()} />
                    <img 
                        onClick={() => {showPassword()}} 
                        src={password} 
                        className='password__hide' 
                        alt='show password'/>
                    <div id='warning_incorrect_password' className='settings__warning password incorrect'>
                        Пароли должны совпадать
                    </div>
                    <div id='warning_length_password' className='settings__warning password length'>
                        Пароль должен быть длинее 10 символов
                    </div>
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