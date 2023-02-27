import React from 'react'
import { Button } from 'react-bootstrap/esm'
import styled from 'styled-components'

export const ButtonIcon = ({icon, text, action}) => {
    return (
        <LightButton variant='light' size="sm" onClick={action} >
            {icon}
            {text}
        </LightButton>
    )
}

const LightButton = styled(Button)`
    & {
        margin-left: 20px;
        border-radius: 20px;
    }

    & svg {
        margin-right: 10px;
        width: 35px;
        height: 35px;
    }
`
