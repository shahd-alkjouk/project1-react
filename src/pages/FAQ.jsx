import React, { useEffect, useState } from 'react'
import { FaqService } from '../Services/FaqService'
import { Container, Row } from 'react-bootstrap'
import Navparr from '../compoant/Navparr'
import Accordion from 'react-bootstrap/Accordion';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Foter from '../compoant/Foter';

const FAQ = () => {

    const [faq, setFaq] = useState([])                
    const [faqCate, setFaqCate] = useState([])        
    const [selectedCat, setSelectedCat] = useState(null)
    const [error, setError] = useState()

    useEffect(() => {
        setError(null)
        
        FaqService.getCategories()
        .then((data)=>{
            setFaqCate(data);
            if (selectedCat === null && data.length > 0) {
                setSelectedCat(data[0].id);
            }
        })
        .catch((err)=>{
            setError(err.message)
        })
        .finally(()=>{
            console.log('fetch ended')
        })
    
        
        FaqService.getFaqByCategory()
        .then((data)=>{
            setFaq(data)
        })
        .catch((err)=>{
            setError(err.message)
        })
        .finally(()=>{
            console.log('fetch ended')
        })
    
    }, [])

    const filteredFAQ = selectedCat
        ? faq.filter(item => item.category_id === String(selectedCat))
        : [];

    return (
        <>
            <Navparr />
            <div className="bg-color3 padd-block-10 mb-4">
                    <Container>
                        <Breadcrumb>
                          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                          <Breadcrumb.Item active>FAQs</Breadcrumb.Item>
                        </Breadcrumb>
                    </Container>
                </div>
            <Container>
                
                <Row>

                    <div className="faq mb-3 col-lg-8 offset-lg-4">FAQs</div>

                    <div className="col-4">
                        {faqCate.map(cate => (
                            <div
                                key={cate.id}
                                className={` ${ selectedCat===cate.id ?"bg-color1 active-cat cat-faq":"cat-faq"}`}
                                onClick={() => setSelectedCat(cate.id) }
                            >
                                {cate.name}
                            </div>
                        ))}
                    </div>

                    <div className="col-8">
                        {filteredFAQ.map(item => (
                            <div key={item.title} className="mb-3">
                                <Accordion defaultActiveKey="0">
                                  <Accordion.Item eventKey="1">
                                    <Accordion.Header>{item.title}</Accordion.Header>
                                    <Accordion.Body>
                                      {item.body}
                                    </Accordion.Body>
                                  </Accordion.Item>        
                                </Accordion>
                            </div>
                        ))}

                                                
                    </div>

                </Row>
            </Container>
            <div className="mt-5 jc-between">
                <Foter/>
            </div>
        </>
    )
}

export default FAQ