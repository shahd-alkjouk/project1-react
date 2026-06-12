import React from 'react'
import { ApiConfig } from '../API/ApiConfig'

export const FaqService = {

    getCategories: function(){
        const url = `${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.FAQ_CATEGORY}`
    
        return fetch(url)

        .then((res)=>{
            if (!res.ok) {
                return res.json().then((serverError)=>{ throw new Error(serverError.message) })
            } else {
                return res.json()
            }
        })
    }, 

    getFaqByCategory: function(cat_id){
    const url = `${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.FAQ_LIST}?category=${cat_id}`

    return fetch(url)
        .then(res => res.json())
}
}