import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'


export const useSession = () => {

    const [session, setSession] = useState(null)

    const getSession = useCallback(async() => {
        const response = await axios({
            url: '/session',
            method: 'get',
            data: {}
        })
        setSession(response?.data || {})
    }, [])

    useEffect(()=>{
        getSession()
    }, [])

    return session
}
