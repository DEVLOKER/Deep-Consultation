import React from 'react'
import { Table, Container, Alert } from 'react-bootstrap/esm'
import { AiOutlineUser } from "@react-icons/all-files/ai/AiOutlineUser"
import { BiEdit } from "@react-icons/all-files/bi/BiEdit"
import { BsTrash } from "@react-icons/all-files/bs/BsTrash"
import styled from 'styled-components'
import { loadingState } from 'constant'
import { AlertDismissible } from 'components/ui/AlertDismissible'


export const AccountTable = ({accounts, handleDelete, openCrudModalToEdit}) => {

    

    const handleClickDelete = (account) => {
        if(window.confirm("êtes-vous sûr?")){
            handleDelete(account)
        }
    }

    const handleClickEdit = (account) => {
        openCrudModalToEdit(account)
    }


    if(accounts?.length===0) 
        return(
            <TableContainer>
                <Alert variant='warning' >Table vide!</Alert>
            </TableContainer>
        )

    return (
        <TableContainer>

            <InfoContainer>
                {
                    (accounts===undefined || accounts===null || accounts.length===0) &&
                    <AlertDismissible type={loadingState.EMPTY} content="aucun utilisateur trouvé!" />
                }
            </InfoContainer>

            <Table striped hover responsive >
                <thead>
                    <tr>
                        <th>Client</th>
                        <th>Email</th>
                        <th>Téléphone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        accounts?.map((account, index)=>
                            <tr key={index} >
                                <td><AiOutlineUser className="client-icon" /> {account.name}</td>
                                <td>{account.email}</td>
                                <td>{account.phone}</td>
                                <td>
                                    <div className="actions" >
                                        <a href="#" className="edit" onClick={()=> handleClickEdit(account)}>
                                            <BiEdit />
                                        </a>
                                        <a href="#" className="delete" onClick={()=> handleClickDelete(account)} >
                                            <BsTrash />
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>        
        </TableContainer>
    )
}

const TableContainer = styled(Container)`
    & .table > thead {
        background: var(--orange-color);
        color: var(--white-color);
        border-radius: 10px 10px 0px 0px;
        letter-spacing: 1px;
    }
    
    & .table > thead th{
        padding: 20px 10px;
    }

    & .client-icon {
        width: 35px;
        height: 35px;
    }

    & .table > tbody .actions {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    & .table > tbody .actions a{
        padding: 5px;
        border-radius: 50%;
        cursor: pointer;
        margin: 4px;
    }

    & .table > tbody .actions .edit{
        background-color: rgba(var(--rgb-green), 0.15);
    }

    & .table > tbody .actions .delete{
        background-color: rgba(var(--rgb-red), 0.15);
    }

    & .table > tbody .actions svg{
        width: 25px;
        height: 25px;
    }

    & .table > tbody .actions .edit svg{
        fill: var(--green-color);
    }

    & .table > tbody .actions .delete svg{
        fill: var(--red-color);
    }

    & .table > tbody tr td {
        padding: 20px 10px;
    }
`

const InfoContainer = styled.div`
    & {
        width: 100%;
    }
`