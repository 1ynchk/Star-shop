import React, {useEffect, useState} from 'react'
import CatalogSidebar from './components/CatalogSidebar'
import CalagotMainArea from './components/CatalogMainArea'
import { ChoisenCategory } from '../../../bll/Catalog/CatalogChoisenCategory'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGetCategories } from '../../store/queries/Catalog/getCategories'
import { useLocation } from 'react-router-dom'

const Catalog = () => { 

    const dispatch = useDispatch()
    const location = useLocation()
    const [queryParams, setQueryParams] = useState(new URLSearchParams(location.search).get('c')) 
    const categories = useSelector(state => state.catalog.categories)

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        const newCategory = queryParams.get('c')
        setQueryParams(newCategory)
    }, [location.search])
    
    useEffect(() => {
        dispatch(fetchGetCategories())    
    }, [])

    let obj = ChoisenCategory(queryParams, categories) || {name: "Каталог", slug: 'catalog'}
       
    return (
        <div className='catalog'> 
        <div className='catalog__title'>{obj.name}</div>
            <div className='catalog__container'>
                <CatalogSidebar categories={categories} category={obj}/> 
                <CalagotMainArea />
            </div>
            
        </div>
    )
}

export default Catalog