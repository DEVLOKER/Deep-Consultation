import React, { useState } from 'react'
import styled from 'styled-components'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import { Logo } from 'components/ui/Logo'
import { Login } from 'components/form/Login'
import { FullModal } from 'components/ui/FullModal'
import { NavDropdown } from 'react-bootstrap'

export const FixedHeader = () => {

    const [loginOpen, setLoginOpen] = useState(false)

    return (
        <HeaderContainer id="home" >

            <Navbar fixed="top" expand="lg" >
                <Container>
                    <Logo />
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <NavLinks className="me-auto">
                            <Nav.Link href="#home">Acceuil</Nav.Link>
                            <Nav.Link href="#services">Services</Nav.Link>
                            <Nav.Link href="#about">Qui somme-nous</Nav.Link>
                            <Nav.Link href="#contact">Contact</Nav.Link>
                        </NavLinks>
                        <ButtonLogin variant="light" onClick={() => setLoginOpen(true)} >Connexion</ButtonLogin>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <LoginModal open={loginOpen} setOpen={setLoginOpen} title="Login" style={{alignItems: 'center'}} content={<Login />} />

        </HeaderContainer>
    )
}

const HeaderContainer = styled(Container)`

    & .navbar {
        background: rgba(var(--rgb-gray-3), 0.8);
        backdrop-filter: blur(7px);
        box-shadow: 0px 0px 4px 1px var(--gray-3-color);
    }

    & .navbar-toggler.collapsed {
        background: var(--white-color);
    }
`

const LoginModal = styled(FullModal)`
    & .modal-body {
        background: red;
        align-items: center;
    }
`

const NavLinks = styled(Nav)`
    && a.nav-link {
        font-family: 'Poppins';
        margin-left: 20px;
        padding-left: 0px;
        padding-right: 0px;
        color: var(--white-color);
        font-weight: 500;
    }

    && a.nav-link:first-child{
        width: fit-content;
    }
`

const ButtonLogin = styled(Button)`
    & {
        border-radius: 20px;
        padding-left: 25px;
        padding-right: 25px;
    }
`
