import React from 'react'

const Type2Swiperr = ({text,title}) => {
  return (
    <>
    <div className="pos-ralativ">
        <div className="pos-absolute part1-about">
            <div className='titlepart1-about'>{title}</div>
            <div className='textpart1-about col-7'>{text}</div>
        </div>
        <img className='img-about' src="\contact-p1.png" alt="" />
    </div>
    </>
  )
}

export default Type2Swiperr