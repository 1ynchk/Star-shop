import React, { useEffect } from 'react'

import Settings from './settings'
import Sidebar from './sidebar'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const path = window.location.pathname
    const navigate = useNavigate()
    const isAuthenticated = localStorage.getItem('isAuthenticated')

    let content = null 

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated])

    if (path === '/profile/settings') content = <Settings/>
    
    console.log(path)
    
    return (
        <div className='profile'>
            <Sidebar path={path} />
            {content}
        </div>
    )
}
export default Profile