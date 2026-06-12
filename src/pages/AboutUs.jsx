import React from 'react'
import Navparr from '../compoant/Navparr'
import Foter from '../compoant/Foter'
import Company from '../compoant/Company'
import Swiperr from '../compoant/Swiperr'
import Testimonials from '../compoant/Testimonials'
import Part3About from '../compoant/Part3About'

const AboutUs = () => {
  return (
    <>
      <Navparr variant="not_registered"/>
      <Swiperr variant="type2"/>

      <div className="bg-color4 padding-left-7">
        <Company/>
      </div> 
      <Part3About/>

      <Testimonials/>

      <Foter/>
    </>
  )
}

export default AboutUs