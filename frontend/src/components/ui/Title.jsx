import React from 'react'
import styled from 'styled-components'

export const Title = ({text}) => {
    return (
        <TitleHeader>{text}</TitleHeader>
    )
}

const TitleHeader = styled.h1`
    & {
        margin: 100px;
        color: var(--gray-3-color);
        font-family: 'Poppins';
        font-size: x-large;
    }
`