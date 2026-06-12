import React, { useEffect, useState } from 'react'
import { ApiConfig } from '../API/ApiConfig'
import { Container, Row } from 'react-bootstrap'
import TitlePages from './TitlePages'

const Testimonials = () => {
    const [testimonials,setTestimonials] = useState([])
    const [error, setError] = useState(null)

    useEffect (()=>{

        fetch(`${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.TESTIOMONIALS}?_format=json`, {
            method: 'GET',
            headers: {
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
                setTestimonials(data)
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
    <div className='pos-absolute '><TitlePages variant="type1" title="Top Testimonials"/></div>
    <div className="bg-color4 mt-5 ">
        <Container>
            <Row>
                <div className="g-4 row jc-between ">
                    {
            testimonials.slice(4,7).map(card=>(
                <div key={card.id} className='box-testimonials col-lg-4 col-12 d-flex-2 '>
                    <img className='w-h-img mt-3' src="\double_quotes_r 1.png" alt="" />
                    <div className='box2-test'>{card.body}</div>
                    <div className="ta-end"><img className='w-h-img2 mt-3' src="\double_quotes_r 1.png" alt="" /></div>
                    <div className="bg-color1 border-botton testimon-name ta-center padd-blouk-30">{card.full_name}</div>
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

export default Testimonials