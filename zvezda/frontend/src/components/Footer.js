import React from 'react';
import { NavLink } from 'react-router-dom';

import photo_vk from "../../static/images/vk.png"
import photo_tg from "../../static/images/telegram.png"

const Footer = (props) => {
    return (
        <div className='footer'>
                        <div className='footer__container'>
                            <div className='footer__section'>
                                <div className='footer__section_title'>Обратная связь</div>
                                <div className='footer__section_info'>
                                    <div className='footer__section_number'>8 800 535 35 35</div>
                                    <div className='footer__section_buttons'>
                                        <a 
                                        target='_blank'
                                        href='https://t.me/zvezdakld' 
                                        className='footer__section_button'>
                                            <img 
                                            className='footer__section_button_img' 
                                            alt='redirect tg' 
                                            src={photo_tg} />
                                        </a>
                                        <a 
                                        target='_blank'
                                        href='https://t.me/zvezdakld' 
                                        className='footer__section_button'>
                                            <img 
                                            className='footer__section_button_img' 
                                            alt='redirect vk' 
                                            src={photo_vk} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className='footer__subcontainer'>
                                <div className='footer__section'>
                                    <div className='footer__section_title'>Контакты</div>
                                    <div className='footer__section_info'>
                                        <div><NavLink className='footer__section_text'>Связь с нами</NavLink></div>
                                        <div><NavLink className='footer__section_text'>Помощь и ответы на вопросы</NavLink></div>
                                    </div>
                                </div>
                                <div className='footer__section'>
                                    <div className='footer__section_title'>О нас</div>
                                    <div className='footer__section_info'>
                                        <div><NavLink className='footer__section_text'>О звезде</NavLink></div>
                                        <div><NavLink className='footer__section_text'>Бонусы</NavLink></div>
                                    </div>
                                </div>
                                <div className='footer__section'>
                                    <div className='footer__section_title'>Магазин</div>
                                    <div className='footer__section_info'>
                                        <div><NavLink className='footer__section_text'>Каталог</NavLink></div>
                                        <div><NavLink className='footer__section_text'>Карта магазинов</NavLink></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    )
}

export default Footer