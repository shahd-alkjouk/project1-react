import React from 'react'
import Swiperr from '../compoant/Swiperr'
import TitleParts from '../compoant/TitleParts'
import Foter from '../compoant/Foter'
import Navparr from '../compoant/Navparr'
import { Container, Row } from 'react-bootstrap'
import ListApiPart2 from '../compoant/ListApiPart2'
import Company from '../compoant/Company'
import JobOpprtunities from '../compoant/JobOpprtunities'
import TitlePages from '../compoant/TitlePages'
import Swiper2 from '../compoant/Swiper2'
import Articles1 from '../Articles/Articles1'

const HomePage = () => {
  return (
    <>
      <Navparr variant="lang"/>

      <Swiperr variant="type1"/>

      <div className='mt-5'>
        <TitleParts title="Browse Our Articles Categories" text="We have more category & subcategory."/>
      </div>

      <Container>
          <ListApiPart2/>
      </Container>

    <Articles1/>

      <div className=' mb-4'>
        <TitleParts title="Browse Our Articles Categories" text="We have more category & subcategory."/>
      </div>
      <Swiper2/>

      <div className='pos-absolute'><TitlePages variant="type2" title="Latest Articles"/></div>
      <JobOpprtunities/>
      <div className="ta-center mt-5 mb-5 faq">Our Partners</div>

      <div className="bg-color4 padding-left-7">
         <Company/>

      </div>

      <Foter/>
    </>
  )
}

export default HomePage