import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Type1Swiperr from './Type1Swiperr';
import Type2Swiperr from './Type2Swiperr';

const Swiperr = ({variant}) => {
  return (
    <>
    <Carousel> 
      <Carousel.Item>
          {variant==="type1"? 
          <Type1Swiperr title="Articula – Your Gateway to Premium Articles" text="Discover high-quality articles written by experts and creators in various scientific and technical fields.
                    Join a community of readers and writers and explore exclusive, knowledge-driven content." variant="home-page" img="\public\part1-1.png"/>
                    : variant==="type2" ?
                    <Type1Swiperr title="We share knowledge with the world" text="Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent fermentum quam mauris. Fusce tempor et augue a aliquet. Donec non ipsum non risus egestas tincidunt at vitae nulla." img="\about-p1.png" variant="about-page" num_about="2011-2025"/> 
                    : variant==="contact-page"?
                    <Type2Swiperr title="Get In touch " text="want to get in touch ? we’d love to hear from you  heres how you can reach us ."/>
                    : variant==="jobs" ?
                    <Type1Swiperr title="Join the most incredible & creative team." text="Proin gravida enim augue, dapibus ultrices eros feugiat et. Pellentesque bibendum orci felis, sit amet efficitur felis lacinia ac. Mauris gravida justo ac nunc consectetur."  variant="job-page"  imgSize="img-job" img="\jobs.png"/> : null}                           
      </Carousel.Item>              
      <Carousel.Item>
          {variant==="type1"? 
          <Type1Swiperr title="Articula – Your Gateway to Premium Articles" text="Discover high-quality articles written by experts and creators in various scientific and technical fields.
                    Join a community of readers and writers and explore exclusive, knowledge-driven content." variant="home-page" img="\public\part1-1.png"/>
                    : variant==="type2" ?
                    <Type1Swiperr title="We share knowledge with the world" text="Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent fermentum quam mauris. Fusce tempor et augue a aliquet. Donec non ipsum non risus egestas tincidunt at vitae nulla." img="\about-p1.png" variant="about-page" num_about="2011-2025"/> 
                    : variant==="contact-page"?
                    <Type2Swiperr title="Get In touch " text="want to get in touch ? we’d love to hear from you  heres how you can reach us ."/>
                    : variant==="jobs" ?
                    <Type1Swiperr title="Join the most incredible & creative team." text="Proin gravida enim augue, dapibus ultrices eros feugiat et. Pellentesque bibendum orci felis, sit amet efficitur felis lacinia ac. Mauris gravida justo ac nunc consectetur."  variant="job-page"  imgSize="img-job" img="\jobs.png"/> : null}                           
      </Carousel.Item>         
      <Carousel.Item>
          {variant==="type1"? 
          <Type1Swiperr title="Articula – Your Gateway to Premium Articles" text="Discover high-quality articles written by experts and creators in various scientific and technical fields.
                    Join a community of readers and writers and explore exclusive, knowledge-driven content." variant="home-page" img="\public\part1-1.png"/>
                    : variant==="type2" ?
                    <Type1Swiperr title="We share knowledge with the world" text="Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent fermentum quam mauris. Fusce tempor et augue a aliquet. Donec non ipsum non risus egestas tincidunt at vitae nulla." img="\about-p1.png" variant="about-page" num_about="2011-2025"/> 
                    : variant==="contact-page"?
                    <Type2Swiperr title="Get In touch " text="want to get in touch ? we’d love to hear from you  heres how you can reach us ."/>
                    : variant==="jobs" ?
                    <Type1Swiperr title="Join the most incredible & creative team." text="Proin gravida enim augue, dapibus ultrices eros feugiat et. Pellentesque bibendum orci felis, sit amet efficitur felis lacinia ac. Mauris gravida justo ac nunc consectetur."  variant="job-page"  imgSize="img-job" img="\jobs.png"/> : null}                           
      </Carousel.Item>         
    </Carousel>
    
    </>
  )
}

export default Swiperr