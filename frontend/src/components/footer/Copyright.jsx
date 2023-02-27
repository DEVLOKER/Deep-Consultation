import React, { useState } from 'react'
import styled from 'styled-components'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Modal from 'react-bootstrap/Modal'

import { privacyPolicy } from 'data/privacyPolicy' 
import { termsOfUse } from 'data/termsOfUse' 

export const Copyright = () => {

    const [show, setShow] = useState(false)
    const [content, setContent] = useState({title: '', detail: ''})

    const handleShow = async (title, file) => {
        let detail = file==0? await privacyPolicy() : await termsOfUse()
        setContent({title, detail})
        setShow(true)
    }

    return (
        <CopyrightContainer>
                <Col>
                    <small>Copyright © 2023 Deep Consulting. All Rights Reserved</small>
                </Col>
                <Col>
                    <small onClick={() => handleShow('Terms of use', 0)} >Terms of use</small>
                    {' '} | {' '} 
                    <small onClick={() => handleShow('Privacy Policy', 1)} >Privacy Policy</small>
                </Col>

                <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{ content.title }</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div dangerouslySetInnerHTML={{ __html: content.detail }} />
                    </Modal.Body>
                </Modal>

        </CopyrightContainer>
    )
}

const CopyrightContainer = styled(Row)`
    & {
        margin-top: 20px;
        display: flex;
        justify-content: space-around;
    }
    
    & .col:first-child {
        text-align: left;
    }

    & .col:last-child {
        text-align: right;
    }

    & small {
        text-decoration: none;
        color: var(--gray-3-color);
        cursor: pointer;
    }
`