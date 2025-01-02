
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

    const changeCorrectReview = () => {
        if (isChangeCorrect) {
            setChangeCorrect(false)
        } else {
            setChangeCorrect(true)
        }
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

    
    return (
        <div className='userReview__logic_wrapper'>
            <div className='userReview__delimiter'></div>
        <div className='userReview__edit_section'>
            <img 
                onClick={() => changeReview()} 
                src={threeDots} 
                alt='edit' 
                className='userReview__threeDots' />
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

const UserReview = ({ review_user_id, assessment, id, product_id, date_publish, avatar, last_name, first_name, value }) => {

    const [isOpennedReviews, setOpennedReview] = useState(false)
    const dispatch = useDispatch()
    const isLogined = useSelector(state => state.users.isLogin)
    const [isLike, setLike] = useState(false)
    const [isDislike, setDislike] = useState(false)
    const [isChanged, setChange] = useState(false)

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
        const btn_dislike_id = 'dislike_btn_review_' + id
        const btn_like_id = 'like_btn_review_' + id
        const btn_dislike = document.getElementById(btn_dislike_id)
        const btn_like = document.getElementById(btn_like_id)

        if(isDislike && isLike) {
            setLike(false)
            setDislike(false)
        } else {
            isDislike ? btn_dislike.classList.add('active') : btn_dislike.classList.remove('active')
            isLike ? btn_like.classList.add('active') : btn_like.classList.remove('active')
        } 
        if (isLike && !isDislike && isChanged) {
            dispatch(fetchReviewsRates({'assessment': true, 'id': id, 'id_product': product_id}))
            setChange(true)
        } 
        if (!isLike && isDislike && isChanged) {
            dispatch(fetchReviewsRates({'assessment': false, 'id': id, 'id_product': product_id}))
            setChange(true);
        }
        if (!isLike && !isDislike && isChanged ) {
            dispatch(fetchReviewsRates({'assessment': null, 'id': id, 'id_product': product_id}))
        }
       
    }, [isDislike, isLike])

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

    const changeDislike = () => {
        if (isDislike) {
            setDislike(false)
        } else {
            setDislike(true)
        }
    }

    const changeLike = () => {
        if (isLike) {
            setLike(false)
        } else {
            setLike(true)
        }
    }

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
                
                <div className='userReview__review'>
                    <div id={'userReview__value_' + id} className='userReview__value'>
                            {value}
                    </div>
                    {value.length > 300 ? 
                        <div onClick={() => openReview()} className='userReview__open_container'>
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
                    
                </div>
                
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
                        product_id={product_id}/>
                    : ''} 
                </div>
            </div>
        </div>
    )
}

export default UserReview