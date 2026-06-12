import React from 'react'
import Navparr from '../compoant/Navparr'
import Foter from '../compoant/Foter'
import Swiperr from '../compoant/Swiperr'
import TitleParts from '../compoant/TitleParts'
import Branches from '../compoant/Branches'
import FormContact from '../compoant/FormContact'

const ContactUs = () => {
  return (
    <>
     <Navparr/>
     <Swiperr variant="contact-page"/>
     <div className='mt-5'>
        <TitleParts title="Browse Our Branches" text="We have more Branches to check out."/>
        <Branches/>
      </div>
      <FormContact/>
     <Foter/>
    </>
  )
}

export default ContactUs