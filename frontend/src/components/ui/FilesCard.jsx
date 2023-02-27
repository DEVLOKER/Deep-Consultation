import React, { useEffect, useRef, useState } from 'react'
import { Container, Badge, Button, Card, Col, Row } from 'react-bootstrap/esm'
import { constants } from 'constant'
import styled from 'styled-components'
import { FileChip } from 'components/ui/FileChip'
import { BrowseButton } from 'components/ui/BrowseButton'
import { dateTimeFormat, filesResolve } from 'helper'


export const FilesCard = ({session, data, handleProcess, side, userType}) => {

    const [consultation, setConsultation] = useState(data)  
    const [files, setFiles] = useState(filesResolve(data, side))
    
    const browseFiles = (event)=> {
        event.stopPropagation()
        event.preventDefault()
        var files = event.target.files

        let tmpFiles = consultation?.files?.admin || []
        for(const element of files){ // lastModified     lastModifiedDate    type
            tmpFiles.push({name: element.name, size: element.size})     
        }
        handleChange(tmpFiles)
    }

    const handleDelete = (index) => {
        let tmpFiles = consultation?.files?.admin || []
        tmpFiles = tmpFiles.filter((file, i) => i!==index)
        handleChange(tmpFiles)
    }

    const handleChange = (newFiles)=>{
        setFiles(newFiles)
        setConsultation({
            ...consultation, 
            admin: session.name,
            files: {...consultation.files, admin: newFiles }, 
            processDate: new Date(), 
            state: newFiles?.length>0? constants.CONSULTATION_PROCESSED: constants.CONSULTATION_PROGRESSING
        })
    }

    const handleProcessConsultation = () => {
        handleProcess(consultation, inputFilesRef.current.getFiles())
    }


    const inputFilesRef = useRef()
    useEffect(()=>{

    })


    return (
        <CardContainer side={side}>
            <Card className="text-center" >
                <Card.Header>
                    <Card.Title>
                        {
                            userType===constants.USER_CLIENT?(
                                <>
                                    {(side===constants.ADMIN_SIDE && "Traitée") || (consultation?.name)}
                                </>
                            ):(
                                <>
                                    {(side===constants.ADMIN_SIDE && "Traitement") || (consultation?.name)}
                                </>
                            )
                        }
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    
                    <Row>
                        {
                            files?.map((file, index)=>
                                <FileChip key={index} consultation={data} filename={file.name} size={file.size} side={side} userType={userType} handleDelete={()=>handleDelete(index)} />
                            )
                        }
                    </Row>
                    
                    {
                        side===constants.ADMIN_SIDE && userType===constants.USER_ADMIN && (
                        <Row>
                            <Col>
                                <BrowseButton ref={inputFilesRef} handleBrowse={browseFiles} />
                            </Col>
                        </Row>
                        )
                    }                

                </Card.Body>
                <Card.Footer>
                    {
                        side===constants.CLIENT_SIDE ? (
                            <Row>
                                {
                                    userType===constants.USER_ADMIN && (
                                        <Col>
                                            <Card.Text className="text-muted">
                                                Client
                                            </Card.Text>
                                            <Badge pill >{consultation?.client?.name}</Badge>
                                        </Col>
                                    )
                                }
                                <Col>
                                    <Card.Text className="text-muted">
                                        Date
                                    </Card.Text>
                                    <Badge pill >{dateTimeFormat(consultation?.date)}</Badge>
                                </Col>
                                <Col>
                                    <Card.Text className="text-muted">
                                        Fichiers
                                    </Card.Text>
                                    <h5>
                                        {consultation?.files.client.length}
                                    </h5>
                                </Col>
                            </Row>
                        ):(
                            userType===constants.USER_ADMIN?(
                                <Button variant="light" disabled={consultation?.files?.admin?.length===0} onClick={handleProcessConsultation}>
                                    Enregistrer
                                </Button>
                            ):(
                                <Row>
                                    {
                                        userType===constants.USER_CLIENT && (
                                            <Col>
                                                <Card.Text className="text-muted">
                                                    Admin
                                                </Card.Text>
                                                <Badge pill >{consultation?.admin?.name}</Badge>
                                            </Col>
                                        )
                                    }
                                    <Col>
                                        <Card.Text className="text-muted">
                                            Date
                                        </Card.Text>
                                        <Badge pill >{dateTimeFormat(consultation?.date)}</Badge>
                                    </Col>
                                    <Col>
                                        <Card.Text className="text-muted">
                                            Fichiers
                                        </Card.Text>
                                        <h5>
                                            {consultation?.files.admin.length}
                                        </h5>
                                    </Col>
                                </Row>
                            )
                            
                        )
                    }
                </Card.Footer>
            </Card>
        </CardContainer>
    )
}


const CardContainer = styled(Container)`
    & .card{
        margin: 40px 20px;
        box-shadow: 0px 0px 37px 20px rgba(var(--rgb-gray-1), 0.3);
        border-radius: 20px;
        border-width: 0px;
        min-height: calc(100vh - 90px);
    }
    
    @media screen and (max-width:675px) {
        & .card{
            margin: 40px 0px;
            min-height: auto;
        }
    }

    & .card-header {
        background: ${props => props.side===constants.CLIENT_SIDE ? "var(--gray-3-color)" : "var(--orange-color)"};
        color: var(--white-color);
    }

    & .card-header .card-title {
        font-family: 'Questrial';
        font-size: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
        max-width: calc(100% - 20px);
        white-space: nowrap;
    }

    & .card-body {
        padding: 40px 40px 0px 20px;
    }

    
    & .card-body > .row {
        margin-bottom: 40px;
    }

    & .card-body > .row > .col{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    
    & .card-footer .badge {
        background-color: ${props => props.side===constants.CLIENT_SIDE ? "rgba(var(--rgb-gray-1), 0.15)" : "rgba(var(--rgb-orange), 0.05)"} !important;
        color: ${props => props.side===constants.CLIENT_SIDE ? "var(--gray-2-color)" : "var(--orange-color)"};
        text-shadow: none;
    }

    & .card-footer .col:nth-child(3) > h5 {
        font-weight: bolder;
    }

    & .card-footer {
        border-width: 0px;
        background: transparent;
    }

    & .card-footer button {
        background: var(--orange-color);
        color: var(--white-color);
        padding: 10px;
        border-radius: 30px;
        width: 220px;
    }

    & .card-footer svg {
        width: 25px;
        height: 25px;
        fill: var(--white-color);
    }
`