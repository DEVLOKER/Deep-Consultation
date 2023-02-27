import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import styled from 'styled-components'

import { FaPhoneAlt } from "@react-icons/all-files/fa/FaPhoneAlt"
import { IoMdMail } from "@react-icons/all-files/io/IoMdMail"
import { ImLocation } from "@react-icons/all-files/im/ImLocation"

export const ContactInfo = () => {
    return (
        <ContactContainer>
            <ListGroup>
                <ListGroup.Item>
                    <span><FaPhoneAlt /></span>
                    <span>514-677-8909</span>
                </ListGroup.Item>
                <ListGroup.Item>
                    <span><a href='mailto:youness.ait.1@gmail.com'><IoMdMail /></a></span>
                    <span>youness.ait.1@gmail.com</span>
                </ListGroup.Item>
                <ListGroup.Item>
                    <span><a href='https://goo.gl/maps/YdhN3guhNRZYSX6j7' target="_blank" rel="noreferrer" ><ImLocation /></a></span>
                    <span>102 boul. Curé-Poirier E Longueuil (Québec) J4J2J3 Canada</span>
                </ListGroup.Item>
            </ListGroup>
        </ContactContainer>
    )
}

const ContactContainer = styled.div`
    & .list-group-item {
        background: transparent;
        border-width: 0px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        padding: 0px;
    }

    & svg {
        color: var(--black-color);
        width: 35px;
        height: 35px;
        border: 1px var(--gray-1-color) solid;
        padding: 5px;
        border-radius: 100%;
        margin: 5px;
    }
`