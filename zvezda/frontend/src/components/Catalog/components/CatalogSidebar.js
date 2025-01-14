import React from 'react'
import {  useNavigate } from 'react-router-dom'

const CatalogSidebar = ({categories, category}) => { 

    let content = null
    
    if (category.slug != 'catalog') {
        let newLst = categories.filter(el => el.slug == category.slug) 
        content = <AllTheCategories categories={newLst} is_one={true}/> 
    } 
    if (category.slug == 'catalog') {
        content = <AllTheCategories categories={categories} is_one={false} /> 
    }
    return (
        <div className='catalogSidebar'>
            <div className='catalogSidebar__title'>Категории</div>
           {content} 
        </div>
    )
}  

const AllTheCategories = ({categories, is_one}) => {

    const navigate = useNavigate()

    return categories.map(el => {
            return (
                <div key={el.id}className='catalogSidebar__category_container'>
                    {is_one ? <div className='catalogSidebar__arrow_back'>&lt;</div> : ""} 
                    {!is_one ? <div  className='catalogSidebar__delimiter'></div> : ""}
                    <div onClick={
                        () => {is_one ? navigate('/catalog/') : navigate(`?c=${el.slug}`)}}>
                        {el.name}</div>
                </div>
                ) 
            }
            )
} 

export default CatalogSidebar