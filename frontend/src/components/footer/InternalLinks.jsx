import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import styled from 'styled-components'

export const ExternalLinks = () => {
    return (
        <LinksContainer>
            <ListGroup>
                <ListGroup.Item action href="#home" >Acceuil</ListGroup.Item>
                <ListGroup.Item action href="#services" >Services</ListGroup.Item>
                <ListGroup.Item action href="#about" >A propos</ListGroup.Item>
                <ListGroup.Item action href="#contact" >Contact</ListGroup.Item>
            </ListGroup>
        </LinksContainer>
    )
}

const LinksContainer = styled.div`
    && {
        width: fit-content;
    }
    
    && a.list-group-item {
        background: transparent;
        border-width: 0px;
    }
`