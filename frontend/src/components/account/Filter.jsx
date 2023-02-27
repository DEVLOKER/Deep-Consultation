import React from 'react'
import { Title } from 'components/ui/Title'
import { Container, Col, Row } from 'react-bootstrap'
import styled from 'styled-components'
import { RoundIcon } from 'components/ui/RoundIcon'

export const Filter = ({openCrudModalToAdd}) => {

    return (
        <FilterContainer>
            <Row>
                <Col>
                    <Title text="Comptes des clients" />
                </Col>
                <Col>
                    <RoundIcon action={openCrudModalToAdd}  />
                </Col>
            </Row>
        </FilterContainer>
    )
}



const FilterContainer = styled(Container)`
    & {
        margin-top: 100px;
        margin-bottom: 50px;
    }

    & .row{
        display: flex;
        justify-content: space-around;
        align-items: flex-start;
    }

    & .col{
        display: flex;
    }

    & .col:first-child{
        justify-content: flex-start;
    }

    & .col:last-child{
        justify-content: flex-end;
    }

    & h1{
        margin: 0px;
    }

    & .plus{
        border: 1px solid var(--gray-1-color);
    }

    & .plus svg{
        width: 35px;
        height: 35px;
    }

    @media screen and (max-width:675px) {
        & .col{
            justify-content: center;
            align-items: center;
        }
    }
`