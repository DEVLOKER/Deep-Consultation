import React from 'react'
import { FaFacebookF } from "@react-icons/all-files/fa/FaFacebookF"
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter"
import { FaLinkedinIn } from "@react-icons/all-files/fa/FaLinkedinIn"
import styled from 'styled-components'


export const SocialNetworksIcons = () => {
    return (
        <IconsContainer>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" >
                <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" >
                <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" >
                <FaLinkedinIn />
            </a>
        </IconsContainer>
    )
}

const IconsContainer = styled.div`
    & {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        margin-top: 20px;
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

    svg:hover {
        color: var(--orange-color);
        border: 1px var(--orange-color) solid;
    }
`
