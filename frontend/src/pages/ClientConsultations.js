
import React, { useEffect, useReducer, useState } from 'react'
import { FullModal } from 'components/ui/FullModal'
import { Consultations } from 'components/consultation/Consultations'
import { Filter } from 'components/consultation/Filter'
import { ClientFixedHeader } from 'components/header/ClientFixedHeader'
import { constants, loadingState } from 'constant'
import { ClientConsultationProcess } from 'components/consultation/ClientConsultationProcess'
import { FormConsultation } from 'components/consultation/FormConsultation'
import { useRedirect } from 'hooks/useRedirect'
import { addConsultation, deleteConsultation, editConsultation, getConsultations } from 'services/consultation.service'
import { reducer } from 'services/api'
import { Footer } from 'components/footer/Footer'


export const ClientConsultations = () => {

    const session = useRedirect({
        isAdmin: false,
        adminPath: '/',
        clientPath: null,
    })

    const [refresh, setRefresh] = useState(true)

    const setProcessModalOpen = (condition)=> setProcessModal({...processModal, modalOpen: condition })

    const [processModal, setProcessModal] = useState({modalOpen: false, consultation: null, id: -1})
    const handleProcess = (id, data) => setProcessModal({modalOpen: true, consultation: data, id: id})


    const setCrudModalOpen = (condition)=> setCrudModal({...crudModal, show: condition})
    const [crudModal, setCrudModal] = useState({type: constants.FORM_ADD, data: null, show: false})
    
    useEffect(()=>{
        crudModal.show && dispatch({ status: loadingState.EMPTY })
    }, [crudModal.show])


    const [consultations, setConsultations] = useState([])

    const [filters, setFilters] = useState({})
    const handleFilter = ({state}) => {
        if(state!==undefined){
            setFilters({...filters, state})
        } else {
            const {state: previousState, ...rest} = filters
            setFilters(rest)
        }
    }


    useEffect(() => {
        const interval = setInterval(() => {
            setRefresh((refreshPage) => !refreshPage)
        }, constants.REFRESH_INTERVAL)
        return () => clearInterval(interval)
    }, [])

    useEffect(()=>{
            setFilters(session?._id? {...filters, client: session?._id}:{...filters})
    }, [session])

    useEffect(()=>{
        getConsultations(filters)
        .then(data=>setConsultations(data))
        .catch(err=> console.log(err))
    }, [filters, refresh])



    const [state, dispatch] = useReducer(reducer, { status: loadingState.EMPTY })

    const handleAdd = (consultation, filesToUpload) => {
        addConsultation(consultation, filesToUpload, dispatch)
    }
    
    const handleDelete = (id) => {
        deleteConsultation(id)
        .then(data=>setRefresh(!refresh))
        .catch(err=> console.log(err))
    }

    const handleEdit = (consultation, filesToUpload) => {
        editConsultation(consultation._id, consultation, filesToUpload, dispatch)
    }

    useEffect(()=>{
        if(state?.status === loadingState.SUCCESS){
            setCrudModalOpen(false)
            setRefresh(!refresh) 
        }
    }, [state])


    return (
        <>
            <ClientFixedHeader />
            
            <Filter text="Mes Consultations" handleFilter={handleFilter} side={constants.CLIENT_SIDE} setCrudModal={setCrudModal} />

            <Consultations consultations={consultations} handleProcess={handleProcess} handleDelete={handleDelete} setCrudModal={setCrudModal} side={constants.CLIENT_SIDE} />

            <FullModal  open={processModal.modalOpen} setOpen={setProcessModalOpen} title="Traitement de consultation" 
                        content={<ClientConsultationProcess data={processModal.consultation} handleProcess={handleProcess} />} 
            />

            <FullModal  open={crudModal.show} setOpen={setCrudModalOpen} title="Gestion de consultation" 
                        content={<FormConsultation session={session} handleAdd={handleAdd} handleEdit={handleEdit} data={crudModal.data} type={crudModal.type} setOpen={setCrudModalOpen} state={state} />} 
            />

            <Footer />
        </>
    )
}