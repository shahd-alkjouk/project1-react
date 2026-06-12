import React, { useContext, useEffect, useState } from 'react'
import NavSing from '../compoant/NavSing'
import { Container, Row } from 'react-bootstrap'
import { AuthContext } from '../Context/AuthContext'
import { useNavigate } from 'react-router'
import { AuthService } from '../Services/AuthService'
import LineButton from '../compoant/LineButton'
import { ApiConfig } from '../API/ApiConfig'


const SingIn = () => { 

  const [loginData, setLoginData] = useState(
        {
            "name": "", 
            "pass": ""
        }
    )  
    const[error, setError] = useState()
    const [loading, setLoading] = useState(false)



    const {userInfo, setUserInfo, isInitialized} = useContext(AuthContext)

    const [loggedin, setLoggedIn] = useState(false)

    const navigate = useNavigate()

    const callAPI = ()=>{ 

    setLoading(true)
    setError(null)

    fetch(`https://tamkeen-dev.com/api/user/login?_format=json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
            "name": `${loginData.name}`,
            "pass": `${loginData.pass}`
            }
        )
    })
    .then((res)=>{
        if(!res.ok) {
            return res.json().then((serverError)=>{
                throw new Error(serverError.message)
            })
            
            // throw new Error('Something went wrong')
        }
        return res.json()
    })
    .then((data)=>{
        console.log(data)

        const userData = {
            'username': data.current_user.name,
            'user_id': data.current_user.uid,
            'csrf_token': data.csrf_token,
            'logout_token': data.logout_token
        }

        localStorage.setItem('theUserData', JSON.stringify(userData) )

        setUserInfo({
            ...userData,
            'ps': btoa(`${loginData.name}:${loginData.pass}`),
        })

        setLoggedIn(true)

    })
    .catch((err)=>{
        console.log(err)
        setError(err.message)
    })
    .finally(()=>{
        console.log("Ended")
        setLoading(false)
    })


    }
    const loadCurrentUserProfile = ()=>{
        if(userInfo) {
            AuthService.getCurrentUsrProfile( {
                userId : userInfo.user_id,
                credentials : userInfo.ps,
        } )
        .then((data)=>{
            console.log(data)

            const userData_update = {
                ...userInfo,
                'firstName': data.field_name[0].value,
                'lastName': data.field_surname[0].value,
                'email': data.mail[0].value,
            }
            setUserInfo(userData_update)

            localStorage.setItem('theUserData', JSON.stringify(userData_update) )
           
        })
        .catch((err)=>{
            console.log(err)
        })
        .finally(()=>{
            navigate('/')
        })
        }
    }



    useEffect(()=>{
        loadCurrentUserProfile()
    }, [loggedin])  

    

    if(isInitialized) {
        return(
            <></>
        )
    }

  return (
    <>
       <NavSing variant="sing"/>
       <Row className=''>
        <div className="col-lg-6 bg-color2 img-creat pos-ralativ">
          <img src="\public\part1-1.png " alt="" />
        </div>
        <div className="col-lg-6 flex-center">
          <h1 className='mt-5 ta-center'>Sign in to your account</h1>

                    <br />

                    

                    <form 
                        onSubmit={(e)=>{
                            e.preventDefault()
                            callAPI()
                        }}
                    >
                        <div className="padd-90">
                            <div className='mb-3 '>
                                <label className='mb-2' htmlFor="Username">User Name</label>
                            <input 
                            type="text"
                            placeholder='Username'
                            className='form-control'
                            id='Username'
                            onInput={(e)=>{

                                setLoginData(
                                    {
                                        ...loginData,
                                        'name': e.target.value
                                        
                                    }
                                )

                            }}
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='mb-2' htmlFor="password">Password</label>
                            <input 
                            type="password"
                            placeholder='******'
                            className='form-control'
                            id='password'
                            onInput={(e)=>{

                                setLoginData(
                                    {
                                        ...loginData,
                                        'pass': e.target.value
                                    }
                                )

                            }}
                            />
                        </div>
                        
                        {
                            error ? 
                            <div className='mb-3 alert alert-warning'>
                                {error}
                            </div>
                            :
                            ''
                        }
                        
                        
                        <div className='mb-3'>
                            <button className='col-3 offset-9 btn bg-navpar color-w mt-3'
                            disabled={loading || loginData.name.length < 3 || loginData.pass.length < 6 }
                            >
                                
                                {
                                    loading ?
                                    <i>Logging in...</i>
                                    :
                                    'Sign In'
                                }


                            </button>

                        </div>
                        {/* <Row>
                            <div className="col-4 mt-3"><LineButton/></div>
                            <div className="col-3 color-gray">Or Sign Up With</div>
                            <div className="col-5 mt-3"><LineButton/></div> 
                        </Row> */}
                        </div>
                    </form>
        </div>
       </Row>
    </>
  )
}

export default SingIn