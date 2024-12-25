import React, { useEffect, useState } from 'react'
import { setReviewPopUp } from '../../../store/slices/ExactProductSlice'
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group';

import photo from '../../../../static/images/reviewsWrite.png'
import { ProductBBL } from '../../../../bll/productPage/ProductPage'
import { fetchReviewsRates } from '../../../store/queries/GetReviewsRates'

import like from '../../../../static/images/like.png'
import dislike from '../../../../static/images/dislike.png'
import pencil from '../../../../static/images/pencil.png'
import junkBucket from '../../../../static/images/junkBucket.png'

const UserReview = ({ assessment, id, product_id, date_publish, avatar, last_name, first_name, value }) => {

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

    useEffect(() => {
        const reviewContentId = 'userReview__value_' + id 
        const reviewContent = document.getElementById(reviewContentId)
        
        if (isOpennedReviews) {
            reviewContent.classList.add('open')
        } else {
            reviewContent.classList.remove('open')
        }
    }, [isOpennedReviews])

    return (
        <div className='userReview'>
                <img src={avatar} alt='user' className='userReview__image' />

            <div className='userReview__section'>
                <div className='userReview__name'>{first_name + " " + last_name}</div>
                
                <div className='userReview__review'>
                    <div id={'userReview__value_' + id} className='userReview__value'>{value}</div>
                    {value.length > 350 ? 
                        <div onClick={() => openReview()} className='userReview__open_container'>
                        <div id={'userReview__open_review_' + id} className='userReview__open_review'>Раскрыть отзыв</div>
                            <CSSTransition
                            in={isOpennedReviews}
                            classNames='openArrow'
                            timeout={200}
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
                    <div className='userReview__delimiter'></div>
                    <div></div>
                    <div className='userReview__edit_section'>
                        <img className='userReview__edit' src={pencil} alt='edit'/>
                        <img className='userReview__edit' src={junkBucket} alt='delete'/>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ProductReviews = ({ id }) => {
    const dispatch = useDispatch()
    const reviews = useSelector(state => state.exactProduct.reviews)

    const showReviewPopUp = () => {
        dispatch(setReviewPopUp())
    }

    return (
        <div className='productReview'>
            <div className='productReview__write_section'>
                <div className='productReview__title'>Отзывы:</div>
                <div className='productReview__write_container'>
                    <div className='productReview__write_subcontainer'>
                        <div className='productReview__subtitle'>Купили этот товар? Поделитесь вашем мнением!</div>
                        <button 
                            onClick={() => showReviewPopUp()} 
                            className='productReview__button'>Написать отзыв</button>
                    </div>
                    <div className='productReview__image_container'>
                        <img src={photo} alt='cat' className='productReview__image' />
                    </div>
                </div>
            </div>
            <div className='productReview__container'>
                {reviews.map(el => {
                    return <UserReview 
                    assessment={el.assessments}
                    product_id={id}
                    key={el.id}
                    id={el.id}
                    value={el.value}
                    avatar={el.user_id.avatar}
                    first_name={el.user_id.first_name}
                    last_name={el.user_id.last_name}
                    date_publish={el.date_publish}
                    />})}
            </div>
        </div>
    )
}

export default ProductReviews