import { http } from "services/api"

export const login = async(user, dispatch)=>{
    return await http({
        url: '/users/login', 
        method: 'post', 
        data: user, 
        dispatch: dispatch
    })
}

export const logout = async()=>{
    return await http({
        url: '/users/logout',
        method: 'get',
    })
}

export const contactUs = async(contact, dispatch)=>{
    return await http({
        url: '/contacts/send',
        method: 'post',
        data: contact,
        dispatch: dispatch
    })
}

export const getUsers = async()=>{
    return await http({
        url: '/users',
        method: 'get',
    })
}

export const addUser = async(user, dispatch)=>{
    return await http({
        url: '/users/signup',
        method: 'post',
        data: user,
        dispatch: dispatch
    })
}

export const deleteUser = async(id)=>{
    return await http({
        url: `/users/${id}`,
        method: 'delete',
    })
}

export const editUser = async(id, user, dispatch)=>{
    return await http({
        url: `/users/${id}`,
        method: 'put',
        data: user,
        dispatch: dispatch
    })
}