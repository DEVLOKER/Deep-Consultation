import React from 'react'
import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import { BsArrowRight } from "@react-icons/all-files/bs/BsArrowRight"
import backgroundImage from "assets/images/background.jpg"

export const HomeBackground = () => {
    return (
        <>
            <Image style={{ backgroundImage: `url(${backgroundImage})` }} >
                <h1>Consultation facile avec notre entreprise</h1>
                <p>
                    Entreprise présente au Canada depuis 2021, pionnière en ingénierie 
                    et en réalisation de grands travaux, Deep consulting a acquis une 
                    solide réputation fondée sur la qualité de son potentiel et de ses 
                    réalisations.
                </p>
                <ReadMore href='#services' >
                    <Button variant="light" size="lg">
                        En savoir plus <BsArrowRight />
                    </Button>
                </ReadMore>
            </Image>
        </>
    )
}


const Image = styled.div`
    & {
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        height: 100vh;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    &::after{
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: linear-gradient(0deg, rgba(109,187,217,0.4)  0%, rgba(26,71,137,1) 100%);
        opacity: 0.8;
    }

    & h1 {
        color: var(--white-color);
        z-index: 1;
        text-align: center;
    }

    & p {
        color: var(--white-color);
        z-index: 1;
        width: 50%;
        margin-top: 40px;
        font-family: 'Questrial';
    }
`

const ReadMore = styled.a`
    & {
        z-index: 1;
    }

    & button{
        background-color: var(--orange-color);
        color: var(--white-color);
        border-width: 0px;
        margin-top: 40px;
    }
`