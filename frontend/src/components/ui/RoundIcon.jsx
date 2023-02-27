import React from 'react'
import { Button } from 'react-bootstrap/esm'
import { AiOutlinePlus } from "@react-icons/all-files/ai/AiOutlinePlus"
import styled from 'styled-components'


export const RoundIcon = ({action}) => {
    return (
        <Round className="plus" variant="light" size="lg" onClick={action} >
            <AiOutlinePlus />
        </Round>
    )
}

const Round = styled(Button)`
    & {

    }

    &.plus{
        border-radius: 50%;
        border: 1px solid var(--gray-1-color);
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`