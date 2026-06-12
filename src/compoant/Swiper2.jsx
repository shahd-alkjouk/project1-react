import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { ApiArticles } from '../API/ApiArticles';
import { Fancybox } from '@fancyapps/ui' 
import LineButton from './LineButton';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"


const Swiper2 = () => {

    useEffect(()=>{
      Fancybox.bind("[data-fancybox]",{})
        return () =>{
          Fancybox.destroy()
        }
    },[])

  return (
    <div>
        <Container>
           <Swiper
              slidesPerView={3}
              centeredSlides
              className="mySwiper "
              initialSlide={1}
              breakpoints={{
                0:{
                  slidesPerView:1
                },
                768:{
                  slidesPerView:2
                },
                 992:{
                  slidesPerView:3
                 }
              }}
           >
            
            {
                ApiArticles.map((art)=>(
                            <SwiperSlide className='padd-block-40'>
                                <div key={art.id} className='box-swiper2'>
                                    <a data-fancybox="gallery" data-caption="Articles" href={art.imgWriters}>
                                      <img className='img-hover' src={art.imgWriters} alt="Articles" />
                                    </a>
                                    <div className="d-flex jc-center title-swiper2 mt-3 mb-3">
                                        <img className='icon-swiper2 mt-2' src={art.icon} alt="" />
                                        <div className="  ta-center mt-3 mb-3">{art.name}</div>
                                    </div>
                                    <div className='title-art mb-3 ta-center'>{art.title}</div>
                                    <LineButton/>
                                    <div className="d-flex jc-between mt-2">
                                      <div className="d-flex">
                                        <img className='img-swiper2' src="\Star.png" alt="" />
                                        {art.reviews}</div>
                                      <div className="">{art.artNum}</div>
                                    </div>
                                    
                                </div>
                            </SwiperSlide>
                        ))
            }
           </Swiper>
        </Container>
    </div>
  )
}

export default Swiper2