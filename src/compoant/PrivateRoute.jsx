import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { Navigate } from 'react-router'

const PrivateRoute = ({children}) => {

   const {userInfo,isInitialized}=useContext(AuthContext) 

   

   if (!userInfo) {
    return <Navigate to="/Sing" replace />
   }

  return children
}

export default PrivateRoute