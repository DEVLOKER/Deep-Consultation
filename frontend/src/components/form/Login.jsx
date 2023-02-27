
import React, { useReducer, useState, useEffect } from 'react'
import { Button, Container, Row } from 'react-bootstrap/esm'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import styled from 'styled-components'
import { Title } from 'components/ui/Title'
import { useNavigate } from 'react-router-dom'
import { reducer } from 'services/api'
import { loadingState } from 'constant'
import { PleaseWait } from 'components/ui/PleaseWait'
import { AlertDismissible } from 'components/ui/AlertDismissible'
import { login } from 'services/user.service'

export const Login = () => {

    const [account, setAccount] = useState({ email: "", password: "" })
    const handleChange = (event) => {
        setAccount({...account, [event.target.name]: event.target.value})
    }

    const navigate = useNavigate()
    const handleLogin = () => {
        login(account, dispatch)
    }

    const [state, dispatch] = useReducer(reducer, { status: loadingState.EMPTY })
    useEffect(()=>{
        state.status === loadingState.SUCCESS && setTimeout(() => {
            state.data.isAdmin? navigate("/admin/consultations"): navigate("/client/consultations")
        }, 500)
    }, [state])


    return (
        <LoginContainer >

                <MessageInfo>
                    {state.status === loadingState.LOADING && <PleaseWait />}
                    {state.status === loadingState.SUCCESS && <AlertDismissible type={state.status} content='connexion avec succès!' />}
                    {state.status === loadingState.ERROR && <AlertDismissible type={state.status} content={state?.error?.message} />}
                </MessageInfo>
                
                <Form >
                    <Title text="Connexion" />
                    <Row >
                        <FloatingLabel label="Email" className="mb-4" >
                            <Form.Control type="text" placeholder="Email" name="email" value={account.email} onChange={handleChange} />
                        </FloatingLabel>
                        <FloatingLabel label="Mot de passe" className="mb-4" >
                            <Form.Control type="password" placeholder="Mot de passe" name="password" value={account.password} onChange={handleChange} />
                        </FloatingLabel>
                    </Row>
                    <Row >
                        <ButtonLogin variant="light" size="lg" className="mb-4" onClick={handleLogin} >
                            Se Contacter
                        </ButtonLogin>
                    </Row>
                </Form>
                
        </LoginContainer>
    )
}

const LoginContainer = styled(Container)`
    & {
        background: rgba(var(--rgb-white), 0.9);
        border-radius: 40px;
        padding: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 60%;
    }
    @media screen and (max-width: 576px) {
        width: 90%;
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

    & .form-floating input{
        background: transparent;
        background: rgba(var(--rgb-gray-1), 0.15);
    } 

    & input, button {
        border-radius: 20px;
        font-family: 'Poppins';
        border-width: 0px;
    }
`

const ButtonLogin = styled(Button)`
    & {
        background: var(--orange-color);
        color: var(--white-color);
        border-radius: 20px;
        cursor: pointer;
    }

    &:hover {
        background: var(--orange-color);
    }

    @media screen and (min-width: 900px) {
        float: right;
        margin-top: -76px;
        margin-right: 18px;
        z-index: 1;
        width: 222px;
    }
`

const MessageInfo = styled.div`
    & {
        width: 100%;
    }
`