import React from 'react'
import { Container, Row } from 'react-bootstrap'

const TitleParts = ({title,text}) => {
  return (
    <>
      <Container>
        <Row>
           <div className="col-6 title-parts">{title} </div>
            <div className="col-6 ta-end text-parts">{text} <span> <button>Browse All<img src="public\ArrowRight.png" alt="" /></button></span></div>
        </Row>
      </Container>
    </>
  )
}

export default TitleParts