import React, { Activity, useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';
import { NavLink } from "react-router";
import Buttons from './Buttons';
import { GrLanguage } from "react-icons/gr";
import '../i18n';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../Context/AuthContext'
import DarkMode from './DarkMode';
import { LuListCollapse } from "react-icons/lu";
import { IconContext } from 'react-icons';


const Navparr = ({variant}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const {userInfo, isInitialized , picture} = useContext(AuthContext) 

    const { t, i18n } = useTranslation('common');
  
    const changeLanguage = () => {
      const currentLang = i18n.language;
      const newLang = currentLang === 'en' ? 'ar' : 'en';
      i18n.changeLanguage(newLang);

      document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
      document.documentElement.setAttribute('lang', newLang);
    };
    
  
  return (
    <>
        <Navbar expand="lg" className=" bg-navpar sticky-top">
      <Container>
          <Navbar.Brand className='col-3 col-lg-1' href="#"><img src="\public\logo (3).png" alt="" /></Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleShow} className='iconCollapse'/>
        <Offcanvas show={show} onHide={handleClose} responsive="lg" placement='end' className="col-5 ">
          <Offcanvas.Body className="me-auto jc-between ">
            
            <NavLink to="/" className={({ isActive }) =>
              `nav-link ${isActive ? " active" : ""}`
            }>Home</NavLink>
            
            {
              userInfo ? (
                <>
                  <NavLink to="/Articles" 
              className={({ isActive }) =>
                  `nav-link ${isActive ? " active" : ""}`
            }>Articles</NavLink>
            
            <NavLink to="/Vacancies" 
              className={({ isActive }) =>
                  `nav-link ${isActive ? " active" : ""}`
            }>Vacancies</NavLink>
            
            <NavLink to="/aboutUs" 
              className={({ isActive }) =>
                  `nav-link ${isActive ? " active" : ""}`
            }>About Us</NavLink>
            
            <NavLink to="/contactUs" 
              className={({ isActive }) =>
                  `nav-link ${isActive ? " active" : ""}`
            }>Contact Us</NavLink>

            <NavLink to="/dashboard" 
              className={({ isActive }) =>
                  `nav-link ${isActive ? " active" : ""}`
            }>Admain</NavLink>
                </>
              ) : (
                <>
                   <NavLink to="/" className="active-cat">Articles</NavLink>
            
            <NavLink to="/" 
              className="active-cat">Vacancies</NavLink>
            
            <NavLink to="/" 
              className="active-cat">About Us</NavLink>
            
            <NavLink to="/" 
              className="active-cat">Contact Us</NavLink>

              
                <div className='col-lg-8 col-10 row d-lg-none'>
                  <div className="col-12 mb-3 button-style"><NavLink  to="/Sing"><Buttons variant="type1" button1="SIgn In"/></NavLink></div>
                   <div className="col-12 button-style"> <NavLink to="/CreateAccont"><Buttons variant="type4" button1="Create Account"/></NavLink> </div>
                </div>
                
              

                </>
              )
            }

            
            
          </Offcanvas.Body>
        </Offcanvas>
        <div className="col-lg-5 col-7 row jc-flexend">


          {
            variant==="lang"?
            (<div className='col-lg-4 col-md-5 col-8 d-flex jc-flexend '>
                <button 
            className='lang col-6 '
              onClick={() => changeLanguage()}
              style={{ margin: '0 26px', padding: '4px 20px',color: '#fff' }}
            >
              <GrLanguage />

              {i18n.language === 'en' ? 'العربية' : 'english'}
            </button>

          <div className="col-6 icon-dark">
            <DarkMode/>
          </div>

              </div>) :""

          }

          


            {
              userInfo ? (


                <div className='col-4 ta-end '>
                   {
                    picture?
                    (
                      <div className="img-nav d-flex jc-flexend">
                          <img src={picture} alt="name" />
                          <NavLink  to="/profile" className="d-flex jc-flexend">
                           <div className='profile2'>{userInfo.username}</div>
                           </NavLink>
                      </div>
                    ):
                    <NavLink  to="/profile" className="d-flex jc-flexend">
                   <div className='profile1'>{userInfo.firstName[0]}{userInfo.lastName[0]}</div>
                   <div className='profile2'>{userInfo.username}</div>
                   </NavLink>

                   }
                </div>
              )
              : (
                <div className='col-lg-8 col-10 row d-lg-flex d-none'>
                  <div className="col-5 button-style"><NavLink  to="/Sing"><Buttons variant="type1" button1="SIgn In"/></NavLink></div>
                   <div className="col-7 button-style"> <NavLink to="/CreateAccont"><Buttons variant="type4" button1="Create Account"/></NavLink> </div>
                </div>
                
              ) 
            }

            
        </div>
      </Container>
    </Navbar>
    </>
  )
}

export default Navparr