import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { ApiConfig } from '../API/ApiConfig'

const ImgProfile = () => {

  const domain_name = 'https://tamkeen-dev.com'

  const { userInfo } = useContext(AuthContext) 

  const [error, setError] = useState(null)
  const [bannerImage, setBannerImage] = useState({})
  const [loading, setLoading] = useState(
        {
            'banner': false
        }
    )

  const credential = {
     user: `${userInfo.username}`,
     pass: `${userInfo.pass}` 
    }

    const auth = "Basic " + btoa(credential.user + ":" + credential.pass)  


  const uploadBannerImage = (e) => {
        setLoading({
            ...loading,
            banner: true
        })
        const file = e.target.files[0]

        fetch(`${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.TOKEN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.text())
            .then(csrfToken => {
                // console.log(csrfToken)

                return fetch(`${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.USER_PICTURE}?_format=json`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/octet-stream',
                        'X-CSRF-Token': csrfToken,
                        'Authorization': auth,
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

  return (
    <div>
      <div>
                                    <label htmlFor="bannerImage" className='mb-2'>Upload Image</label>
                                </div>
                                <input type="file"
                                    accept='.png, .jpg'
                                    // accept='image/png, image/jpeg'

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

                                    domain_name.url
                                        ?
                                        <div className="mt-3">
                                            <img src={domain_name.url} alt="name" />
                                        </div>
                                        : <></>
                                }
    </div>
  )
}

export default ImgProfile