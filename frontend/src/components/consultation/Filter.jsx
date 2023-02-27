import React, { useState } from 'react'
import {ReactComponent as FolderIcon} from "assets/svg/folder.svg"
import { Title } from 'components/ui/Title'
import { Container, Col, Row, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import styled from 'styled-components'
import { RoundIcon } from 'components/ui/RoundIcon'
import { constants } from 'constant'


export const Filter = ({text, handleFilter, side, setCrudModal}) => {

    const showAddForm = ()=> {
        setCrudModal({type: constants.FORM_ADD, data: null, show: true})
    }

    const [filterValue, setFilterValue] = useState([constants.CONSULTATION_PROCESSED, constants.CONSULTATION_PROGRESSING])
    const handleChange = (val) => {
        setFilterValue(val)

        let filter = {}
        switch(val.length){
            case 0 : 
                filter = { state: -1 }
                break
            case 1 : 
                if(val.includes(constants.CONSULTATION_PROGRESSING)) 
                    filter = { state: constants.CONSULTATION_PROGRESSING }
                else if(val.includes(constants.CONSULTATION_PROCESSED)) 
                    filter = { state: constants.CONSULTATION_PROCESSED }
                break
            default:
                break
        }
        handleFilter(filter)
    }

    return (
        <FilterContainer>
            <Row>
                <Col>
                    <Title text={text} />
                </Col>
                <Col>
                    <ToggleButtonGroup type="checkbox" value={filterValue} onChange={handleChange}>
                        <ToggleButton id="tbg-btn-1" value={constants.CONSULTATION_PROGRESSING} variant={'outline-dark'} size='sm' >
                            <FolderIcon /> Encours
                        </ToggleButton>
                        <ToggleButton id="tbg-btn-2" value={constants.CONSULTATION_PROCESSED} variant={'outline-dark'} size='sm' >
                            <FolderIcon /> Traitées
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Col>
            </Row>
            <Row>
            {
                    side===constants.CLIENT_SIDE && (
                        <Col>
                            <RoundIcon action={showAddForm}  />
                        </Col>
                    )
                }
            </Row>
        </FilterContainer>
    )
}



const FilterContainer = styled(Container)`
    & {
        margin-top: 100px;
        margin-bottom: 60px;
    }

    & .row{
        display: flex;
        justify-content: space-around;
        align-items: flex-start;
    }

    & .row:first-child > .col{
        display: flex;
    }

    & .row:last-child > .col{
        display: flex;
        justify-content: center;
        align-items: flex-end;
        padding-top: 20px;
    }

    & .row:first-child > .col:first-child{
        justify-content: flex-start;
    }

    & .row:first-child > .col:last-child{
        justify-content: flex-end;
    }

    & h1{
        margin: 0px;
    }

    & .btn-group .btn{
        border: 1px var(--gray-1-color) solid;
    }

    & .btn-group .btn > svg {
        width: 35px;
        height: 35px;
    }

    & .btn-group .btn:nth-child(2){
        border-radius: 20px 0px 0px 20px;
    }
    & .btn-group .btn:nth-child(4){
        border-radius: 0px 20px 20px 0px;
    }

    & .btn-group .btn:nth-child(2) > svg {
        fill: var(--gray-3-color);
    }

    & .btn-group .btn-check:checked+.btn:nth-child(2){
        background: var(--gray-3-color);
        transition: background 0.5s linear;
    }

    & .btn-group .btn-check:checked+.btn:nth-child(2) > svg {
        fill: var(--white-color);
    }

    & .btn-group .btn:nth-child(4) > svg {
        fill: var(--orange-color);
    }

    & .btn-group .btn-check:checked+.btn:nth-child(4){
        background: var(--orange-color);
        transition: background 0.5s linear;
    }

    & .btn-group .btn-check:checked+.btn:nth-child(4) > svg {
        fill: var(--white-color);
    }

    @media screen and (max-width:675px) {
        & .col{
            justify-content: center;
            align-items: center;
        }

        & .row:last-child > .col{
            padding-top: 60px;
        }
    }
`