import React, { useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import LineButton from './LineButton'
import Buttons from './Buttons'
import { NavLink } from 'react-router'
import Aos from 'aos'

const Type1Swiperr = ({title,text , variant,img , num_about,imgSize}) => {

    useEffect (()=>{
                Aos.init({
                  duration:900,
                },[])
              })
              
  return (
    <>
     <Container>
        <Row className='column-reverse' data-aos="zoom-out">
            
            <div className="col-lg-5 col-12 mb-3 flexp1">
                {variant==="about-page" ?
                    <div className="num-about mt-2 mb-2">{num_about}</div> : null
                }
                <h1 className='mb-3'>{title}</h1>
                <LineButton/>
                <div className='mt-4 size-21'>{text}</div> 

                {variant==="home-page"? 
                <Row className='jc-between mt-4'>
                    <div className="col-6 bottomstyle2"><Buttons variant="type1" button1="Start Reading"/></div>
                    <div className="col-6 bottomstyle2"><NavLink to="/CreateAccont"><Buttons variant="type2" button1="Create Account"/></NavLink></div>
                </Row>
                :null}

                {variant==="job-page" ?
                    <div className="col-6 bottomstyle2 mt-4"><Buttons variant="type3" button1="View Open Positions"/></div> : null
                }    
                
            </div>

            {
                imgSize==="img-job" ? (
                    <div className="col-lg-6 offset-lg-1 col-12 mt-5 mb-5">
                        <img src={img} alt="" />
                    </div>
                ): (
                    <div className="col-lg-7 col-12 mt-4 mb-4">
                        <img src={img} alt="" />
                    </div>
                )
            }
        </Row>
     </Container>
    </>
  )
}

export default Type1Swiperr