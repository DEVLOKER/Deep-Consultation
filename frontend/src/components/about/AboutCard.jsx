import React from 'react'
import { Card } from 'react-bootstrap/esm'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'
import { BsArrowRight } from "@react-icons/all-files/bs/BsArrowRight"
import { BsArrowLeft } from "@react-icons/all-files/bs/BsArrowLeft"
import { useState } from 'react'


export const AboutCard = ({image, title, detail, index}) => {

    const [open, setOpen] = useState(false)

    return (
        <CardContainer>
            <div className="row g-0" style={{ flexDirection: index%2===0? 'row-reverse' : 'row' }}>
                <div className="col-md-6">
                    <Card.Img src={image} />
                    {
                        index==2 && ( <Card.Title style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 15, color: 'var(--gray-2-color)' }} >Youness AIT TOUDGHI, ing. MBA</Card.Title>)
                    }
                </div>
                <div className="col-md-6">
                    <Card.Body>
                        <Card.Title>
                            {title}
                        </Card.Title>
                        <Card.Text style={{ height: open? 'auto' : 190 }} >
                            {
                                detail.map((paragraph, i)=>(
                                    <span key={i} >{ paragraph }<br /></span>
                                ))
                            }
                        </Card.Text>
                        <Card.Title>
                        {
                            open?(
                                <CardButton variant="light" size="lg" className="minus" onClick={(e)=> setOpen(!open)} >
                                    En savoir moins <BsArrowLeft />
                                </CardButton>
                            ):(
                                <CardButton variant="light" size="lg" className="plus" onClick={(e)=> setOpen(!open)} >
                                    En savoir plus <BsArrowRight />
                                </CardButton>
                            )
                        }
                        </Card.Title>
                    </Card.Body>
                </div>
            </div>    
        </CardContainer>
    )
}

const CardContainer = styled(Card)`
    & {
        border-width: 0px;
        margin: 100px 30px;
    }

    & .card-body .card-title {
        font-weight: bold;
        color: var(--black-color);
        text-align: center;
        margin-bottom: 40px;
    }

    & .card-body .card-text {
        /* height: 200px; */
        overflow: hidden;
        text-align: justify;
        text-justify: auto;
        transition: height 0.15s ease-out;
    }

    & .card-body .card-text p{
        text-overflow: ellipsis;
        /* white-space: nowrap; */
    }
`

const CardButton = styled(Button)`
    &.plus {
        background-color: var(--orange-color);
        color: var(--white-color);
    }

    &.minus {
        background-color: var(--gray-3-color);
        color: var(--white-color);
    }
`
