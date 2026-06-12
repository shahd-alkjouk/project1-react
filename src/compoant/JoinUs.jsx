import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'

const JoinUs = () => {

    const [joinus,setJoinus] = useState([])

    useEffect (()=>{
    
            fetch(`\ApiJoinUs.json`, {
            
            })
                .then((res) => {
                    if (!res.ok) {
                        return res.json().then((serverError) => { throw new Error(serverError.message) })
                    } else {
                        return res.json()
                    }
    
                })
                .then((data) => {
                    setJoinus(data)
                    console.log(data)
                })
                .catch((err) => {
                    console.log(err)
                })
                .finally(() => {
                    console.log('Ended')
                })
    
        },[])

  return (
    <>
     <div className="bg-color4 padd-block-job pos-ralativ">
        <div className="offset-xl-7 offset-lg-6 offset-5 pos-ralativ "><img className='w-img-0' src="\bgJpb.png" alt="" /></div>
        <Container>
            <Row>

            <div className=' margin-abso-join row'>
                {
                joinus.map(item=>(
                    <div key={item.id} className=''>
                        {
                            item.title && item.body &&(
                                <div>
                                    <div className='title-join'>{item.title}</div>
                                <div className='mt-3 col-lg-6 col-9'>{item.body}</div>
                                </div>
                            )
                        }
                                
                    </div>
                ))
            }
                {
                joinus.slice(1,4).map(item=>(
                    <div key={item.id} className='col-lg-3 col-md-5 col-12 mt-3'>
                                    {
                                item.name && item.text && (
                                    <div className=" box-join">
                                        <img className='ta-center' src="\CheckCircle.png" alt="" />
                                        <div className='title-box-join'>{item.name}</div>
                                        <div className='mb-2 text-box-join mt-1'>{item.text}</div>
                                    </div>
                                )
                            }
                    </div>
                ))
            }
            </div>
            </Row>

        </Container>
     </div>
    </>
  )
}

export default JoinUs