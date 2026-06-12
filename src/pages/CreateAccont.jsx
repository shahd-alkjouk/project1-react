import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { useNavigate } from 'react-router' 
import { Button, Container, Modal, Row} from 'react-bootstrap'
import LineButton from '../compoant/LineButton'
import Buttons from '../compoant/Buttons'
import NavSing from '../compoant/NavSing'
import { ApiConfig } from '../API/ApiConfig'

const CreateAccont = () => {

    const {userInfo, isInitialized} = useContext(AuthContext) 
    const navigate = useNavigate()

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    useEffect(()=>{
        if(userInfo) {
            navigate('/')
        }
        
    }, [userInfo]) 



    

    const [registerData,setRegisterData] = useState(
        {
            "name": {
                "value": ""
            },
            "field_name": {
                "value": ""
            },
            "field_surname": {
                "value": ""
            },
            "mail": {
                "value": ""
            },
            "field_mobile": {
                "value": ""
            },
            "field_gender": {
                "target_id": 9
            },
            "field_how_did_you_find_us": [ ],
            "pass": {
                "value": ""
            }
        }
    )

    const [error, setError] = useState()

    const [isLoading, setIsLoading] = useState(false)

    const [registerSuccess, setRegisterSuccess] = useState()

    const [showHide, setShowHide] = useState({
        "pass": 'password',
        "confirm" : 'password'
    })

    const [passValue, setPassValue] = useState({
        "pass": '',
        "confirm" : ''
    })


    
   
    const callAPI = () => {
         setError(null)

        setIsLoading(true)

        fetch(`${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.REGISTRATION}?_format=json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((serverError) => { throw new Error(serverError.message) })
                } else {
                    return res.json()
                }

            })
            .then((data) => {
                console.log(data)

                setRegisterSuccess(data.name[0].value)
            })
            .catch((err) => {
                console.log(err)
                setError( err.message ) 
            })
            .finally(() => {
                console.log('Ended')

                setIsLoading(false)
            })


    }

    if(isInitialized) {
        return (
            <></>
        )
    }

    if(registerSuccess) {
        return (
            <>
            <Container>
                <h1>Hello {registerSuccess}</h1>
                <h3>check your registered email for activation</h3>
            </Container>
           </>
        )
    }


    
  return (
    <>
      <NavSing variant="create"/>
            
            <Row>
                <div className="col-lg-6 bg-color2 img-creat pos-ralativ">
                    <img src="\public\part1-1.png " alt="" />
                </div>
                <div className="col-lg-6">
                    <h1 className='mt-5 mb-4 ta-center'>Create Your Account</h1>

                        {
                        error ?
                        <div className='alert alert-warning'>{error}</div>
                        :
                        ''
                        }
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                callAPI()
                            }}
                        >
                            

                            <Row className='padd-90'>


                                <div className="col-6">
                                    {/* <label htmlFor="firstName">Full Name</label> */}
                                    <input type="text"
                                    placeholder='First Name'
                                    className='form-control'
                                    required
                                    id='firstName'
                                    onInput={(e) => {

                                        setRegisterData(
                                            {
                                                ...registerData,
                                                "field_name": {
                                                    "value": e.target.value
                                                }
                                            }
                                        )

                                    }} />
                                </div>

                               <div className='col-6'>
                                <input
                                    type="text"
                                    placeholder='Last Name'
                                    className='form-control'
                                    required

                                    onInput={(e) => {
                                        setRegisterData(
                                            {
                                                ...registerData,
                                                "field_surname": {
                                                    "value": e.target.value
                                                }
                                            }
                                        )
                                    }}
                                />
                            </div>  

                            <div className='mt-3'>
                                <label htmlFor="mobile" className='mb-2'>Mobile</label>
                                <input
                                    type="text"
                                    placeholder='ex: 0955 000 000'
                                    className='form-control'

                                    onInput={(e) => {
                                        setRegisterData(
                                            {
                                                ...registerData,
                                                "field_mobile": {
                                                    "value": e.target.value
                                                }
                                            }
                                        )
                                    }}
                                />
                            </div>

                            <div className=' mt-3'>
                                <label htmlFor="Username" className='mb-2'>Username</label>
                                <input
                                    type="text"
                                    placeholder='Username..'
                                    className='form-control'
                                    required
                                    id='Username'
                                    onInput={(e) => {
                                        setRegisterData(
                                            {
                                                ...registerData,
                                                "name": {
                                                    "value": e.target.value
                                                }
                                            }
                                        )
                                    }}
                                />
                            </div>  

                            <div className='mt-3'>
                                <label htmlFor="email" className='mb-2'>Email</label>
                                <input
                                    type="email"
                                    placeholder='example@email.com'
                                    className='form-control'
                                    id='email'
                                    required

                                    onInput={(e) => {
                                        setRegisterData(
                                            {
                                                ...registerData,
                                                "mail": {
                                                    "value": e.target.value
                                                }
                                            }
                                        )
                                    }}
                                />
                            </div>


                            <div className='mb-3'>
                                <select
                                    id="gender"
                                    className='form-select'
                                    onChange={(e) => {
                                        setRegisterData(
                                            {
                                                ...registerData,
                                                "field_gender": {
                                                    "target_id": e.target.value
                                                }
                                            }
                                        )
                                    }}
                                >
                                    <option value="9">Male</option>
                                    <option value="10">Female</option>
                                </select>
                            </div>


                            <div className='mt-3 position-relative col-6'>
                                <label htmlFor="Password" className='mb-2'>Password</label>
                                <input
                                    type={showHide.pass}
                                    placeholder='Password'
                                    className='form-control'
                                    id='Password'
                                    required

                                    onInput={(e) => {
                                        setRegisterData(
                                            {
                                                ...registerData,
                                                "pass": {
                                                    "value": e.target.value
                                                }
                                            }
                                        )

                                        setPassValue({
                                            ...passValue,
                                            'pass': e.target.value
                                        })
                                    }}
                                />

                                <button className='position-absolute top-0 end-0 border-0' type='button' onClick={
                                    ()=>{
                                        setShowHide( 
                                            {
                                                ...showHide,
                                                'pass': showHide.pass == 'password' ? 'text' : 'password'
                                            }
                                        )
                                    }}>

                                   
                                    
                                    

                                </button>
                            </div>

                            <div className='mt-3 position-relative col-6'>
                                <label htmlFor="Confirm" className='mb-2'>Confirm Password</label>
                                <input
                                    type={showHide.confirm}
                                    placeholder='Confirm Password'
                                    className='form-control'
                                    id='Confirm'
                                    required

                                    onInput={(e) => {
                                        setPassValue({
                                            ...passValue,
                                            'confirm': e.target.value
                                        })
                                    }}
                                />

                                <button className='position-absolute top-0 end-0 border-0' type='button' onClick={
                                    ()=>{
                                        setShowHide( 

                                            {
                                                ...showHide,
                                                'confirm': showHide.confirm == 'password' ? 'text' : 'password'
                                            }
                                        )
                                    }}>

                                    
                                    
                                    

                                </button>
                            </div>

                            { 
                                passValue.confirm
                                ?
                                
                                    passValue.confirm !== passValue.pass
                                    ?
                                    'كلمة المرور غير متطابقة'
                                    :
                                    "كلمة المرور متطابقة"
                                
                                :

                                ''

                            }

                            <div className="mt-4">
                                <LineButton/>
                            </div>

                            <div className='mb-3 mt-3 col-4 offset-8'>
                                <button className='w-100 btn btn-secondary' 
                                disabled={isLoading || registerData.name.value.length < 4}
                                >
                                    {
                                        isLoading ?

                                        <i>Creating in progress</i>

                                        :

                                        'Create new user'
                                    }
                                </button>
                            </div>

                            {/* <div className="col-4 mt-3"><LineButton/></div>
                            <div className="col-3 color-gray">Or Sign Up With</div>
                            <div className="col-5 mt-3"><LineButton/></div> */}

                            </Row>

                            
                        </form>

                </div>
            </Row>
    </>
  )
}

export default CreateAccont