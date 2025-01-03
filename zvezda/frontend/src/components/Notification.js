import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {CSSTransition} from 'react-transition-group';
import { setFalseNotification, setNullAtributes } from '../store/slices/Notification';

const Notification = () => {

    const dispatch = useDispatch()
    const notification = useSelector(state => state.notification.notification)

    const level = useSelector(state => state.notification.level)
    const image = useSelector(state => state.notification.image)
    const content = useSelector(state => state.notification.content)

    useEffect(() => {
        const notif = document.getElementById('notification__banner')
            
        switch (level) {
            case 'yellow':
                notif.classList.add('yellow')
                break
            case 'red':
                notif.classList.add('red')
                break
            case 'green':
                notif.classList.add('green')
                break
            default:
                notif.classList.remove('yellow')
                notif.classList.remove('red')
                notif.classList.remove('green')
                break
        }
    }, [level])

    useEffect(() => {
        const firstTimeout = setTimeout(() => {
            dispatch(setFalseNotification())
            const secondTimeout = setTimeout(() => {
                dispatch(setNullAtributes())
            }, 500)
            
            return () => clearTimeout(secondTimeout);
        }, 5000)
    
        return () => clearTimeout(firstTimeout)
    }, [notification])

    return (
        <div id='notification__wrapper' className='notification__wrapper'>
            <CSSTransition
                    in={notification}
                    timeout={0}
                    classNames='notification'
                >
                    <div id='notification__banner' className='settings__notification'>
                        <img src={image} alt='confirmed' className='notification__img'/>
                        <div className='settings__notification_title'>{content}</div>
                    </div>
            </CSSTransition>
        </div>
            
        
    )
}

export default Notification