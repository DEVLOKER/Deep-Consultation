import React from 'react'
import { Card, Button, Row, Col, Badge } from 'react-bootstrap/esm'
import styled from 'styled-components'
import { AiFillClockCircle } from "@react-icons/all-files/ai/AiFillClockCircle"
import { AiFillCheckCircle } from "@react-icons/all-files/ai/AiFillCheckCircle"
import { BiEdit } from "@react-icons/all-files/bi/BiEdit"
import { BsTrash } from "@react-icons/all-files/bs/BsTrash"
import { BsPaperclip } from "@react-icons/all-files/bs/BsPaperclip"
import { constants } from 'constant'
import { dateTimeFormat } from 'helper'

export const Consultation = ({id, data, handleProcess, handleDelete, setCrudModal, side}) => {

    const handleDeleteConsultation = (_id) => {
        if(window.confirm("êtes-vous sûr?")){
            handleDelete(_id)
        }
    }

    const handleEditConsultation = (consultation) => {
        setCrudModal({
            type: constants.FORM_EDIT, 
            data: {
                ...consultation,
                state: data?.files?.admin?.length>0? constants.CONSULTATION_PROCESSED: constants.CONSULTATION_PROGRESSING,
                processDate:  new Date(),
            }, 
            show: true
        })
    }

    return (
        <ConsultationCard className="text-center" state={data?.state} >
            <Card.Header>
                <Card.Title>{data?.name}</Card.Title>
            </Card.Header>
            <Card.Body>
                
                <Row>
                    {
                        side===constants.ADMIN_SIDE && (
                            <Col>
                                <Card.Text className="text-muted">
                                    Client
                                </Card.Text>
                                <Badge pill >{data?.client?.name}</Badge>
                            </Col>
                        )
                    }
                    <Col>
                        <Card.Text className="text-muted">
                            Date
                        </Card.Text>
                        <Badge pill >
                            {dateTimeFormat(data?.date)}
                        </Badge>
                        <Badge pill style={{ opacity: data?.processDate? 1:0 }} className={data?.state===constants.CONSULTATION_PROCESSED? 'processed':''}>
                            {data?.processDate ? dateTimeFormat(data?.processDate) : `pas encours traitée`}
                        </Badge>
                    </Col>
                    <Col>
                        <Card.Text className="text-muted">
                            Fichiers
                        </Card.Text>
                        <h5>
                            {data?.files?.client?.length}
                        </h5>
                        <h5 className={data?.state===constants.CONSULTATION_PROCESSED? 'processed':''}>
                            {data?.files?.admin?.length>0 && data?.files?.admin?.length}
                        </h5>
                    </Col>
                    <Col>
                        <Card.Text className="text-muted">
                            Etat
                        </Card.Text>
                        {
                            data?.state===constants.CONSULTATION_PROCESSED?(
                                <AiFillCheckCircle />
                            ):(
                                <AiFillClockCircle />
                            )
                        }
                    </Col>
                </Row>

            </Card.Body>
            <Card.Footer>
                <Row className="actions">
                    <Col className={side===constants.CLIENT_SIDE && data?.state===constants.CONSULTATION_PROCESSED? 'center':''} >
                    {
                        side===constants.CLIENT_SIDE && data?.state===constants.CONSULTATION_PROGRESSING?(
                            <Button variant="light" className="edit ms-1 me-1" onClick={()=>handleEditConsultation(data)}>
                                <BiEdit />
                            </Button>
                        ):(
                            <Button variant="light" className="process ms-1 me-1" onClick={()=>handleProcess(id, data)}>
                                <BsPaperclip />
                            </Button>
                        )
                    }
                    </Col>
                    {
                        ((side===constants.CLIENT_SIDE && data?.state===constants.CONSULTATION_PROGRESSING) || side===constants.ADMIN_SIDE) && (                            
                            <Col>
                                    <Button variant="light" className={`delete ms-1 me-1`} onClick={()=>handleDeleteConsultation(data._id)}>
                                        <BsTrash />
                                    </Button>
                            </Col>
                        )
                    }
                </Row>
            </Card.Footer>
        </ConsultationCard>
    )
}


const ConsultationCard = styled(Card)`
    & {
        margin: 40px 20px;
        box-shadow: 0px 0px 37px 20px rgba(var(--rgb-gray-1), 0.3);
        border-radius: 20px;
        border-width: 0px;
    }

    & .card-header {
        background: ${props => props.state===constants.CONSULTATION_PROGRESSING ? "var(--gray-3-color)" : "var(--orange-color)"};
        color: var(--white-color);
    }

    & .card-header .card-title {
        font-family: 'Questrial';
        font-size: 30px;
    }

    & .card-body {
        padding: 40px;
    }

    & .card-body svg {
        width: 25px;
        height: 25px;
        margin-top: -5px;
        fill: ${props => props.state===constants.CONSULTATION_PROGRESSING ? "var(--gray-3-color)" : "var(--orange-color)"};
    }

    & .card-body .badge {
        background-color: rgba(var(--rgb-gray-1), 0.15) !important;
        color: var(--gray-2-color);
        text-shadow: none;
        margin-bottom: 10px;
    }

    & .card-body .badge.processed {
        background-color: rgba(var(--rgb-orange), 0.15) !important;
        color: var(--orange-color);
        text-shadow: none;
        margin-bottom: 10px;
    }
    & .card-body h5.processed {
        color: var(--orange-color);
    }

    & .card-body .col:nth-child(3) > h5 {
        font-weight: bolder;
        padding: 0;
    }

    & .card-footer{
        border-width: 0px;
        background: transparent;
        position: relative;
    }

    & .actions{
        position: absolute;
        bottom: -20px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;
    }

    & .actions .col {
        display: flex;
    }

    & .actions .col:first-child{
        justify-content: flex-end;
    }

    & .actions .col:last-child{
        justify-content: flex-start;
    }
    
    & .actions .col.center{
        justify-content: center;
    }

    & .card-footer button {
        border-radius: 50%;
        /* border: 2px rgba(var(--rgb-white), 0.99) solid; */
        padding: 10px;
        box-shadow: 0px 0px 4px 1px rgba(var(--rgb-gray-1), 0.3);
        backdrop-filter: blur(10px);
        fill: var(--white-color);
    }

    & .card-footer .actions .edit{
        background-color: rgba(var(--rgb-white), 0.15);
    }
    & .card-footer .actions .edit:hover{
        background-color: rgba(var(--rgb-green), 0.15);
    }
    & .card-footer .actions .edit:hover > svg{
        fill: var(--green-color);
    }
    
    
    & .card-footer .actions .delete{
        background-color: rgba(var(--rgb-white), 0.15);
    }
    & .card-footer .actions .delete:hover{
        background-color: rgba(var(--rgb-red), 0.15);
    }
    & .card-footer .actions .delete:hover > svg{
        fill: var(--red-color)
    }

    & .card-footer .actions .process{
        background-color: ${props => props.state===constants.CONSULTATION_PROGRESSING ? "rgba(var(--rgb-gray-3), 0.95)" : "rgba(var(--rgb-orange), 0.95)"};
    }

    & .card-footer .actions button svg {
        width: 25px;
        height: 25px;
        fill: var(--gray-3-color);
    }

    & .card-footer .actions .process svg{
        fill: ${props => props.state===constants.CONSULTATION_PROGRESSING ? "var(--orange-color)" : "var(--white-color)"};
    }
`