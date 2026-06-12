import React, { useContext, useEffect, useState } from 'react'
import { ApiConfig } from '../API/ApiConfig'
import { AuthContext } from '../Context/AuthContext'
import Navparr from '../compoant/Navparr'
import Foter from '../compoant/Foter'
import { Container, Row } from 'react-bootstrap'
import { NavLink } from 'react-router'

const Dashboard = () => {

  const { userInfo } = useContext(AuthContext)

  const [users, setUsers] = useState([])
  const [articles, setArticles] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.USER_LIST}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${userInfo.ps}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(serverError => { throw new Error(serverError.message) })
        }
        return res.json()
      })
      .then(data =>{
         setUsers(data.rows)
      }
    )
      .catch(err => setError(err.message))
  }, [])

  useEffect(() => {
    fetch(`${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.BLOG_LIST}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${userInfo.ps}`
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(serverError => { throw new Error(serverError.message) })
        }
        return res.json()
      })
      .then(data => {
        setArticles(data.rows)
      })
      .catch(err => setError(err.message))
  }, [])

  return (
    <>
      <div className="bg-color4">
        <Navparr />

        <Container>
          <Row className="mt-4 mb-5">
            <h2 className="mb-4">Admin Dashboard</h2>

            {error && <div className="text-danger mb-3">{error}</div>}

            <h4 className="mb-3">Users</h4>
            <table className="table table-bordered mb-5">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Gender</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.uid}>
                    <td>{user.uid}</td>
                    <td>{user.name}</td>
                    <td>{user.field_mobile}</td>
                    <td>{user.mail}</td>
                    <td>{user.field_gender}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h4 className="mb-3">Articles</h4>
            <table className="table table-bordered mb-5">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Tags</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map(article => (
                  <tr key={article.id}>
                    <td>{article.id}</td>
                    <td>{article.title}</td>
                    <td>{article.author}</td>
                    <td>{article.field_tags.join(", ")}</td>
                    <td>
                      <NavLink
                        to={`/DitailsArticles/${article.id}`}
                        className="btn ptn1 btn-sm me-2"
                      >
                        View
                      </NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </Row>
        </Container>

        <Foter />
      </div>
    </>
  )
}

export default Dashboard