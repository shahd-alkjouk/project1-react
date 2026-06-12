import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FaBullseye } from 'react-icons/fa'
import Navparr from '../compoant/Navparr'
import Foter from '../compoant/Foter'
import { AuthContext } from '../Context/AuthContext'
import Buttons from '../compoant/Buttons'
import { NavLink } from 'react-router'

const AddArticle = () => {

    const {userInfo} = useContext(AuthContext) 
    const domain_name = 'https://tamkeen-dev.com'
    const sessionCSRF = 'https://tamkeen-dev.com/api/session/token'
    const articleCreateAPI = 'https://tamkeen-dev.com/api/node?_format=json'
    const categoryAPI = 'https://tamkeen-dev.com/api/terms/category'
    const tagsAPI = 'https://tamkeen-dev.com/api/terms/tags'
    const bannerImageAPI = 'https://tamkeen-dev.com/api/file/upload/node/blog/field_image?_format=json'
    const galleryAPI = 'https://tamkeen-dev.com/api/file/upload/node/blog/field_gallery?_format=json'

   
    

   
    const [articleData, setArticleData] = useState(

        {
            "type": [{
                "target_id": "blog"
            }],
            "title": [{
                "value": ""
            }],
            "body": [{
                "value": "",
                "format": "basic_html"
            }],
            "field_image": [{
                "target_id": ""
            }],
            "field_gallery": [

            ],
            "field_tags": [],
            "field_category": [{
                "target_id": 0
            }]
        }
    )
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [bannerImage, setBannerImage] = useState({})
    const [galleryImages, setGalleryImages] = useState([])
    const [loading, setLoading] = useState(
        {
            'banner': false,
            'gallery': false,
        }
    )
    const [success, setSuccess] = useState(false)
    const [newArticle, setNewArticle] = useState({})

    //  const credential = {
    //     user: "tamkeen",
    //     pass: "123456"
    // }

    // const auth = "Basic " + btoa(credential.user + ":" + credential.pass)


    const getCategories = () => {
        fetch(categoryAPI, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then((data) => {
                setCategories(data)
            })
    }
    const getTags = () => {
        fetch(tagsAPI, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then((data) => {
                setTags(data)
            })
    }
    const uploadBannerImage = (e) => {
        setLoading({
            ...loading,
            banner: true
        })
        const file = e.target.files[0]

        fetch(sessionCSRF, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.text())
            .then(csrfToken => {
                // console.log(csrfToken)

                return fetch(bannerImageAPI, {
     
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/octet-stream',
                        'X-CSRF-Token': csrfToken,
                        'Authorization': `Basic ${userInfo.ps}`,
                        'Content-Disposition': `file; filename="${file.name}"`
                    },
                    body: file

                })
                    .then(res => res.json())
                    .then(data => {
                        setBannerImage(
                            {
                                url: domain_name + data.uri[0].url,
                                id: data.fid[0].value
                            }
                        )
                        setArticleData({
                            ...articleData,
                            "field_image": [{
                                "target_id": data.fid[0].value
                            }]
                        })
                    })
                    .catch((err) => { })
                    .finally(() => {
                        setLoading({
                            ...loading,
                            banner: false
                        })
                    })


            })
            .catch((err) => {
                console.log(err.message)
            })
            .finally(() => {
                console.log()
            })


    }
    const uploadGallery = (e) => {
        setLoading({
            ...loading,
            gallery: true
        })

        const selectedFiles = Array.from(e.target.files)
        fetch(sessionCSRF, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.text())
            .then(csrfToken => {
                // console.log(csrfToken)

                const promisedFiles = selectedFiles.map((file) => {
                    return fetch(galleryAPI, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/octet-stream',
                            'X-CSRF-Token': csrfToken,
                            'Authorization': `Basic ${userInfo.ps}`,
                            'Content-Disposition': `file; filename="${file.name}"`
                        },
                        body: file

                    })
                    .then(res => res.json())
                })

                return Promise.all(promisedFiles)
                      .then(data => {
                    const myUploadedFiles = data.map((item) => {
                        return {
                            url: domain_name + item.uri[0].url,
                            id: item.fid[0].value
                        }
                    })
                    setGalleryImages([
                        ...galleryImages,
                        ...myUploadedFiles
                    ])
                    const getImagesId = myUploadedFiles.map((imgId) => {
                        return { "target_id": imgId.id }
                    })
                    setArticleData({
                        ...articleData,
                        "field_gallery": [
                            ...articleData.field_gallery,
                            ...getImagesId
                        ],
                        
                    })
                })
                .catch((err)=>{
                    console.log(err.message)
                })
                .finally(()=>{
                    setLoading({
                        ...loading,
                        gallery: false
                    })
                })


            })
            .catch((err) => {
                console.log(err.message)
            })
            .finally(() => {
                console.log()
            })


    }
    const sendData = () => {
        fetch(sessionCSRF, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.text())
            .then(csrfToken => {
                // console.log(csrfToken)

                return fetch(articleCreateAPI, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-Token': csrfToken,
                        'Authorization': `Basic ${userInfo.ps}`
                    },
                    body: JSON.stringify(articleData)
                })
                    .then(res => res.json())
                    .then((data) => {
                        console.log(data)
                        setSuccess(true)
                        setNewArticle(
                            {
                                'id': data.nid[0].value,
                                'title': data.title[0].value
                            }
                        )
                    })
                    .catch((err2) => {
                        console.log(err2.message)
                    })
            })
            .catch((err) => {
                console.log(err.message)
            })
            .finally(() => {
                console.log()
            })

    }


    useEffect(() => {
        getCategories()
        getTags()
    }, [])
    const handleFinalSubmit = (e) => {
        e.preventDefault()
        sendData()

    }
    return (
        <>
         <Navparr/>

          <div className="bg-color4">

            <Container >
                <Row>
                {success
                ? <>
                    Your new article
                    <h4>{newArticle?.title}</h4>
                    has been saved successfully
                    <div className="col-3 offset-10 button-style"><NavLink to="/Articles"><Buttons variant="type1" button1="Viwe Articles List"/> </NavLink></div>
                  </>
                :
                <Col>
                    <h1 className='mb-4 mt-4'>Create new article</h1>
                    <form onSubmit={handleFinalSubmit} >
                        <Row>
                            <Col sm={12}>
                                <div>
                                    <label htmlFor="title">Article title</label>
                                </div>
                                <input className='form-control mt-2' type="text" id="title"
                                    onInput={(e) => {
                                        // console.log(e)
                                        setArticleData({
                                            ...articleData,
                                            "title": [{
                                                "value": e.target.value
                                            }],
                                        })
                                    }}
                                />
                            </Col>
                            <Col sm={12} className='mt-4'>
                                <input type="file"
                                    // accept='.png, .jpg'
                                    accept='image/png, image/jpeg'

                                    onChange={uploadBannerImage}
                                />
                                <div className='text-muted'>
                                    Allowed extensions .png, .jpeg
                                </div>
                                {
                                    loading.banner
                                        ? <i>Uploading image...</i>
                                        : <></>
                                }
                                {

                                    bannerImage.url
                                        ?
                                        <div className="mt-3">
                                            <img className='img-art' src={bannerImage.url} alt="name" />
                                        </div>
                                        : <></>
                                }


                            </Col>
                            <Col sm={12} className='mt-4'>
                                <div>
                                    <label htmlFor="body">Article Body</label>
                                </div>
                                <textarea className='form-control mt-2' id="body" onInput={(e) => {
                                    setArticleData({
                                        ...articleData,
                                        "body": [{
                                            "value": e.target.value,
                                            "format": "basic_html"
                                        }],
                                    })
                                }} />
                            </Col>
                            <Col sm={12} className='mt-4'>
                                <div>
                                    <label htmlFor="Category">Category</label>
                                </div>
                                <select id="Category" className='form-select mt-2' onChange={(e) => {
                                    setArticleData({
                                        ...articleData,
                                        "field_category": [{
                                            "target_id": e.target.value
                                        }]
                                    })
                                }} >
                                    {
                                        categories.map((cat) => (
                                            <option key={cat.id} value={cat.id} >
                                                {cat.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </Col>
                            <Col sm={12} className='mt-4'>
                                <div>
                                    <label >Tags</label>
                                </div>
                                {
                                    tags.map((tag) => (
                                        <div key={tag.id} className="form-check mt-2">
                                            <input type="checkbox" className="form-check-input" id={`tag--${tag.id}`} value={tag.id}
                                                onChange={(e) => {
                                                    // console.log(e)

                                                    e.target.checked
                                                        ? setArticleData({
                                                            ...articleData,
                                                            "field_tags": [
                                                                ...articleData.field_tags,
                                                                { "target_id": e.target.value }
                                                            ],
                                                        })
                                                        :
                                                        setArticleData({
                                                            ...articleData,
                                                            "field_tags": [
                                                                ...articleData.field_tags.filter(prev => prev.target_id != e.target.value)

                                                            ],
                                                        })

                                                }}
                                            />
                                            <label className='form-check-label' htmlFor={`tag--${tag.id}`}>{tag.name}</label>
                                        </div>
                                    ))
                                }
                            </Col>
                            <Col sm={12} className='mt-4'>
                                <div>
                                    <label htmlFor='uploadgallery' className='mb-2'>Upload Gallery</label>
                                </div>

                                <input id="uploadgallery" multiple type="file" accept='image/png, image/jpeg'
                                    onChange={uploadGallery}
                                />
                                <div className='text-muted'>
                                    Allowed extensions .png, .jpeg
                                </div>
                                {
                                    loading.gallery
                                    ? <i>Uploading images....</i>
                                    :<></>
                                }
                                <br />
                                <div className='d-flex'>
                                    {
                                        galleryImages?.map((galItem) => (
                                            <div key={galItem.id} className='mb-3' >
                                                <img className='img-art2' src={galItem.url} />
                                            </div>
                                        ))
                                    }
                                </div>
                            </Col>
                            <Col sm={2}>
                                <button className='btn ptn1 mb-3 '
                                disabled={loading.banner || loading.gallery}
                                >Submit</button>
                            </Col>
                        </Row>
                    </form>


                </Col>
                }
                
            </Row>
        </Container>
          </div>

         <Foter/>
        </>
    )
}

export default AddArticle