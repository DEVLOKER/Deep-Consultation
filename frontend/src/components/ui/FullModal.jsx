import React from 'react'
import Modal from 'react-bootstrap/Modal'
import styled from 'styled-components'


export const FullModal = ({title, content, open, setOpen, style}) => {
    return (
        <>
            <ModalContainer show={open} fullscreen={true} onHide={() => setOpen(false)} >
                <Modal.Header closeButton>
                    {/* <Modal.Title>
                        { title }
                    </Modal.Title> */}
                </Modal.Header>
                <Modal.Body style={style}>
                    { content }
                </Modal.Body>
            </ModalContainer>
        </>
    )
}


const ModalContainer = styled(Modal)`
    & {
        display: flex;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(10px);
        backdrop-filter: blur(10px);
    }

    & .modal-content {
        background: rgb(255 255 255 / 46%);
    }

    & .modal-header {
        border-width: 0px;
        position: absolute;
        width: 100%;
        z-index: 99999;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    & .modal-header button {
        border-radius: 50%;
    }

    & .modal-body {
        display: flex;
        justify-content: center;
        padding: 0px;
    }

`
