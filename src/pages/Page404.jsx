import React from 'react'
import Navparr from '../compoant/Navparr'
import Buttons from '../compoant/Buttons'
import { NavLink } from 'react-router'
import { Container } from 'react-bootstrap'

const Page404 = () => {
  return (
    <>
      <Navparr/>
        <div className='flex-404 bg-color3'>
            <Container className='mt-4 mb-4'>
                <NavLink className='text-foter' to='/'>Home /</NavLink>
                <span >FAQs</span>
            </Container>
        </div>
      <img className='offset-4 col-4 mt-4' src="\OBJECTS.png" alt="" />
      <div className="offset-5 col-2 mt-4"><NavLink to="/"><Buttons variant='type1' button1='Go Back'/></NavLink></div>
    </>
  )
}

export default Page404