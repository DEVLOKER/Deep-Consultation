
import React, {useEffect, useReducer, useState} from 'react'
import { AccountTable } from 'components/account/AccountTable'
import { Filter } from 'components/account/Filter'
import { AdminFixedHeader } from 'components/header/AdminFixedHeader'
import { FullModal } from 'components/ui/FullModal'
import { constants, loadingState } from 'constant'
import { FormAccount } from 'components/account/FormAccount'
import { useSession } from 'hooks/useSession'
import { useRedirect } from 'hooks/useRedirect'
import { addUser, deleteUser, editUser, getUsers } from 'services/user.service'
import { reducer } from 'services/api'
import { Footer } from 'components/footer/Footer'


export const AdminAccounts = () => {

    const session = useRedirect({
        isAdmin: true,
        adminPath: null,
        clientPath: '/',
    })

    const [refresh, setRefresh] = useState(true)

    const [crudModal, setCrudModal] = useState({type: constants.FORM_ADD, data: null, show: false})
    const setOpen = (condition)=> setCrudModal({...crudModal, show: condition})
    const openCrudModalToAdd = ()=> setCrudModal({type: constants.FORM_ADD, data: null, show: true})
    const openCrudModalToEdit = (account)=> setCrudModal({type: constants.FORM_EDIT, data: account, show: true})
    

    useEffect(()=>{
        crudModal.show && dispatch({ status: loadingState.EMPTY })
    }, [crudModal.show])



    useEffect(() => {
        const interval = setInterval(() => {
            setRefresh((refreshPage) => !refreshPage)
        }, constants.REFRESH_INTERVAL)
        return () => clearInterval(interval)
    }, [])


    const [accounts, setAccounts] = useState([])

    const [state, dispatch] = useReducer(reducer, { status: loadingState.EMPTY })

    const handleAdd = (user) => {
        addUser(user, dispatch)
    }

    const handleDelete = (user) => {
        deleteUser(user._id)
        .then(data=>setRefresh(!refresh))
        .catch(err=> console.log(err))
    }

    const handleEdit = (user) => {
        editUser(user._id, user, dispatch)
    }

    useEffect(()=>{
        if(state?.status === loadingState.SUCCESS){
            setOpen(false)
            setRefresh(!refresh) 
        }
    }, [state])
    
    useEffect(()=>{
        getUsers()
        .then(data=>setAccounts(data))
        .catch(err=> console.log(err))
    }, [refresh])


    return (
        <>
            <AdminFixedHeader />
            
            <Filter openCrudModalToAdd={openCrudModalToAdd} />
            
            <AccountTable accounts={accounts} handleDelete={handleDelete} openCrudModalToEdit={openCrudModalToEdit} />
            
            <FullModal  open={crudModal.show} setOpen={setOpen} title="Ajouter Client" 
                        content={<FormAccount data={crudModal.data} handleAdd={handleAdd} handleEdit={handleEdit} type={crudModal.type} state={state} />} 
            />

            <Footer />
        </>
    )
}