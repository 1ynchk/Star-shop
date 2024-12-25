import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import phoneImg from '../../static/images/phone_img.png';
import logoImg from '../../static/images/logo.png';
import profileImg from '../../static/images/profile_img.png';
import cartImg from '../../static/images/cart_img.png';
import findImg from '../../static/images/find_img.png';

import { setIsOpen } from '../store/slices/PopupSlice';
import { fetchLogOut } from '../store/queries/Logout';
import { getCSRFToken } from '../../bll/GetCSRFToken';
import { NavLink } from 'react-router-dom';

const JustProfile = () => {
    const dispatch = useDispatch()

    return (
        <button onClick={() => dispatch(setIsOpen())} className='header__profile_info_container'>
            <img className='header__profile_info_img' src={profileImg} alt='profile_img'/>
            <div className='header__profile_info_title'>Кабинет</div>
        </button>
    )
}

const LoginedUserProfile = () => {
    const avatar = localStorage.getItem('avatar')
    const dispatch = useDispatch()

    const LogOutFunc = () => {
        const token = getCSRFToken()
        dispatch(fetchLogOut({token: token}))
    }
    
    return (
        <div className='profile-wrapper'>
            <div className='header__profile_info_container'>
                <img className='header__profile_info_img' src={avatar} alt='profile_img'/>
                <div className='header__profile_info_title'>Кабинет</div>
                <div className='profile_list'>
                <div className='profile_list__btns_wrapper'>
                    <NavLink to='/profile/settings' className='profile_list__element'>Профиль</NavLink>
                </div>
                <div className='profile_list__btns_wrapper'>
                    <button onClick={() => LogOutFunc()} className='profile_list__element'>Выйти</button>
                </div>
            </div>
            </div>
            
        </div>
    )
}

const Header = () => {
    const isLogin = useSelector(state => state.users.isLogin)

    return (
        <div className="header">
            <div className='header__above'>
                <div className='header__above_section'>
                    <div><a href='#'>Магазины</a></div>
                    <div><a href='#'>Оплата и доставка</a></div>
                    <div><a href='#'>Бонусы</a></div>
                </div>
                <div className='header__above_section'>
                    <div><a href='#'><img className='phone_img' src={phoneImg} alt='phone_img'/>8 800 535 35 35</a></div>
                    <div><a href='#'>Помощь</a></div>
                </div>
            </div>
            <div className='header__middle'>
                <div><a href='/'><img src={logoImg} alt='logo_img' className='header__logo' /></a></div>
                <div className='header__search'>
                    <a href='#' className='header__catalog'>Каталог</a>
                    <input className='header__searchbar' placeholder='Найти товар'></input>
                    <button className='header__find_container'>
                        <img className='header__find' src={findImg} alt='find_img'/>
                    </button>
                </div>
                <div className='header__profile_info'>
                    <div>
                        {isLogin ? <LoginedUserProfile /> : <JustProfile />}
                    </div>
                    <div>
                        <a href="#" className='header__profile_info_container'>
                            <img className='header__profile_info_img' src={cartImg} alt='profile_img'/>
                            <span className='header__profile_info_title'>Корзина</span>
                        </a>
                    </div>
                </div>
            </div>
            <div className='header__navigation'>
                <a href="#" className='header__nav_btn'>Хиты продаж</a>
                <a href="#" className='header__nav_btn'>Акции</a>
                <a href="#" className='header__nav_btn'>Школьная пора</a>
                <a href="#" className='header__nav_btn'>Сувениры</a>
            </div>
        </div>
    )
}

export default Header;