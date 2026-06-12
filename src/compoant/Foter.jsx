import React from 'react'
import { Container, Row } from 'react-bootstrap'
import Link from './Link'
import { NavLink } from 'react-router'
import { FaSquareFacebook } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { IconContext } from 'react-icons';

const Foter = () => {
  return (
    <>
    <div className="bg-foter">
        <Container>
        <Row>
            <div className="col-lg-3">
                <img src="\public\logo (3).png" alt="" />
                <div className="text-foter mt-3 mb-3">Aliquam rhoncus ligula est, non pulvinar elit convallis nec. Donec mattis odio at.</div>
                 
                 <IconContext value={{size:"22px",color:"#fff"}} >
                    <a  className='m-i-10' href="https://www.facebook.com/Tamkeen.develloper" target='_blank' rel='noopener noreferrer'><FaSquareFacebook/></a>
                    <a className='m-i-10' href="https://t.me/c/2365627952/1" target='_blank' rel='noopener noreferrer'><FaTelegramPlane/></a>
                    <a className='m-i-10' href="https://www.linkedin.com/company/tamkeen-dev" target='_blank' rel='noopener noreferrer'><FaLinkedinIn/></a>
                    <a className='m-i-10' href="https://www.instagram.com/tamkeen.dev?igsh=M2FlZ3A2NXFrZWJu" target='_blank' rel='noopener noreferrer'><FaInstagram/></a>
                 </IconContext>
            </div>
            <div className="col-lg-2 flex-foter">
                <Link variant="title-link" linkat="Top 4 Category"/>
                <Link variant="text-link" linkat="Development"/>
                <Link variant="text-link" linkat="Finance & Accounting"/>
                <Link variant="text-link" linkat="Design"/>
                <Link variant="text-link" linkat="Business"/>
            </div>
            <div className="col-lg-2  flex-foter">
                <Link variant="title-link" linkat="Quick Links"/>
                <Link variant="text-link" linkat="Development"/>
                <Link variant="text-link" linkat="Finance & Accounting"/>
                <Link variant="text-link" linkat="Design"/>
                <Link variant="text-link" linkat="Business"/>
            </div>
            <div className="col-lg-2 flex-foter">
                <Link variant="title-link" linkat="Support"/>
                <Link variant="text-link" linkat="Development"/>
                <Link variant="text-link" linkat="Finance & Accounting"/>
                <NavLink className="text-link" to="/FAQ">FAQs</NavLink>
                <Link variant="text-link" linkat="Business"/>
            </div>
            <div className="col-3">
                <Link variant="title-link" linkat="Downlaod our app"/>
                <a  href="https://play.google.com" target='_blank' rel='noopener noreferrer'><img className='mb-1 mt-3' src="\img1-footer.png" alt="" /></a>
                <a  href="https://www.apple.com" target='_blank' rel='noopener noreferrer'><img className='mt-2' src="\img2-footer.png" alt="" /></a>
            </div>
        </Row>
    </Container>
    </div>
    <div className="color-5 ta-center">© 2025 - All rights reserved</div>
    </>
  )
}

export default Foter