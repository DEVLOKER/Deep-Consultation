import React, { useState } from 'react'
import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { BsArrowRight } from "@react-icons/all-files/bs/BsArrowRight"
import { BsArrowLeft } from '@react-icons/all-files/bs/BsArrowLeft'


export const ServiceCard = ({image, title, detail}) => {

    const [open, setOpen] = useState(false)

    return (
        <>
            <ServiceContainer >
                <Card.Header>
                    <CardImage variant="top" style={{ backgroundImage: `url(${image})` }} />
                </Card.Header>
                <Card.Body>
                    <Card.Title> { title } </Card.Title>
                    <Card.Text style={{ height: open? 'auto' : 70 }}  >
                        { detail } 
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
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
                </Card.Footer>
            </ServiceContainer>
        </>
    )
}

const ServiceContainer = styled(Card)`
    & {
        width: 350px;
        height: 100%;
        background-color: rgba(var(--rgb-gray-1), 0.15);
        border-width: 0px;
        box-shadow: 0px 10px 37px 20px rgba(var(--rgb-gray-1), 0.3);
        margin-top: 40px;
    }

    && .card-header{
        width: 100%;
        background: transparent;
        border-width: 0px;
        display: flex;
        justify-content: center;
        padding-top: 40px;
    }

    & .card-body .card-title {
        font-weight: bold;
        color: var(--black-color);
        text-align: center;
        margin-bottom: 40px;
    }

    & .card-body .card-text {
        overflow: hidden;
        text-align: justify;
        text-justify: auto;
        transition: height 0.15s ease-out;
    }

    && .card-footer{
        width: 100%;
        background: transparent;
        border-width: 0px;
        display: flex;
        justify-content: center;
        padding-bottom: 40px;
    }
`

const CardImage = styled.div`
    & {
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        width: 300px;
        height: 300px;
        border-radius: 100%;
        position: relative;
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