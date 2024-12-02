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
            const rate = (good_rates / (good_rates + bad_rates)) * 5;
            if (4.0 < rate < 5.0) {
                return [<div key="rate_circle" className='rate_circle green'>{rate}</div>, 
                    <div key="rating_count" className='rating_count'>Оценок: {bad_rates+good_rates}</div>]
            } else if (3.0 < rate < 4.0) {
                return [<div key="rate_circle" className='rate_circle yellow'>{rate}</div>, 
                    <div key="rating_count" className='rating_count'>Оценок: {bad_rates+good_rates}</div>]
            } else if (0.0 < rate < 3.0) {
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
}