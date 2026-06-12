import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null)
    const [isInitialized, setIsInitialized] = useState(true)
    const [picture,setPicture] =useState(null)

    useEffect(()=>{
        const xdata = localStorage.getItem('theUserData')
        if (xdata) {
            setUserInfo(JSON.parse(xdata))
            setIsInitialized(false)
        } else {
            setIsInitialized(false)
        }

        const storedPicture = localStorage.getItem('picture')
        if(storedPicture){
            setPicture(storedPicture)
        }
    }, [])

    
        
  return (
    <AuthContext.Provider value={ {userInfo, setUserInfo,picture,setPicture, isInitialized,setIsInitialized} }>
        { children }
    </AuthContext.Provider>
  )
}
