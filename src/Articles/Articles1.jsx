import React, { useContext, useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import LineButton from '../compoant/LineButton'
import TitlePages from '../compoant/TitlePages'
import Aos from 'aos'
import "aos/dist/aos.css"
import { ApiArticles } from '../API/ApiArticles'
import { Fancybox } from '@fancyapps/ui'
import { ApiConfig } from '../API/ApiConfig'
import { AuthContext } from '../Context/AuthContext'
import { NavLink } from 'react-router'

const Articles1 = ({variant}) => {

  const [articleList,setArticleList] = useState ([]) 
  const {userInfo} = useContext(AuthContext) 
  const [error, setError] = useState(null);

    useEffect (()=>{
        Aos.init({
          duration:800,
        },[])
      }) 

    useEffect(()=>{
      Fancybox.bind("[data-fancybox]",{})
        return () =>{
          Fancybox.destroy()
        }
    },[])

     const credential = {
        user: "userr3",
        pass: "111111"
    }

    const auth = "Basic " + btoa(credential.user + ":" + credential.pass)

    useEffect(()=>{
      fetch(`${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.ARTICLES_LIST}`, {
                    method:'GET',
                    headers: {
                        "Content-Type":"application/json",
                        "Authorization": auth
                    }
                })
                .then((res) => {
                if (!res.ok) {
                    return res.json().then((serverError) => { throw new Error(serverError.message) })
                } else {
                    return res.json()
                }

            })
            .then((data) => {
                setArticleList(data.rows)
                console.log(data)
            })
            .catch((err) => {
                console.log(err)
                setError( err.message ) 
            })
            .finally(() => {
                console.log('Ended')
            })
    },[])
  
  return ( 
    <>
                <div className='pos-absolute'><TitlePages variant="type1" title="Latest Articles"/></div> 

        <div className=" bg-color4 mt-3 mb-5">
            <Container>
                <Row>
                <div className="row jc-between g-4  margin-block-art" data-aos="fade-right">
                    {
                        articleList.slice(0,4).map(art=>(
                            <div key={art.id} className='col-3 box-articles row'>
                                <a data-fancybox="gallery" data-caption="Articles" href={"https://tamkeen-dev.com"+art.field_image}>
                                  <img className='img-hover img-art3' src={"https://tamkeen-dev.com"+art.field_image} alt="Articles" />
                                </a>
                                <div className="art_type col-6 ta-center mt-3 mb-3">{art.field_tags}</div>
                                <div className='title-art mb-3'>{art.title}</div>
                                <LineButton/>
                                <div className='col-8 mt-2'>{art.author}</div>
                            </div>
                        ))
                    }
                </div>
            </Row>
            </Container>
        </div>
     
    </>
  )
}

export default Articles1