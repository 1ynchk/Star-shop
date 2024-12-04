import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = ({ path }) => {

    useEffect(() => {
        const elements = document.querySelectorAll('sidebar__element')

        elements.forEach((element, index) => {
            if (element.id === path) {
                element.classList.add('active')
            } else {
                element.classList.remove('active')
            }
        })
    })
    
    return (
        <div className='sidebar'>
            <div className='sidebar__title'>Профиль</div>
            <NavLink to='/profile/settings' id='/profile/settings' className='sidebar__element'>Личные данные</NavLink>
            <NavLink to='/profile/bonuses' id='/profile/bonuses' className='sidebar__element'>Бонусы</NavLink>
            <NavLink to='/profile/favourite' id='/profile/favourite' className='sidebar__element'>Избранное</NavLink>
        </div>
    )
}

export default Sidebar