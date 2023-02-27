import { FilesCard } from 'components/ui/FilesCard'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap/esm'
import styled from 'styled-components'
import { constants, screen } from 'constant'


export const ClientConsultationProcess = ({data, handleProcess}) => {

    return (
        <ClientContainer>
            <Row>
                <Col {...screen} >
                    <FilesCard data={data} handleProcess={handleProcess} side={constants.CLIENT_SIDE} userType={constants.USER_CLIENT} />
                </Col>
                <Col {...screen} >
                    <FilesCard data={data} handleProcess={handleProcess} side={constants.ADMIN_SIDE} userType={constants.USER_CLIENT} />
                </Col>
            </Row>
        </ClientContainer>
    )
}


const ClientContainer = styled(Container)`

    & > .row {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    &  > .row .col {
        /* min-height: 200px; */
    }
`