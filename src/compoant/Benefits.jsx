import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import TitleParts from './TitleParts'

const Benefits = () => {
    
    const [benef,setBenef] = useState([])
    
        useEffect (()=>{
        
                fetch(`\ApiBenefits.json`, {
                
                })
                    .then((res) => {
                        if (!res.ok) {
                            return res.json().then((serverError) => { throw new Error(serverError.message) })
                        } else {
                            return res.json()
                        }
        
                    })
                    .then((data) => {
                        setBenef(data)
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
        <div className="padd-block-40">
            <Container>
            <Row>
                <div className="mb-4"><TitleParts title="Our Perks & Benefits" text="we have more"/></div>

            <div className='jc-around row bg-img-benef'>
                {
                benef.map(item=>(
                    <div key={item.id} className='col-lg-2 col-5 flexp1 padd-15 ' >
                        
                        <img className='col-6 offset-3 ta-center' src={item.img} alt="" />
                        <div className=' ta-center title-bene'>{item.title}</div>
                        <div className='mt-3 ta-center text-bene'>{item.body}</div>
                                
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

export default Benefits