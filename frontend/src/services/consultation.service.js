import { http } from "services/api"

export const getConsultations = async(filters)=>{
    return await http({
        url: '/consultations',
        method: 'get',
        params: filters
    })
}

export const addConsultation = async(consultation, filesToUpload, dispatch)=>{
    let formData = new FormData()
    formData.append("consultation", JSON.stringify(consultation))
    for(const file of filesToUpload)
        formData.append('filesToUpload', file)

    return await http({
        url: '/consultations/publish',
        method: 'post',
        data: formData,
        dispatch: dispatch
    })
}

export const deleteConsultation = async(id)=>{
    return await http({
        url: `/consultations/${id}`,
        method: 'delete',
    })
}

export const editConsultation = async(id, consultation, filesToUpload, dispatch)=>{
    let formData = new FormData()
    formData.append("consultation", JSON.stringify(consultation))
    for(const file of filesToUpload)
        formData.append('filesToUpload', file)

    return await http({
        url: `/consultations/${id}`,
        method: 'put',
        data: formData,
        dispatch: dispatch
    })
}

export const downloadConsultation = async(consultation, name, side)=>{
    return await http({
        url: `/files/download/${consultation.client._id}/${consultation._id}/${side}?name=${name}`,
        method: 'get',
        responseType: 'blob',
    })
}

export const processConsultation = async(consultation, filesToUpload, dispatch)=>{
    let formData = new FormData()
    formData.append("consultation", JSON.stringify(consultation))
    for(const file of filesToUpload)
        formData.append('filesToUpload', file)

    return await http({
        url: `/consultations/${consultation._id}`,
        method: 'patch',
        data: formData,
        dispatch
    })
}
