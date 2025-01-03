
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group';

import { ProductBBL } from '../../../../bll/productPage/ProductPage'
import { fetchReviewsRates } from '../../../store/queries/Reviews/GetReviewsRates'
import { fetchDeleteReview } from '../../../store/queries/Reviews/DeleteReview';

import like from '../../../../static/images/like.png'
import dislike from '../../../../static/images/dislike.png'
import pencil from '../../../../static/images/pencil.png'
import junkBucket from '../../../../static/images/junkBucket.png'
import threeDots from '../../../../static/images/threeDots.png'

import { GetUID } from '../../../../bll/cookie/GetUID';

const LogicReview = ({id, product_id}) => {
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
        
        const expanderId = 'userReview__open_container_' + id
        const expander = document.getElementById(expanderId)
        
        const reviewId = 'userReview__value_' + id
        const review = document.getElementById(reviewId)

        const reviewTextAreaId = 'userReview__change_' + id
        const reviewTextArea = document.getElementById(reviewTextAreaId)

        if (isChangeCorrect) {
            setChangeReview(false)

            expander.style.display = 'none'
            review.style.display = 'none'
            reviewTextArea.style.display = 'block'

        } else {
            expander.style.display = 'flex'
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

    console.log(isChangeCorrect)
    
    return (
        <div className='userReview__logic_wrapper'>
            <div className='userReview__delimiter'></div>
        <div className='userReview__edit_section'>
            <CSSTransition
                in={isChangeCorrect}
                timeout={0}
                unmountOnExit
            >
                <div className='userReview__change_btns_container'>
                    <button 
                        className='userReview__change_btn cancel'
                        onClick={() => changeCorrectReview()}
                    >
                        Отмена</button>
                    <button className='userReview__change_btn save'>Сохранить</button>
                </div>
            </CSSTransition>
            <CSSTransition
                in={!isChangeCorrect}
                timeout={0}
                unmountOnExit
            >

            <img 
                onClick={() => changeReview()} 
                src={threeDots} 
                alt='edit' 
                className='userReview__threeDots' />
            </CSSTransition>

            <CSSTransition
                in={isChangeReview}
                unmountOnExit
                timeout={200}
                classNames='changeReview'
            >      
            <div className='transition-wrapper'>
                                
            <CSSTransition
                in={!isDelete}
                classNames='popupDelete'
                timeout={0}
                unmountOnExit
            >
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
                    unmountOnExit
                >
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

import { RateSystem } from '../../../../bll/react-components/product-page/rate_system';

const UserReview = ({ review_user_id, assessment, id, product_id, date_publish, avatar, last_name, first_name, value }) => {

    const [isOpennedReviews, setOpennedReview] = useState(false)
    const dispatch = useDispatch()
    const isLogined = useSelector(state => state.users.isLogin)
    const {changeDislike, setChange, changeLike, setLike, setDislike} = RateSystem('review', id, product_id)

    useEffect(() => {
        if (assessment != null) {
            switch (true) {
                case assessment.assessment === true:
                    setLike(true)
                    break
                case assessment.assessment === false:
                    setDislike(true)
                    break
            }
        }
    }, [assessment])

    useEffect(() => {
        const reviewContentId = 'userReview__value_' + id 
        const reviewContent = document.getElementById(reviewContentId)
        if (value.length > 300) {
            reviewContent.classList.add('strict')
        }
        
        if (isOpennedReviews) {
            reviewContent.classList.add('open')
        } else {
            reviewContent.classList.remove('open')
        }
    }, [isOpennedReviews])

    const openReview = () => {
        const reviewOpenId = 'userReview__open_review_' + id
        const reviewOpen = document.getElementById(reviewOpenId)

        if (isOpennedReviews) {
            setOpennedReview(false)
            reviewOpen.textContent = 'Раскрыть отзыв'
        } else {
            setOpennedReview(true)
            reviewOpen.textContent = 'Свернуть отзыв'
        }
    }

    return (
        <div className='userReview'>
                <img src={avatar} alt='user' className='userReview__image' />

            <div className='userReview__section'>
                <div className='userReview__name'>{first_name + " " + last_name}</div>
                
                        <div id={'userReview__value_' + id} className='userReview__value'>
                                {value}
                        </div>

                        <textarea 
                            defaultValue={value} 
                            id={'userReview__change_' + id} 
                            className='userReview__change'/>
                    
                    {value.length > 300 ? 
                        <div 
                        id={'userReview__open_container_' + id} 
                        onClick={() => openReview()} 
                        className='userReview__open_container'>
                        <div id={'userReview__open_review_' + id} className='userReview__open_review'>Раскрыть отзыв</div>
                            <CSSTransition
                            in={isOpennedReviews}
                            classNames='openArrow'
                            timeout={0}
                            >
                                <div className='userReview__open_arrow'>&darr;</div>
                            </CSSTransition>
                        </div>  
                        :
                        ''                        
                    }
                    
                <div className='userReview__info'>
                    <div className='rate_buttons_section_review'>
                        <button className='rate__reduce' title='Не нравится'>
                            <img 
                            alt='rate img' 
                            src={dislike} 
                            className='rate_img dislike review' 
                            id={'dislike_btn_review_' + id}
                            onClick={isLogined? () => {
                                changeDislike()
                                setChange(true)} 
                                : () => dispatch(setIsOpen())}/>
                        </button>
                        <button className='rate__increase' title='Нравится'>
                                <img 
                                alt='rate img' 
                                src={like} 
                                className='rate_img like'
                                id={'like_btn_review_' + id}
                                onClick={isLogined ? () => {
                                    changeLike()
                                    setChange(true)} : () => dispatch(setIsOpen())}/>
                        </button>
                        </div>
                    <div className='userReview__delimiter'></div>
                    {ProductBBL.defineDate(date_publish)}

                    {GetUID() === review_user_id ?                   
                    <LogicReview 
                        id={id}
                        product_id={product_id}
                        value = {value}
                    />
                    : ''} 
                </div>
            </div>
        </div>
    )
}

export default UserReview