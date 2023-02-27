
import React, { useEffect, useState } from 'react'
import { FullModal } from 'components/ui/FullModal'
import { AdminConsultationProcess } from 'components/consultation/AdminConsultationProcess'
import { Consultations } from 'components/consultation/Consultations'
import { Filter } from 'components/consultation/Filter'
import { AdminFixedHeader } from 'components/header/AdminFixedHeader'
import { constants } from 'constant'
import { useRedirect } from 'hooks/useRedirect'
import { deleteConsultation, getConsultations, processConsultation } from 'services/consultation.service'
import { Footer } from 'components/footer/Footer'


export const AdminConsultations = () => {

    const session = useRedirect({
        isAdmin: true,
        adminPath: null,
        clientPath: '/',
    })

    const [refresh, setRefresh] = useState(true)

    const setModelOpen = (condition)=> setProcessModal({...processModal, modalOpen: condition })

    const [processModal, setProcessModal] = useState({modalOpen: false, consultation: null, id: -1})
    const handleProcess = (id, data) => setProcessModal({modalOpen: true, consultation: data, id: id})


    const [consultations, setConsultations] = useState([])
    const handleProcessConsultation = (consultation, filesToUpload)=>{
        processConsultation(consultation, filesToUpload)
        .then(data=> {
            setRefresh(!refresh)
            setModelOpen(false)
        } )
        .catch(err=> console.log(err))
    }


    const handleDelete = (id) => {
        deleteConsultation(id)
        .then(data=>setRefresh(!refresh))
        .catch(err=> console.log(err))
    }


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
        setFilters(session?._id? {}:{...filters})
    }, [session])

    useEffect(()=>{
        getConsultations(filters)
        .then(data=>setConsultations(data))
        .catch(err=> console.log(err))
    }, [filters, refresh])

    
    return (
        <>
            <AdminFixedHeader />
            
            <Filter text="Consultations" handleFilter={handleFilter} />
            
            <Consultations consultations={consultations} handleProcess={handleProcess} handleDelete={handleDelete} side={constants.ADMIN_SIDE} />
            
            <FullModal  open={processModal.modalOpen} setOpen={setModelOpen} title="Details" 
                        content={<AdminConsultationProcess session={session} data={processModal.consultation} handleProcess={handleProcessConsultation} />} 
            />

            <Footer />
        </>
    )
}
