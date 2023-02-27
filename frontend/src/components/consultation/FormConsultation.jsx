import React, {  useEffect, useRef, useState } from 'react'
import { AlertDismissible } from 'components/ui/AlertDismissible'
import { BrowseButton } from 'components/ui/BrowseButton'
import { FileChip } from 'components/ui/FileChip'
import { PleaseWait } from 'components/ui/PleaseWait'
import { Title } from 'components/ui/Title'
import { constants, loadingState } from 'constant'
import { Button, Container, FloatingLabel, Form, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

export const FormConsultation = ({session, handleAdd, handleEdit, data, type, state}) => {


    const [consultation, setConsultation] = useState(data!==null? data : { name: "", client: session?._id || "", date: new Date(), files: { client: [], admin: []}, state: constants.CONSULTATION_PROGRESSING})

    const handleNameChange = (event) => {
        setConsultation({...consultation, name: event.target.value})
    }

    const inputFilesRef = useRef()

    const browseFiles = (event)=> {
        event.stopPropagation()
        event.preventDefault()
        var files = event.target.files

        let tmpFiles = consultation?.files?.client || []
        for(const element of files)
            tmpFiles.push({name: element.name, size: element.size})     
        
        setConsultation({...consultation, files: {...consultation.files, client: tmpFiles} } )
    }

    const handleDelete = (index) => {
        let tmpFiles = consultation?.files?.client || []
        tmpFiles = tmpFiles.filter((file, i) => i!==index)
        setConsultation({...consultation, files: {...consultation.files, client: tmpFiles} } )
    }

    const handleSaveConsultation = ()=>{
        if(type===constants.FORM_ADD){
            handleAdd(consultation, inputFilesRef.current.getFiles())
        }
        if(type===constants.FORM_EDIT){
            handleEdit(consultation, inputFilesRef.current.getFiles())
        }
    }



    return (
        <FormContainer>
            <Form>
                <Title text={type===constants.FORM_ADD? "Nouvelle Consultation" : "Modification de Consultation"} />
                
                <MessageInfo>
                    {state.status === loadingState.LOADING && <PleaseWait />}
                    {state.status === loadingState.SUCCESS && <AlertDismissible type={state.status} content='opération terminée avec succès!' />}
                    {state.status === loadingState.ERROR && <AlertDismissible type={state.status} content={state?.error?.message} />}
                </MessageInfo>
                
                <Row>
                    <FloatingLabel label="Nom de consultation" className="mb-4" >
                        <Form.Control type="text" placeholder="Nom" name="name" value={consultation?.name} onChange={handleNameChange} />
                    </FloatingLabel>
                </Row>
                <Row>
                    <FilesContainer>
                        {
                            consultation?.files?.client.map((file, index)=>
                            <FileChip key={index} filename={file.name} size={file.size} side={constants.CLIENT_SIDE} userType={constants.USER_CLIENT} handleDelete={()=>handleDelete(index)} />
                            )
                        }
                    </FilesContainer>
                </Row>
                <Row>
                    <BrowseContainer>
                        <BrowseButton ref={inputFilesRef} handleBrowse={browseFiles} />
                    </BrowseContainer>
                </Row>
                <Row>
                    <Button variant="light" size="lg" disabled={consultation?.files?.client?.length===0} className="mb-4 btn-save-update" onClick={handleSaveConsultation} >
                        {
                            type===constants.FORM_ADD ? 'Enregistrer' : 'Modéfier'
                        }
                    </Button>
                </Row>
            </Form>
        </FormContainer>
    )
}


const FormContainer = styled(Container)`
    & {
        background: rgba(var(--rgb-white), 0.9);
        border-radius: 40px;
        padding: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
    }

    & .row:first-child {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
    }

    & .row:last-child {
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
        flex-direction: column;
    }

    & h1 {
        color: var(--blue-color);
        border-bottom: 4px var(--orange-color) solid;
        margin-top: 10px;
        margin-left: 0px;
        width: fit-content;
    }

    & form {
        width: 80%;
    }

    & .form-floating label {
        color: rgba(var(--rgb-blue), 0.8);
        padding-left: 20px;
    }

    & .form-floating input {
        background: transparent;
        background: rgba(var(--rgb-gray-1), 0.15);
    } 

    & input, button.btn-save-update {
        border-radius: 20px;
        font-family: 'Poppins';
        border-width: 0px;
    }

    & button.btn-save-update {
        background: var(--orange-color);
        color: var(--white-color);
        border-radius: 20px;
        cursor: pointer;
        width: 220px;
    }

    & button.btn-save-update:hover {
        background: var(--orange-color);
    }

    & > .row > .col{
        margin: 30px;
        display: flex;
        justify-content: center;
    }

    & .plus {
        color: var(--gray-3-color);
        background-color: rgba(var(--rgb-gray-1), 0.15) !important;
        border: 1px solid var(--gray-1-color);
    }
`

const MessageInfo = styled.div`
    & {
        width: 100%;
    }
`

const FilesContainer = styled(Col)`
    && .row{
        flex-direction: row !important;
    }
`

const BrowseContainer = styled(Col)`
    &{
        margin: 30px;
        display: flex;
        justify-content: center;
    }
`