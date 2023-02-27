import { FilesCard } from 'components/ui/FilesCard'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap/esm'
import styled from 'styled-components'
import { constants, screen } from 'constant'



export const AdminConsultationProcess = ({session, data, handleProcess}) => {

    return (
        <AdminContainer>
            <Row>
                <Col {...screen} >
                    <FilesCard session={session} data={data} handleProcess={handleProcess} side={constants.CLIENT_SIDE} userType={constants.USER_ADMIN} />
                </Col>
                <Col {...screen} >
                    <FilesCard session={session} data={data} handleProcess={handleProcess} side={constants.ADMIN_SIDE} userType={constants.USER_ADMIN} />
                </Col>
            </Row>
        </AdminContainer>
    )
}


const AdminContainer = styled(Container)`

    & > .row {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    &  > .row .col {
        /* min-height: 200px; */
    }
`