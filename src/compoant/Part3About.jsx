import React from 'react'
import { Container, Row } from 'react-bootstrap'

const Part3About = () => {
  return (
    <>
     <Container>
        <Row className='mt-5 mb-5'>
            <div className="col-lg-6 col-12">
                <img src="\part2About.png" alt="" />
            </div>
            <div className=" col-lg-6 col-12 mt-md-5 mb-md-4 mt-sm-5 mb-sm-4  flex-center">
              <div className='title-aboutp3 ta-end'>We’ve been here almost 15 years</div>
              <div className='text-aboutp3 ta-end'>Fusce lobortis leo augue, sit amet tristique nisi commodo in. Aliquam ac libero quis tellus venenatis imperdiet. Sed sed nunc libero. Curabitur in urna ligula.  torquent per conubia nostra.</div>
            </div>
        </Row>
     </Container>
    </>
  )
}

export default Part3About