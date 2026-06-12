import React, { useContext, useEffect, useState } from 'react'
import Navparr from '../compoant/Navparr'
import Foter from '../compoant/Foter'
import { NavLink } from 'react-router'
import Buttons from '../compoant/Buttons'
import { Container, Row } from 'react-bootstrap'
import { ApiConfig } from '../API/ApiConfig'
import { AuthContext } from '../Context/AuthContext'
import { Fancybox } from '@fancyapps/ui'
import LineButton from '../compoant/LineButton'
import Aos from 'aos'
import "aos/dist/aos.css"

const ArticlesPage = () => {

  const { userInfo } = useContext(AuthContext)

  const [tags, setTags] = useState([])
  const [articleList, setArticleList] = useState([])
  const [error, setError] = useState(null)

  // filters
  const [selectedTag, setSelectedTag] = useState("all")
  const [search, setSearch] = useState("")

  useEffect(() => {
    Aos.init({ duration: 800 })
  }, [])

  useEffect(() => {
    Fancybox.bind("[data-fancybox]", {})
    return () => Fancybox.destroy()
  }, [])

  useEffect(() => {
    fetch(`${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.ARTICLES_LIST}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${userInfo.ps}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setArticleList(data.rows)
        console.log('Articles:', data.rows)
      })
      .catch(err => setError(err.message))
  }, [])

  
  useEffect(() => {
    fetch(`${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.TAGS}`, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        setTags(data)
        console.log('Tags:', data)
      })
  }, [])


  const filteredArticles = articleList.filter(art => {

    const matchTag = selectedTag ==="all"
    ?true
      : art.field_tags.includes(selectedTag)
       

    const matchSearch = search
      ? art.title.toLowerCase().includes(search.toLowerCase())
      : true

    return  matchTag && matchSearch
  })


  return (
    <>
      <div className="bg-color4">
        <Navparr />

        <h1 className='ta-center mt-4 mb-5'>Articles List</h1>

        <Container>
          <Row className='jc-between'>

            <div className="col-lg-3 col-md-4">

              <input
                type="text"
                placeholder="Search articles..."
                className="form-control mb-4"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              
              <div className="mb-4">
                   <h5 className='mb-3'>Tags</h5>
                
                   <div
                     className={`${selectedTag === "all" ? "bg-color1 active-cat cat-faq" : "cat-faq"}`}
                     onClick={() => setSelectedTag("all")}
                   >
                     All
                   </div>
                
                   {tags.map(tag => (
                     <div
                       key={tag.id}
                       className={`${selectedTag === tag.name ? "bg-color1 active-cat cat-faq" : "cat-faq"}`}
                       onClick={() => setSelectedTag(tag.name)}
                     >
                       {tag.name}
                     </div>
                   ))}
               </div>

                  <div className="mb-5">
                    <NavLink to="/AddArticles" >
                      <Buttons variant="type1" button1="Add Articles" />
                    </NavLink>
                  </div>

            </div>

            <div className="col-lg-8 col-md-7">
              <div className="row jc-between g-4 margin-block-art" data-aos="fade-right">
                {
                  filteredArticles.map(art => (
                    <div key={art.id} className=' box-articles2 row'>
                      <a
                        data-fancybox="gallery"
                        data-caption="Articles"
                        href={"https://tamkeen-dev.com" + art.field_image}
                      >
                        <img
                          className='img-hover img-art3'
                          src={"https://tamkeen-dev.com" + art.field_image}
                          alt="Articles"
                        />
                      </a>

                      <div className="art_type ta-center mt-3 mb-3">
                        {art.field_tags.join(",")}
                      </div>

                      <div className='title-art mb-3'>
                        {art.title}
                      </div>

                      <LineButton />

                      <div className="d-flex mt-2 jc-between">
                        <div className=''>
                        {art.author}
                      </div>
                      <NavLink to={`/DitailsArticles/${art.id}`} className="color-b">Viwe Ditails</NavLink> 
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>

          </Row>

          

        </Container>

        <Foter />
      </div>
    </>
  )
}

export default ArticlesPage