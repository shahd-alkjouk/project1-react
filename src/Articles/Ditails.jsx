import React, { useContext, useEffect, useState } from 'react'
import { ApiConfig } from '../API/ApiConfig';
import { AuthContext } from '../Context/AuthContext';
import { NavLink, useNavigate, useParams } from 'react-router';
import Navparr from '../compoant/Navparr';
import Foter from '../compoant/Foter';
import { Container, Row } from 'react-bootstrap';

const Ditails = () => {

  const { id } = useParams()
  const navigate = useNavigate()
  const { userInfo } = useContext(AuthContext)

  const [error, setError] = useState(null)
  const [ditailsArtic, setDitailsArtic] = useState(null)
  const [isEdit, setIsEdit] = useState(false)

  const [body, setBody] = useState("")
  const [title,setTitle] = useState("")
  const [gallery, setGallery] = useState([202, 221])

  // ================= GET DETAILS =================
  useEffect(() => {
    fetch(`${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.ARTICLES_DITAILS}/${id}?_format=json`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${userInfo.ps}`
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
        setDitailsArtic(data)
        setBody(data?.body?.[0]?.value)
        setTitle(data?.title?.[0]?.value)
      })
      .catch((err) => {
        console.log(err)
        setError(err.message)
      })
      .finally(() => {
        console.log('Ended')
      })
  }, [id])

  // ================= DELETE =================
  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this article?")) return

    fetch(`${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.DELETE_ARTICLES}/${id}?_format=json`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${userInfo.ps}`
      }
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((serverError) => { throw new Error(serverError.message) })
        }
      })
      .then(() => {
        navigate("/Articles")
      })
      .catch(err => {
        console.log(err)
        setError(err.message)
      })
  }

  // ================= UPDATE (PATCH) =================
  const handleUpdate = () => {

    const dataBody = {
        "type": [{
    "target_id": "blog"
  }],
  "title": [{
    "value": title
  }],
  "body": [{
    "value": body,
    "format": "full_html"
  }]
}

    fetch(`${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.ARTICLES_UPDAIT}/${id}?_format=json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${userInfo.ps}`,
        "X-CSRF-Token": userInfo.csrf_token
      },
      body: JSON.stringify(dataBody)
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((serverError) => { throw new Error(serverError.message) })
        } else {
          return res.json()
        }
      })
      .then((data) => {
        setDitailsArtic(data)
        setIsEdit(false)
      })
      .catch((err) => {
        console.log(err)
        setError(err.message)
      })
      .finally(() => {
        console.log("Ended")
      })
  }

  return (
    <>
      <div className="bg-color4">
        <Navparr />
        <Container>
          <Row className='mt-3 mb-5'>

            <div className="col-10">

              <h2>{ditailsArtic?.title?.[0]?.value}</h2>

              <img
                className='h-500 mt-4 mb-4'
                src={ditailsArtic?.field_image?.[0]?.url}
                alt=""
              />

              {!isEdit ? (
                <div
                  className='mt-2 mb-3 title-p2'

dangerouslySetInnerHTML={{ __html: ditailsArtic?.body?.[0]?.value }}
                />
              ) : (
                <div>

                    <input className='form-control mb-3' value={title} onChange={(e)=> setTitle(e.target.value)}/>

                    <textarea
                  className="form-control mb-3"
                  rows="8"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
                </div>
              )}

              <div className='creat'>
                <span className='title-p2'>The article was created in : </span>
                {ditailsArtic?.created?.[0]?.value}.
              </div>

              <div className='mb-2 mt-2 title-p2'>More pictures:</div>
                <div className="d-flex">
                    {
                    ditailsArtic?.field_gallery?.map(img=>(
                        <div key={img.id}>
                            <img className='w-300' src={img?.url} alt="" />
                        </div>
                    ))
                }
                </div>

              {/* ===== ACTION BUTTONS ===== */}
              <div className="d-flex gap-3 mt-4 ">

                {!isEdit ? (
                  <div className="col-3">
                    <button className="btn ptn3 " onClick={() => setIsEdit(true)}>
                    Edit Article
                  </button>
                  </div>
                ) : (
                  <div className="col-3">
                    <button className="btn ptn3" onClick={handleUpdate}>
                    Save Changes
                  </button>
                  </div>
                )}

                <div className="col-3">
                    <button className="btn ptn1" onClick={handleDelete}>
                  Delete Article
                </button>
                </div>

              </div>

            </div>

            <div className='col-2'>
              <NavLink to="/Articles" className="d-flex">
                back to articles list <img src="\ArrowRight.png" alt="" />
              </NavLink>
            </div>

          </Row>
        </Container>

        <Foter />
      </div>
    </>
  )
}

export default Ditails