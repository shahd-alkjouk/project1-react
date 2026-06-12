import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { ApiConfig } from '../API/ApiConfig'
import Buttons from './Buttons'
import MapImage from './MapImg'

const FormContact = () => {

    const [findUse,setFindUse] = useState([]) 
    const [idFindUS,setIdFindUS] = useState(null)
    const [error, setError] = useState()

    useEffect (()=>{
        fetch(`${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.FIND}`, { 
                    method: 'GET',
                    headers: {
                        'AUTHORIZATION':`apiKey`,
                        'Content-Type': 'application/json'
                    },
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
        
                        setFindUse(data)
                    })
                    .catch((err) => {
                        console.log(err)
                        setError( err.message ) 
                    })
                    .finally(() => {
                        console.log('Ended')
                    })
        
    },[])

  return (
    <>
       <Container>
        <Row>
            <div className="col-lg-6 col-12 mb-5">
                <h1 className='mt-4 mb-4'>Contact</h1>
                <form action="">
                        <div className="row">
                            <div className="col-6 ">
                                    {/* <label htmlFor="firstName">Full Name</label> */}
                                    <input type="text"
                                    placeholder='First Name *'
                                    className='form-control'
                                     />
                                </div>

                               <div className='col-6'>
                                <input
                                    type="text"
                                    placeholder='Last Name *'
                                    className='form-control'
                                />
                            </div>  
                            <div>
                                <input
                                    type="email"
                                    placeholder='Email'
                                    className='form-control mb-4 mt-4'
                            />
                            <input
                                    type="text"
                                    placeholder='Subject *'
                                    className='form-control mb-4'
                            />
                            
                            <select
                                        className='form-select mb-4'
                                        value={idFindUS}
                                            onChange={(e)=>{
                                                setIdFindUS(e.target.value)
                                                
                                            }}
                                    >
                                        <option value="" hidden>How did you find us?</option>
                                        {
                                            findUse.map(items=>(
                                                <option key={items.id} value={items.id}>
                                                    {items.name}
                                                </option>
                                            ))
                                        }
                                    </select>

                                    <input
                                    type="text"
                                    placeholder='Messege '
                                    className='form-control mb-4 padd-bottom'
                            />

                            <Buttons variant="type1" button1="SEND"/>
                            </div>
                            
                        </div>
                </form>
            </div>
            <div className="col-lg-6 mb-5 mt-4">
                <MapImage imageSrc="\mapimg.png" />
            </div>
        </Row>
       </Container>
    </>
  )
}

export default FormContact
