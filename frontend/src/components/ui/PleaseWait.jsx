import React from 'react'
import styled from 'styled-components'

export const PleaseWait = ({text}) => {
    return (
        <WaitContainer>
            <div>
                {text || `Please wait ...`}
            </div>
        </WaitContainer>
    )
}


const WaitContainer = styled.div`
    & {
        width: 100%;
        height: 100vh;
        background: rgba(var(--rgb-black), 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        z-index: 99999999;
        position: absolute;
        top: 0;
        left: 0;
    }

    & div {
        color: var(--white-color);
        font-weight: bold;
        letter-spacing: 2px;
        font-size: 25px;
        text-align: center;
    }
`