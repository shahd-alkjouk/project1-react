import React from 'react'
import { ApiCompany } from '../API/ApiCompany'
import { Container } from 'react-bootstrap'

const Company = () => {
  return (
    <>
      <div className='row jc-between p-relative bg-color4'> 
              {ApiCompany.map((comp)=>(
                <div key={comp.id} className=' box-comp ' >
                    
                        <img className='img-comp' src={comp.image} alt="" />
                    
                </div>
              ))}
            </div> 
    </>
  )
}

export default Company