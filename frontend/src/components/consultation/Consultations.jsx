import React from 'react'
import styled from 'styled-components'

import { Container } from 'react-bootstrap/esm'
import { Consultation } from 'components/consultation/Consultation'
import { loadingState } from 'constant'
import { AlertDismissible } from 'components/ui/AlertDismissible'


export const Consultations = ({consultations, handleProcess, handleDelete, setCrudModal, side}) => {

    return (
        <ConsultationsContainer fluid>
            {
                (consultations===undefined || consultations===null || consultations.length===0)?(
                    <InfoContainer>
                        <AlertDismissible type={loadingState.EMPTY} content="aucune consultation trouvée!" />
                    </InfoContainer>
                ):(
                    consultations?.map((data, index)=>
                        <Consultation key={index} id={index} data={data} handleProcess={handleProcess} handleDelete={handleDelete} setCrudModal={setCrudModal} side={side} />
                    )
                )

            }
        </ConsultationsContainer>
    )
}


const ConsultationsContainer = styled(Container)`
    & {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: row;
        flex-wrap: wrap;
    }
`

const InfoContainer = styled.div`
    & {
        width: 100%;
    }
`