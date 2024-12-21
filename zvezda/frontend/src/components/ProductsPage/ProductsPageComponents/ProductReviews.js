import React, { useEffect } from 'react'
import { setReviewPopUp } from '../../../store/slices/ExactProductSlice'
import { useDispatch } from 'react-redux'

import photo from '../../../../static/images/reviewsWrite.png'

const UserReview = ({ date_publish, avatar, last_name, first_name, value}) => {

    const defineDate = (date) => {
        const now = new Date()
        const date_publish = new Date(date)

        const days = parseInt(((now - date_publish) / (1000 * 60 * 60 * 24)), 10)

        if (days >= 365) {
            console.log(~~(days / 365) + " лет(год) назад")
        }

        if (days >= 7) {
            console.log(~~(days / 7) + " недель(-ли) назад")
        }

        if (days == 0) {
            console.log('сегодня')
        } else if (days > 0) {
            switch (days) {
                case 1:
                    console.log(~~(days / 7) + " день назад")
                case 2:
                case 3:
                case 4:
                    console.log(~~(days / 7) + " дня назад")
                case 5:
                case 6:
                case 7:
                    console.log(~~(days / 7) + " дней назад")
            }
        }

    }

    useEffect(() => {
        defineDate(date_publish)
    }, [date_publish])
    
    
    return (
        <div className='userReview'>
                <img src={avatar} alt='user' className='userReview__image' />

            <div className='userReview__section'>
                
                <div className='userReview__name'>{first_name + " " + last_name}</div>
                
                <div className='userReview__value'>{value}</div>

                <div className='userReview__info'>
                    {date_publish}
                </div>
            </div>
        </div>
    )
}

const ProductReviews = ({ id, reviews }) => {
    const dispatch = useDispatch()

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
                {reviews.map(el => {return <UserReview 
                    key={el.id}
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