import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { ApiConfig } from '../API/ApiConfig'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import Navparr from '../compoant/Navparr'
import LineButton from '../compoant/LineButton'
import ImgProfile from '../compoant/ImgProfile'
import Logout from '../compoant/Logout'
import { NavLink, useNavigate } from 'react-router'
import EditUser from '../compoant/EditUser'

const Profile = () => {

    const { userInfo,setUserInfo,setIsInitialized,setPicture,picture } = useContext(AuthContext)



    const [profile, setProfile] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true) 
    const navigate = useNavigate() 

    const [show,setShow]= useState(false)

   const domain_name = 'https://tamkeen-dev.com'
   const bannerImageAPI = 'https://tamkeen-dev.com/api/file/upload/node/blog/field_image?_format=json'
   const sessionCSRF = 'https://tamkeen-dev.com/api/session/token'
   
   
     const [bannerImage, setBannerImage] = useState({})
     const [loading, setLoading] = useState(
           {
               'banner': false
           }
       )
   
     const credential = {
        user: `${userInfo?.username}`,
        pass: `${userInfo?.ps}` 
       }
   
    const auth = "Basic " + btoa(credential.user + ":" + credential.pass)  


    useEffect(() => {
        if (!userInfo) return  


        fetch(`${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.PROFILE}/${userInfo.user_id}?_format=json`, {
            method:'GET',
            headers: {
                "Authorization":`Basic ${userInfo.ps}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log("PROFILE DATA:", data)
            setProfile(data)
            setIsLoading(true)

        })
        .catch((err)=>{
        console.log(err)
        setError(err.message)
    })
    .finally(()=>{
        console.log("Ended")
        setIsLoading(false)
    })



    }, [userInfo])

    
    const uploadBannerImage = (e) => {
        setLoading({
            ...loading,
            banner: true
        })
        const file = e.target.files[0]

        fetch(sessionCSRF, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.text())
            .then(csrfToken => {
                // console.log(csrfToken)

                return fetch('https://tamkeen-dev.com/api/file/upload/user/user/user_picture?_format=json', {
     
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/octet-stream',
                        'X-CSRF-Token': csrfToken,
                        'Authorization': `Basic ${userInfo.ps}`,
                        'Content-Disposition': `file; filename="${file.name}"`
                    },
                    body: file

                })
                    .then(res => res.json())
                    .then(data => {
                        const imgURL=domain_name + data.uri[0].url
                        setBannerImage(
                            {
                                url: imgURL,
                                id: data.fid[0].value
                            }
                        )
                        setProfile({
                            ...profile,
                            "user_picture": [{
                                target_id : data.fid[0].value
                            }]
                        })
                        setPicture(imgURL)
                        localStorage.setItem('picture',imgURL)
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

    const deleteAccont = ()=>{
        
        setShow(false)

        fetch(sessionCSRF, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.text())
            .then(csrfToken => {
                // console.log(csrfToken)
                const idUser= userInfo.user_id

                fetch(`${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.DEDLETE_USER}/${idUser}?_format=json`, {
                    method:'DELETE',
                    headers: {
                        "Content-Type":"application/json",
                        'X-CSRF-Token': csrfToken,
                        "Authorization": auth
                    }
                })
                .then((res)=>{
                    if(!res.ok) {
                        return res.json().then((serverError)=>{
                            throw new Error(serverError.message)
                        })
                        
                        // throw new Error('Something went wrong')
                    }
                })
                .then(data => {
                    console.log( data)        
                })
                .catch((err)=>{
                console.log(err)
                setError(err.message)
                })

                .finally(()=>{
                    console.log("Ended")
                })


            })
            .catch((err) => {
                console.log(err.message)
            })
            .finally(() => {
                console.log()
            })


    }

    

    const handleFinalSubmit = (e) => {
        e.preventDefault()
        sendData()

    } 



    return (
        <>
        <Navparr/> 

        <div className="container mt-5 mb-5">

            {isLoading && <h4>Loading...</h4>}

            {profile && (
                <Row className="mt-4">

                    <div className="col-lg-4 col-10 offset-1  offset-lg-4 box-profile mb-5">
                        <div className="ta-center col-6 offset-3 mb-3 ">  

                            {

                                    bannerImage.url || picture
                                        ?
                                        <div className="mt-3 img-profile ">
                                            <img src={picture} alt="name" />
                                        </div>
                                        : <></>
                                }                                 
                            

                          <form onSubmit={handleFinalSubmit} >
                        
                            <Col sm={12} className='mt-4'>
                                
                                <input type="file"
                                    // accept='.png, .jpg'
                                    accept='image/png, image/jpeg'

                                    onChange={uploadBannerImage}
                                />
                                <div className='text-muted'>
                                    Allowed extensions .png, .jpeg
                                </div>
                                {
                                    loading.banner
                                        ? <i>Uploading image...</i>
                                        : <></>
                                }
                                


                            </Col>
                            
                    </form>


                                
                        </div>
                        
                        
                       
                       <h2 className='ta-center mb-3'>{profile.name?.[0]?.value}  </h2>
                        
                        <p><strong>Name:</strong> {profile.field_name?.[0]?.value}</p>
                        <p><strong>Surname:</strong>  {profile.field_surname?.[0]?.value}</p>
                        <p><strong>Email:</strong> {profile.mail?.[0]?.value}</p>
                        <p><strong>Mobile:</strong> {profile.field_mobile?.[0]?.value}</p>
                        <p><strong>Gender:</strong> {profile.field_gender?.[0]?.target_id || 'Not specified'}</p>
                        <LineButton/>

                        <div className=" jc-between row mt-3">
                                   
                                    <NavLink className="col-4 profile-button ta-start color-b" to="/edit">Edit Profile</NavLink>

                                   <div className=' d-flex col-7 jc-flexend'>
                                    <button className=' profile-button ta-end' type='button' onClick={()=>{
                                      setUserInfo(null)
                                      setPicture(null)
                                       setIsInitialized(null)
                                       localStorage.removeItem('theUserData')
                                        localStorage.removeItem('picture')
                                        navigate('/sing')
                                        
                                       }}
                                       > Logout</button> 
                                       <div className=''>/</div>   
                                       <button className=' profile-button ta-end' type='button' onClick={()=>setShow(true)}
                                       > Delete Accont</button> 

                                       {
                                        show && (
                                      
                                            <Modal
                                              show={show}
                                              onHide={()=> setShow(false)}
                                            >
                                              <Modal.Header closeButton>
                                                <Modal.Title>Delete Account</Modal.Title>
                                              </Modal.Header>
                                              <Modal.Body>
                                                Are you sure you want to delete the account?
                                              </Modal.Body>
                                              <Modal.Footer>
                                                <Button variant="secondary" onClick={()=> setShow(false)}>cancel</Button>
                                                <Button variant="primary" onClick={()=>{
                                                    deleteAccont()
                                                    setUserInfo(null)
                                      setPicture(null)
                                       setIsInitialized(null)
                                       localStorage.removeItem('theUserData')
                                        localStorage.removeItem('picture')
                                        navigate('/sing')}
                                                    }>yes</Button>
                                              </Modal.Footer>
                                            </Modal>
                                          )
                                         }
                                         
                                 </div>
                                   </div>
                        
                    </div>


                </Row>
            )}

        </div>
        </>
    )
}


export default Profile