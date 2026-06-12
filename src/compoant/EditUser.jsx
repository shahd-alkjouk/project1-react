import React, { useContext, useEffect, useState } from 'react'
import { ApiConfig } from '../API/ApiConfig'
import { AuthContext } from '../Context/AuthContext'
import Navparr from './Navparr'
import { NavLink, useNavigate } from 'react-router'

const EditUser = () => {

    const { userInfo,setPicture,picture } = useContext(AuthContext) 
    const navigte =useNavigate()
    const sessionCSRF = 'https://tamkeen-dev.com/api/session/token'
    const [error, setError] = useState(null)
    const [edit,setEdit] = useState([])
    const [loading, setLoading] = useState (
               {
                   'banner': false
               }
           )

    const editProfile = (e) => {

        setLoading({
            ...loading,
            banner: true
        })

        fetch(sessionCSRF, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.text())
            .then(csrfToken => {
                // console.log(csrfToken)

                return fetch(`${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.PROFILE}/${userInfo.user_id}?_format=json`, {
     
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-Token': csrfToken,
                        'Authorization': `Basic ${userInfo.ps}`,
                    },
                    body:JSON.stringify({
    
    "field_name": [
        {
            "value": edit.field_name?.value||""
        }
    ],
    "field_surname": [
        {
            "value": edit.field_surname?.value||""
        }
    ],
    "user_picture": [
        {
            "target_id": edit.user_picture?.target_id||null
        }
    ]
})
                })
                    .then(res => res.json())
                    .then(data => {
                        setEdit(data)
                        navigte('/profile')
                    })
                    .catch((err) => { })
                    .finally(() => {
                        setLoading({
                            ...loading,
                            banner: false
                        })
                    })


            })
            .catch((err) => {
                console.log(err.message)
            })
            .finally(() => {
                console.log()
            })


    }
    


  return (
    <>
    <Navparr/>
    <div className='col-4 offset-4 box-profile mt-5'>
        
        <form
              onSubmit={(e) => {
                        e.preventDefault()
                        editProfile()
                    }}
        >
            <input type="text"
                placeholder='First Name'
                className='form-control'
                value={edit.field_name?.value||""}
                id='firstName'
                             onChange={(e) => {
                                 setEdit(
                                     {
                                         ...edit,
                                         "field_name": {
                                             "value": e.target.value
                                         }
                                     }
                                 )
                                 
                             }} />
            <input type="text"
                placeholder='last Name'
                className='form-control mt-2'
                value={edit.field_surname?.value||""}
                id='field_surname'
                             onChange={(e) => {
                                 setEdit(
                                     {
                                         ...edit,
                                         "field_surname": {
                                             "value": e.target.value
                                         }
                                     }
                                 )
                                 
                             }} />

                             <div className="row mt-4 mb-3">
                                <div className="col-2">
                                    <button className='btn ptn1'>edit</button>
                                 </div>

                                <NavLink className="profile-button col-6 offset-4 color-b ta-end" to="/profile">back to profile</NavLink>
                             </div>
        </form>
    </div>
    </>
  )
}

export default EditUser