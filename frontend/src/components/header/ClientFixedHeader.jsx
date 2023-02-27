import React, { useState } from 'react'
import styled from 'styled-components'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import { Logo } from 'components/ui/Logo'

import { useNavigate } from "react-router-dom"
import { logout } from 'services/user.service'


export const ClientFixedHeader = () => {

    const navigate = useNavigate()

    const handleLogout = async()=>{
        logout()
        .then((data)=> navigate("/"))
        .catch((err)=> console.log(err))
    }

    return (
        <HeaderContainer>

            <Navbar fixed="top" expand="lg" >
                <Container>
                    <Logo />
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <NavLinks className="me-auto">
                        </NavLinks>
                        <ButtonLogout variant="light" size="sm" onClick={handleLogout} >Déconnexion</ButtonLogout>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </HeaderContainer>
    )
}

const HeaderContainer = styled(Container)`

    & .navbar {
        background: rgba(var(--rgb-white), 0.8);
        backdrop-filter: blur(7px);
        box-shadow: 0px 0px 4px 1px var(--gray-1-color);
    }

    & .navbar-toggler.collapsed {
        background: var(--gray-1-color);
    }

    && span.right {
        color: var(--gray-3-color);
    }
`

const NavLinks = styled(Nav)`
    && a.nav-link {
        font-family: 'Poppins';
        margin-left: 20px;
        padding-left: 0px;
        padding-right: 0px;
        color: var(--gray-3-color);
        font-weight: 500;
    }

    && a.nav-link:first-child{
        width: fit-content;
    }
`

const ButtonLogout = styled(Button)`
    & {
        background: transparent;
        color: var(--gray-3-color);
        border: 1px var(--gray-3-color) solid;
        border-radius: 20px;
        padding-left: 25px;
        padding-right: 25px;
    }
`
