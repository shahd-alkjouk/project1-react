import React from 'react'
import { NavLink } from 'react-router'

const Link = ({linkat,variant}) => {
  return (
    <>
      <NavLink to="#" className={variant==="title-link"?"title-link" : variant==="text-link" ? "text-link":""}>{linkat}</NavLink>
    </>
  )
}

export default Link