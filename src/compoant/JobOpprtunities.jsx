import React, { useEffect } from 'react'
import TitlePages from './TitlePages'
import { Container, Row } from 'react-bootstrap'
import { ApiJobOpprtunities } from '../API/ApiJobOpprtunities'
import LineButton from './LineButton'
import { Fancybox } from '@fancyapps/ui'
import Aos from 'aos'

const JobOpprtunities = () => { 

    useEffect (()=>{
            Aos.init({
              duration:800,
            },[])
          }) 

    useEffect(()=>{
          Fancybox.bind("[data-fancybox]",{})
            return () =>{
              Fancybox.destroy()
            }
        },[])

  return (
    <>
     
        
        <div className=" bg-color4 mt-3">
            <Container>
                <Row>
                <div className="row jc-between g-4 mt-5 mb-5 " data-aos="fade-left">
                    {
                        ApiJobOpprtunities.map((job)=>(
                            <div key={job.id} className='col-lg-6 col-12 box-job row  mt-5 mb-3'>
                                
                                <a data-fancybox="gallery" data-caption="Articles" className='col-4 p-0' href={job.img}>
                                  <img className='img-hover' src={job.img} alt="Articles" />
                                </a>
                                <div className="col-8 mt-3">
                                    <div className="d-flex jc-between">
                                        <span className='box-green '>{job.Featured}</span>
                                        <div className='experience'>{job.Price}/ Month</div>
                                    </div>
                                    <div className='title-job mb-2 mt-1'>{job.title}</div>
                                    <div className='experience mb-4'>{job.experience}</div>
                                    <LineButton/>
                                    <div className="row mt-2 mb-1">
                                        <img className='col-1 p-7' src="\icon-partTime.png" alt="" />
                                        <div className='col-3 mt-2 p-0'>{job.FullTime}</div>
                                        <img className='col-1 p-7' src="\sinor.png" alt="" />
                                        <div className='col-3 mt-2 p-0'>{job.Sinor}</div>
                                        <img className='col-1 p-7' src="\Clock.png" alt="" />
                                        <div className='col-3 mt-2 p-0'>{job.PartTime}</div>
                                    </div>
                                    </div>
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

export default JobOpprtunities