import React from 'react'
import Navparr from '../compoant/Navparr'
import Foter from '../compoant/Foter'
import JobOpprtunities from '../compoant/JobOpprtunities'
import Swiperr from '../compoant/Swiperr'
import TitlePages from '../compoant/TitlePages'
import JoinUs from '../compoant/JoinUs'
import Benefits from '../compoant/Benefits'

const Jobs = () => {
  return (
   <>
     <Navparr/>
     <Swiperr variant="jobs"/>
     <JoinUs/>

     <Benefits/>

     <div className='pos-absolute'><TitlePages variant="type2" title="Our all open positions"/></div>
     <JobOpprtunities/>
     <Foter/>
   </>
  )
}

export default Jobs