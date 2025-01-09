
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group';

import { ProductBBL } from '../../../../bll/productPage/ProductPage'
import { GetUID } from '../../../../bll/cookie/GetUID';
import { RateSystem } from '../../../../bll/react-components/product-page/rate_system';
import { ReviewValidation } from './../../../../bll/react-components/product-page/review-validation';

import like from '../../../../static/images/like.png'
import dislike from '../../../../static/images/dislike.png'

import { LogicReview } from './UserReviewLogic';
import { setIsOpen } from '../../../store/slices/PopupSlice';

const UserReview = (
    { review_user_id, assessment, id, product_id, 
    date_publish, avatar, last_name, first_name, value }) => {

    const [isOpennedReviews, setOpennedReview] = useState(false)
    const dispatch = useDispatch()
    const isLogined = useSelector(state => state.users.isLogin)
    const { 
        changeDislike, 
        setChange, 
        changeLike, 
        setLike, 
        setDislike} = RateSystem('review', id, product_id)

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
        if (value.length > 320) {
            reviewContent.classList.add('strict')
        }
        
        if (isOpennedReviews) {
            reviewContent.classList.add('open')
        } else {
            reviewContent.classList.remove('open')
        }
    }, [isOpennedReviews])

    const {
        isFilled, 
        fetchReview, 
        onChangeInput} = ReviewValidation('update', product_id, id)

    return (
        <div className='userReview'>
            <img src={avatar} alt='user' className='userReview__image' />
        <div className='userReview__section'>
            <div className='userReview__name'>{first_name + " " + last_name}</div>
            
                    <div id={'userReview__value_' + id} className='userReview__value'>
                            {value}
                    </div>
                    <textarea
                        onChange={() => onChangeInput()}
                        defaultValue={value} 
                        id={'userReview__change_' + id} 
                        className='userReview__change'/>

                    {value.length > 320 ? 
                      <OpenReviewComp
                        id={id}
                        setOpennedReview={setOpennedReview}
                        isOpennedReviews={isOpennedReviews}/> : ''}
                
            <div className='userReview__info'>
                <div className='rate_buttons_section_review'>
                    <button className='rate__reduce' title='Не нравится'>
                        <img 
                        alt='rate img' 
                        src={dislike} 
                        className='rate_img dislike review' 
                        id={'dislike_btn_review_' + id}
                        onClick={
                            isLogined? () => {changeDislike(); setChange(true)} : () => dispatch(setIsOpen())
                        }/>
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
                    isFilled={isFilled}
                    fetchReview={fetchReview}
                    />
                : ''} 
            </div>
        </div>
    </div>
    )
}

export default UserReview

const OpenReviewComp = ({setOpennedReview, isOpennedReviews, id}) => {

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
        <div 
            id={'userReview__open_container_' + id} 
            onClick={() => openReview()} 
            className='userReview__open_container'>
            <div 
                id={'userReview__open_review_' + id} 
                className='userReview__open_review'>
                Раскрыть отзыв
            </div>
                <CSSTransition
                in={isOpennedReviews}
                classNames='openArrow'
                timeout={0}
                >
                    <div className='userReview__open_arrow'>&darr;</div>
                </CSSTransition>
        </div>
    )
}