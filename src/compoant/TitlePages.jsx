import React from 'react'

const TitlePages = ({title,variant}) => {
  return (
    <>
      <div className={variant==="type1"?"margin-title-page border-re-right bg-navpar ta-center col-lg-3 col-6 title-page title-link padd-blouk-30" : variant==="type2" ? "border-re-left col-lg-4 offset-lg-8 col-6 offset-6 title-page padd-blouk-30 bg-navpar ta-center title-link margin-title-page":variant==="type3" ?"title-job padd-block-10 top-63 title-link  border-re-right bg-navpar ta-center col-7 padd-blouk-300":""} >{title}</div>
    </>
  )
}

export default TitlePages