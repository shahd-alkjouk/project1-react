import React from 'react'
import { Container, Row } from 'react-bootstrap'
import Buttons from './Buttons'
import { NavLink } from 'react-router'

const NavSing = ({variant}) => {
  return (
    <>
     <div className="bg-navpar">
        <Container>
            <Row>
                <div className="col-6 mt-1 mb-1">
                    <img src="\public\logo (3).png" alt="" />
                </div>
                <div className="col-4 ta-end color-w mt-4">Already have an account ?</div>
                {
                  variant==="create" ? (
                    <div className="col-2 mt-3 "><NavLink to="/Sing"><Buttons variant='type1' button1='Sing In'/></NavLink></div>
                  ):variant==="sing"?(
                    <div className="col-2 mt-3 "><NavLink to="/"><Buttons variant='type1' button1='back to home'/></NavLink></div>
                  ):""
                }
            </Row>
        </Container>
      </div>
    </>
  )
}

export default NavSing