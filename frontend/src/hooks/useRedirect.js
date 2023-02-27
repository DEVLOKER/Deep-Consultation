import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSession } from 'hooks/useSession'


export const useRedirect = ({isAdmin, adminPath, clientPath}) => {
    
    const navigate = useNavigate()
    const session = useSession()

    useEffect(()=>{
        const isGetSession = session!=null
        if(!isGetSession) return

        const isLoggedIn = session?._id
        if(!isLoggedIn) {
            navigate('/')
            return
        }

        const userType = session?.isAdmin
        if(userType===isAdmin)
            if(userType)    adminPath!==null && navigate(adminPath)
            else            clientPath!==null && navigate(clientPath)
        else
            if(userType)    clientPath!==null && navigate(clientPath)
            else            adminPath!==null && navigate(adminPath)
        
    },[session])

    return session
}
