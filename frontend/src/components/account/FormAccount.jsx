import { AlertDismissible } from 'components/ui/AlertDismissible'
import { PleaseWait } from 'components/ui/PleaseWait'
import { Title } from 'components/ui/Title'
import { constants, loadingState } from 'constant'
import React, { useState } from 'react'
import { Button, Container, FloatingLabel, Form, Row } from 'react-bootstrap'
import styled from 'styled-components'

export const FormAccount = ({data, type, handleAdd, handleEdit, state}) => {

    const [account, setAccount] = useState(data!==null? data : { name: "", email: "", password: "", phone: "" })

    const handleChange = (event) => {
        setAccount({...account, [event.target.name]: event.target.value})
    }

    const handleSaveAccount = ()=>{
        switch(type){
            case constants.FORM_ADD: 
                handleAdd(account)
                break
            case constants.FORM_EDIT:
                let user = {...account}
                data.email===user.email && delete user.email
                handleEdit(user)
                break
        }
    }

    return (
        <FormContainer>

            <MessageInfo>
                {state.status === loadingState.LOADING && <PleaseWait />}
                {state.status === loadingState.SUCCESS && <AlertDismissible type={state.status} content='opération terminée avec succès!' />}
                {state.status === loadingState.ERROR && <AlertDismissible type={state.status} content={state?.error?.message} />}
            </MessageInfo>

            <Form>
                <Title text={type===constants.FORM_ADD? "Nouveau Compte" : "Modification de Compte"} />
                <Row >
                    <FloatingLabel label="Nom" className="mb-4" >
                        <Form.Control type="text" placeholder="Nom" name="name" value={account?.name} onChange={handleChange} />
                    </FloatingLabel>
                    <FloatingLabel label="Email" className="mb-4" >
                        <Form.Control type="text" placeholder="Email" name="email" value={account?.email} onChange={handleChange} />
                    </FloatingLabel>
                    <FloatingLabel label="Mot de passe" className="mb-4" >
                        <Form.Control type="password" placeholder="Mot de passe" name="password" value={account?.password} onChange={handleChange} />
                    </FloatingLabel>
                    <FloatingLabel label="Téléphone" className="mb-4" >
                        <Form.Control type="text" placeholder="Téléphone" name="phone" value={account?.phone} onChange={handleChange} />
                    </FloatingLabel>
                </Row>
                <Row>
                    <Button variant="light" size="lg" className="mb-4 btn-save-update" onClick={handleSaveAccount} >
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
        flex-direction: column;
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
`

const MessageInfo = styled.div`
    & {
        width: 100%;
    }
`