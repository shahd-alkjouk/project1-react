import React from 'react'
import './App.css'
import './Responsive.css'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import CreateAccont from './pages/CreateAccont'
import SingIn from './pages/SingIn'
import Page404 from './pages/Page404'
import Profile from './pages/Profile'
import FAQ from './pages/FAQ'
import Jobs from './pages/Jobs'
import ArticlesPage from './pages/ArticlesPage'
import AddArticle from './Articles/AddArticle'
import EditUser from './compoant/EditUser'
import Ditails from './Articles/Ditails'
import PrivateRoute from './compoant/PrivateRoute'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path="/aboutUs" element={<PrivateRoute> <AboutUs/> </PrivateRoute>} />
        <Route path="/contactUs" element={<PrivateRoute> <ContactUs/></PrivateRoute>} />
        <Route path="/Articles" element={<PrivateRoute> <ArticlesPage/> </PrivateRoute>} />
        <Route path="/AddArticles" element={<PrivateRoute><AddArticle/></PrivateRoute>} />
        <Route path="/DitailsArticles/:id" element={<PrivateRoute><Ditails/></PrivateRoute>} />
        <Route path="/Vacancies" element={<PrivateRoute><Jobs/></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
        <Route path="/edit" element={<PrivateRoute><EditUser/></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
        <Route path="/CreateAccont" element={<CreateAccont/>} />
        <Route path="/Sing" element={<SingIn/>} />
        <Route path="/FAQ" element={<PrivateRoute><FAQ/></PrivateRoute>} />
        <Route path="/*" element={<PrivateRoute><Page404/></PrivateRoute>} />
      </Routes>
    </>
  )
}

export default App