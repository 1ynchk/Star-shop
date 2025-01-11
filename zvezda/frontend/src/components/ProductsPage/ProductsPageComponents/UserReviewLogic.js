
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group';

import { fetchDeleteReview } from '../../../store/queries/Reviews/DeleteReview';

import pencil from '../../../../static/images/pencil.png'
import junkBucket from '../../../../static/images/junkBucket.png'
import threeDots from '../../../../static/images/threeDots.png'

export const LogicReview = (
    { id, product_id, isFilled, fetchReview, value }) => {
    const dispatch = useDispatch()
    const [isDelete, setIsDelete] = useState(false)
    const [isChangeReview, setChangeReview] = useState(false)
    const [isChangeCorrect, setChangeCorrect] = useState(false)

    const deleteReview = () => {
        dispatch(fetchDeleteReview({'product_id': product_id, 'review_id': id}))
    }

    const changeReview = () => {
        if (isChangeReview) {
            setChangeReview(false)
            setTimeout(() => {
                setIsDelete(false)
            }, [500])
        } else {
            setChangeReview(true)
        }
    }

    const changeDeleteReview = () => {
        if (isDelete) {
            setIsDelete(false)
        } else {
            setIsDelete(true)
        }
    }

    useEffect(() => {
        let expander = ''

        if (value.length > 320) {
            const expanderId = 'userReview__open_container_' + id
            expander = document.getElementById(expanderId)
        }
        
        const reviewId = 'userReview__value_' + id
        const review = document.getElementById(reviewId)

        const reviewTextAreaId = 'userReview__change_' + id
        const reviewTextArea = document.getElementById(reviewTextAreaId)

        if (isChangeCorrect) {
            setChangeReview(false)

            if (value.length > 320) {
                expander.style.display = 'none'
            }

            review.style.display = 'none'
            reviewTextArea.style.display = 'block'

        } else {
            if (value.length > 320) {
                expander.style.display = 'flex'
            }
            review.style.display = 'block'
            reviewTextArea.style.display = 'none'
        }
        
    }, [isChangeCorrect])

    const changeCorrectReview = () => {
        if (isChangeCorrect) {
            setChangeCorrect(false)
        } else {
            setChangeCorrect(true)
        }
    }

    return (
        <div className='userReview__logic_wrapper'>
            <div className='userReview__delimiter'></div>
        <div className='userReview__edit_section'>
            <CSSTransition
                in={isChangeCorrect}
                timeout={0}
                unmountOnExit>
                <div className='userReview__change_btns_container'>
                    <button 
                        className='userReview__change_btn cancel'
                        onClick={() => changeCorrectReview()}
                    >
                        Отмена</button>
                    <button
                        id={'userReview__change_btn_' + id}
                        className='userReview__change_btn save'
                        disabled={!isFilled}
                        onClick={() => {fetchReview(); changeCorrectReview()}}
                    >
                        Сохранить
                    </button>
                </div>
            </CSSTransition>
            <CSSTransition
                in={!isChangeCorrect}
                timeout={0}
                unmountOnExit>

            <img 
                onClick={() => changeReview()} 
                src={threeDots} 
                alt='edit' 
                className='userReview__threeDots' />
            </CSSTransition>

            <CSSTransition
                in={isChangeReview}
                timeout={200}
                classNames='changeReview'
                unmountOnExit>      
            <div className='transition-wrapper'>
                                
            <CSSTransition
                in={!isDelete}
                classNames='popupDelete'
                timeout={0}
                unmountOnExit>
                <div id={'userReview__edit_popup_' + id} className='userReview__edit_popup'>
                    
                    <div className='userReview__edit_popup_container'>
                        <div className='userReview__subsection'>
                            <img className='userReview__edit' src={pencil} alt='edit'/>
                            <div 
                            onClick={() => changeCorrectReview()} 
                            className='userReview__text'>Изменить</div>
                        </div>
                        <div 
                        onClick={() => changeDeleteReview()} 
                        className='userReview__subsection'>
                            <img className='userReview__edit' src={junkBucket} alt='delete'/>
                            <div className='userReview__text'>Удалить</div>
                        </div>
                </div>

                        <div className='userReview__edit_triangle'></div>
                    </div>
            </CSSTransition>

                <CSSTransition
                    in={isDelete}
                    timeout={0}
                    classNames='popupChangeDeleteReview'
                    unmountOnExit>
                    <div id={'userReview__edit_popup_' + id} className='userReview__edit_popup'>
                        
                        <div className='userReview__edit_popup_container'>
                            <div className='userReview__delete_title'>Удалить отзыв?</div>
                            <div className='userReview__delete_container'>
                                <button 
                                    onClick={() => changeDeleteReview()} 
                                    className='userReview__delete_btn'>Нет</button>
                                <button
                                    onClick={() => deleteReview()}
                                    className='userReview__delete_btn yes'>Да</button>
                            </div>
                        </div>

                            <div className='userReview__edit_triangle'></div>
                        </div>
                </CSSTransition>
            </div> 
                            
            </CSSTransition>    
                </div>
        </div>
    )
}