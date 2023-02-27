import React from 'react'
import styled from 'styled-components'
import { constants } from 'constant'
import { BsDownload } from "@react-icons/all-files/bs/BsDownload"
import { BsTrash } from "@react-icons/all-files/bs/BsTrash"
import { downloadBlob, fileSize } from 'helper'
import { downloadConsultation } from 'services/consultation.service'
import { Col, Row } from 'react-bootstrap'



export const FileChip = ({consultation, filename, size, side, userType, handleDelete}) => {

    const [name, ext] = filename?.split(".") || ["", ""]

    const handleDownload = ()=>{
        downloadConsultation(consultation, filename, side)
        .then(blob=>{
            downloadBlob(blob, filename)
        })
        .catch(err=>console.log(err))
    }
    return (
        <ChipContainer side={side}>
            
            <Col className='col' sm={2}>
                <Extension side={side}>{ext}</Extension>
            </Col>
            <Col className='col' sm={8}>
                <span className="text">{name}</span>
                <span className="text-muted" >{fileSize(size)}</span>
            </Col>
            <Col className='col' sm={2}>
                <span className="action">
                    { side===constants.ADMIN_SIDE && userType===constants.USER_ADMIN && <a href="#" className="delete" ><BsTrash onClick={handleDelete} /></a> }
                    {
                        side===constants.CLIENT_SIDE && userType===constants.USER_CLIENT?(
                            <a href="#" className="delete" >
                                <BsTrash onClick={handleDelete} />
                            </a>
                        ):(
                            <a href="#" className="download" onClick={handleDownload} target="_blank" rel="noopener noreferrer" download>
                                <BsDownload />
                            </a>
                        )
                    }
                    
                </span>
            </Col>
        </ChipContainer>
    )

}

const ChipContainer = styled(Row)`
    & {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;
        background: ${props => props.side===constants.CLIENT_SIDE ? "rgba(var(--rgb-gray-1), 0.15)" : "rgba(var(--rgb-orange), 0.05)"};
        border-radius: 30px;
        margin: 20px 10px;
        padding-left: 0px;
        box-shadow: 0px 2px 5px 1px ${props => props.side===constants.CLIENT_SIDE ? "rgba(var(--rgb-gray-3), 0.25)" : "rgba(var(--rgb-orange), 0.25)"};
    }

    & .row{
        padding: 0px;
    }

    & div.col{
        padding: 0px;
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        align-items: flex-start;
    }

    & div.col:last-child{
        align-items: flex-end;
    }

    & .text {
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
        max-width: 100%;
        white-space: nowrap;
        color: ${props => props.side===constants.CLIENT_SIDE ? "var(--gray-3-color)" : "var(--orange-color)"};
    }

    & .text-muted{
        font-size: 14px;
    }

    & .action{
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;
    }

    & .action a{
        padding: 5px;
        border-radius: 50%;
        cursor: pointer;
        margin: 4px;
    }

    & .action .download{
        background-color: rgba(var(--rgb-green), 0.15);
    }

    & .action .delete{
        background-color: rgba(var(--rgb-red), 0.15);
    }

    & .action svg {
        width: 25px;
        height: 25px;
    }

    & .action .download svg{
        fill: var(--green-color);
    }

    & .action .delete svg{
        fill: var(--red-color);
    }
`

const Extension =styled.div`
    & {
        display: flex;
        justify-content: center;
        align-items: center;
        background: ${props => props.side===constants.CLIENT_SIDE ? "var(--gray-3-color)" : "var(--orange-color)"};
        text-transform: uppercase;
        border-radius: 50%;
        min-width: 50px; width: 50px; max-width: 50px; 
        min-height: 50px; height: 50px; max-height: 50px; 
        color: var(--white-color);
    }
`