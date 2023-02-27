import React from 'react'
import { Container } from 'react-bootstrap/esm'
import styled from 'styled-components'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Logo } from 'components/ui/Logo'
import { SocialNetworksIcons } from 'components/footer/SocialNetworksIcons'
import { ExternalLinks } from 'components/footer/InternalLinks'
import { ContactInfo } from 'components/footer/ContactInfo'
import { Copyright } from 'components/footer/Copyright'

export const Footer = () => {
    
    return (
        <FooterContainer fluid >
            <Row>
                <Col>
                    <Logo />
                    <SocialNetworksIcons />
                </Col>
                <Col>
                    <h3>Liens</h3>
                    <ExternalLinks />
                </Col>
                <Col>
                    <h3>Contactez-nous</h3>
                    <ContactInfo /> 
                </Col>
            </Row>

            <Copyright />
            
        </FooterContainer>
    )
}


const FooterContainer = styled(Container)`
    & {
        padding: 100px 50px 20px 50px;
        margin-top: -60px;
        width: 100%;
        /* background-color: rgba(var(--rgb-black), 0.1); */
        background: linear-gradient(0deg, rgba(var(--rgb-black), 0.3)  0%, rgba(var(--rgb-black), 0.01) 100%);
    }

    && .row {
        display: flex;
        justify-content: space-around;
        align-items: flex-start;
        flex-direction: row;
        flex-wrap: wrap;
    }
    
    && .col {
        margin-top: 40px;
    }

    && .right {
        color: var(--black-color);
    }

`