import React, { useEffect } from 'react'
import { ApiPart2 } from '../API/ApiPart2'

const ListApiPart2 = () => { 

  

  return (
    <>
      <div className='row jc-between p-relative mb-lg-5'>
        {ApiPart2.map((cat)=>(
            <div key={cat.id} className='box-part2 mt-5'>
               <img className='img-p2 offset-3 col-6' src={cat.image} alt="" />
                    <div className="">
                        <div className='ta-center title-p2 mb-1'> {cat.title}</div>
                        <div className='ta-center text-p2'> {cat.description}</div>
                    </div>
                </div>
        ))}
      </div>
    </>
  )
}

export default ListApiPart2