import React from 'react'

const Buttons = ({button1,variant}) => {
  return (
    <>
     <button className={variant==="type1"?"btn ptn1 ta-center " : variant==="type2" ? "btn ptn2 ta-center":variant==="type3"?"btn ptn3 ta-center":variant==="type4"?"btn ptn4 ta-center":""}>{button1}</button>
    </>
  )
}

export default Buttons