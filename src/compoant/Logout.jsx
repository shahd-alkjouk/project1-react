import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'

const Logout = () => {


    const { userInfo,setUserInfo ,setPicture,setIsInitialized} = useContext(AuthContext) 

    const [error, setError] = useState(null) 
      const [csrfToken, setCsrfToken] = useState(null)

      const getToken = () => {
          fetch('https://tamkeen-dev.com/api/session/token?_format=json', {
            method: 'POST',
            credentials: 'include'
          })
            .then(res => res.text())
            .then(data => setCsrfToken(data))
            .catch(err => setError(err.message))
        }
      
        useEffect(() => {
          getToken()

          fetch(`https://tamkeen-dev.com/api/user/logout?_format=json&token=Ldfbrq14ut6FGchrFCZhzJ3orziFFX47RGhCcooQ3UM`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type':'application/json',
                  'X-CSRF-Token': csrfToken,  // فقط هذا الهيدر
                },
              })
                .then(res => {
                  if (!res.ok) throw new Error("Upload failed")
                  return res.json()
                })
                .then(() => {
                  setError(null)
                  setUserInfo(null)
                  setPicture(null)
                  setIsInitialized(null)
                  localStorage.removeItem('theUserData')
                  localStorage.removeItem('picture')

                })
                .catch(err => {
                  setError(err.message)  
                })
        }, [])


  return (
    <div>Logout</div>
  )
}

export default Logout