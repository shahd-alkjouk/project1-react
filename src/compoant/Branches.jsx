import React, { useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { ApiBranches } from '../API/ApiBranches'
import TitlePages from './TitlePages'
import { Fancybox } from '@fancyapps/ui'

const Branches = () => {

  useEffect(()=>{
            Fancybox.bind("[data-fancybox]",{})
              return () =>{
                Fancybox.destroy()
              }
          },[])
          
  return (
    <>
      <Container>
        <Row>
            <div className="jc-between g-4 row mb-4">
                {
                    ApiBranches.map((cart)=>(
                        <div key={cart.id} className='col-lg-4 col-8 offset-lg-0 offset-2 pos-ralativ news style5'>
                            <a data-fancybox="gallery" className='title' data-caption="Branches" href={cart.img}>
                              <img className='img-hover' src={cart.img} alt="Branches" />
                            </a>
                            <div className='pos-absolute desc'><TitlePages variant="type3" title={cart.city}/></div>
                            <div className='absolute-bran '>{cart.text}</div>
                        </div>
                    ))
                }
            </div>
        </Row>
      </Container>
    </>
  )
}

export default Branches