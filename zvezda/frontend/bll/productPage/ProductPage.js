import React from 'react'

import arrow_confrimed from '../../static/images/arrow_confirmed.png'
import cross from '../../static/images/cross.png'

export class ProductBBL {
    static rate_circle(good_rates, bad_rates) {
        if (bad_rates + good_rates === 0) {
            const rate = 0
            return [<div key="rate_circle" className='rate_circle grey'>-</div>, 
            <div key="rating_count" className='rating_count'>Нет оценок</div>]
    
        } else {
            let rate = (good_rates / (good_rates + bad_rates)) * 5
            if (4.0 < rate) {
                return [<div key="rate_circle" className='rate_circle green'>{rate}</div>, 
                    <div key="rating_count" className='rating_count'>Оценок: {bad_rates+good_rates}</div>]
            } else if (3.0 < rate) {
                return [<div key="rate_circle" className='rate_circle yellow'>{rate}</div>, 
                    <div key="rating_count" className='rating_count'>Оценок: {bad_rates+good_rates}</div>]
            } else if (0.0 <= rate) {
                return [<div key="rate_circle" className='rate_circle red'>{rate}</div>, 
                    <div key="rating_count" className='rating_count'>Оценок: {bad_rates+good_rates}</div>]
            }
        } 
    }

    static availabilityStatus(amount) {
    if (amount > 0) { 
    return [<div className='availability_img_container' key='available-icon'>
        <img src={arrow_confrimed} alt='status image' className='availability_img'/>
    </div>, 
    <div key='availability_status' className='availability_status'>В наличии</div>] }
    else {
    [<div className='availability_img_container' key='unavailable-icon'>
        <img src={cross} alt='status image' className='availability_img'/>
    </div>, 
    <div key='availability_status' className='availability_status'>Не в наличии</div>]
        }
    }   

    static Discount(el) {
        if (el.discount) {
            return [<div key={el.articul} className='product_card__price'>
                {(toString(el.price * parseFloat(el.discount.value))).indexOf('.') ? 
                (el.price * parseFloat(el.discount.value)) :
                (el.price * parseFloat(el.discount.value)) + '.00'}
                </div>, 
            <div key={el.articul + 1} className='product_card__price crossed'>{el.price}</div>]
        } else {
            return <div className='product_card__price'>{el.price}</div>
        }
    }
    static defineDate(date) {
        const now = new Date()
        const date_publish = new Date(date)

        const days = parseInt(((now - date_publish) / (1000 * 60 * 60 * 24)), 10)

        if (days >= 365) {
            const year = ~~(days / 365)
            const length = String(year).length

            switch (true) {
                case year === 1:
                    return <div className='userReview__date'>{year + " год назад"}</div>
                case String(year)[length - 1] == 1 && year != 11:
                    return <div className='userReview__date'>{year + " год назад"}</div>
                case year >= 2 && year <= 4:
                    return <div className='userReview__date'>{year + " года назад"}</div>
                case (String(year)[length-1] === '2' && String(year)[length-2] != '1') || 
                    (String(year)[length-1] === '3' && String(year)[length-2] != '1') ||
                    (String(year)[length-1] === '4' && String(year)[length-2] != '1'):
                    return <div className='userReview__date'>{year + " года назад"}</div>
                default:
                    return <div className='userReview__date'>{year + " лет назад"}</div>
            }
        }
        if (days > 30) {
            const month = ~~(days / 30)
            switch (true) {
                case month >= 5 && month <= 12:
                    return <div className='userReview__date'>{month + " месяцев назад"}</div>
                case month >= 2 && month < 5:
                    return <div className='userReview__date'>{month + " месяца назад"}</div>
                case month === 1:
                    return <div className='userReview__date'>{month + " месяц назад"}</div>
            }
        }
        if (days >= 7) {
            const week = ~~(days / 7)
            switch (true) {
                case week >= 2 && week <= 4:
                    return <div className='userReview__date'>{week + " недели назад"}</div>
                case week === 1:
                    return <div className='userReview__date'>{week + " неделю назад"}</div>
            }
        } else if (days == 0) {
            return <div className='userReview__date'>сегодня</div>
        } else if (days > 0) {
            switch (true) {
                case days >= 5 && days <= 7:
                    return <div className='userReview__date'>{days + " дней назад"}</div>
                case days >= 2 && days <= 5:
                    return <div className='userReview__date'>{days + " дня назад"}</div>
                case days === 1:
                    return <div className='userReview__date'>{days + " день назад"}</div>
            }
        }
    }
}