import React from 'react'
import styled from 'styled-components'
import Navbar from 'react-bootstrap/Navbar'

import {ReactComponent as SVGLogo} from "assets/svg/logo.svg"

export const Logo = () => {
    return (
        <>
            <NavBarBrand href="/">
                <LogoIcon />
                <h4>
                    <span className='left'>Deep</span> 
                    <span className='right'>Consulting</span>
                </h4>
                
            </NavBarBrand>
        </>
    )
}

const LogoIcon = styled(SVGLogo)`
    &&  {
        color: var(--orange-color);
        fill: var(--orange-color);
        width: 35px;
        height: 35px; 
        margin-right: 5px;
        margin-top: -18PX;
    }
`

const NavBarBrand = styled(Navbar.Brand)`
    &&.navbar-brand {
        font-family: 'Roboto';
        /* letter-spacing: 3px; */
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    
    h4 {
        vertical-align: middle;
        /* margin-top: 5px; */
    }

    && span {
        margin-left: 5px;
    }

    && .left {
        color: var(--orange-color);
    }

    && .right {
        color: var(--white-color);
    }
`
