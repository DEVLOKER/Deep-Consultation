import React, { useReducer, useState } from 'react'
import { Button, Container } from 'react-bootstrap/esm'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import styled from 'styled-components'
import { Title } from 'components/ui/Title'
import { contactUs } from 'services/user.service'
import { reducer } from 'services/api'
import { loadingState } from 'constant'
import { PleaseWait } from 'components/ui/PleaseWait'
import { AlertDismissible } from 'components/ui/AlertDismissible'

export const Contact = () => {

    const screen = { xs: 12, sm: 12, md: 8, lg: 6, xl: 4, xxl: 4 }
    

    const [account, setAccount] = useState({ username: "", phone: "", email: "", message: "" })
    const handleChange = (event) => {
        setAccount({...account, [event.target.name]: event.target.value})
    }

    const handleContactUs = () => {
        contactUs(account, dispatch)
    }

    const [state, dispatch] = useReducer(reducer, { status: loadingState.EMPTY })

    
    return (
        <ContactContainer id="contact" {...screen} >
            
            <MessageInfo>
                {state.status === loadingState.LOADING && <PleaseWait />}
                {state.status === loadingState.SUCCESS && <AlertDismissible type={state.status} content='email envoyé avec succès!' />}
                {state.status === loadingState.ERROR && <AlertDismissible type={state.status} content={state?.error?.message} />}
            </MessageInfo>

            <Form>
                <Row>
                    <Title text="Contact" />
                </Row>
                <Row>
                    <Col>
                        <FloatingLabel label="Nom"  className="mb-4" >
                            <Form.Control type="text" placeholder="Nom" name="username" value={account?.username} onChange={handleChange} />
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel label="Téléphone" className="mb-4" >
                            <Form.Control type="text" placeholder="Téléphone" name="phone" value={account?.phone} onChange={handleChange} />
                        </FloatingLabel>
                    </Col>
                </Row>
                <FloatingLabel label="Adresse email" className="mb-4" >
                    <Form.Control type="text" placeholder="Adresse email" name="email" value={account?.email} onChange={handleChange} />
                </FloatingLabel>
                <FloatingLabel label="Message" className="mb-4">
                    <Form.Control as="textarea"  placeholder="Laissez un message ici" name="message" value={account?.message} onChange={handleChange} style={{ height: '180px' }} />
                </FloatingLabel>
                <div className="d-grid gap-2 mb-4">
                    <Button variant="light" size="lg" className="p-3 btn-contact" onClick={handleContactUs} >Contactez nous</Button>
                </div>
                
            </Form>

        </ContactContainer>

    )
}

const ContactContainer = styled(Container)`
    & {
        width: 80%;
        margin-top: 100px;
        margin-bottom: 0px;
        padding-top: 60px;
        padding-bottom: 60px;
        background: rgba(var(--rgb-gray-3), 0.01);
        border-radius: 40px;
        display: flex;
        align-items: center;
        flex-direction: column;
        z-index: 1;
        box-shadow: 0px 3px 6px 3px var(--gray-1-color);
    }

    & form {
        width: 80%;
    }

    & form .row:first-child{
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-direction: column;
    }

    & h1 {
        color: var(--blue-color);
        border-bottom: 4px var(--orange-color) solid;
        margin-left: 0px;
        width: fit-content;
        margin-top: 40px;
        padding: 0px;
    }

    & .form-floating label {
        color: rgba(var(--rgb-blue), 0.8);
    }

    & input, button, textarea {
        border-radius: 20px;
        font-family: 'Poppins';
    }

    & button.btn-contact {
        background-color: var(--orange-color);
        color: var(--white-color);
        border-width: 0px;
    }

    & button.btn-contact:hover {
        background: var(--orange-color);
    }
`

const MessageInfo = styled.div`
    & {
        width: 100%;
    }
`